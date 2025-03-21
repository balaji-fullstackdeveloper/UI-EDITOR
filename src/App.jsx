import { useState } from "react";
import ComponentsPanel from "./components/ComponentsPanel";
import Canvas from "./components/Canvas";
import PropertiesPanel from "./components/PropertiesPanel";
import "./App.css";
import "./index.css";

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasElements, setCanvasElements] = useState([]);

  const handleElementSelect = (element) => {
    if (!element) {
      // Clicked outside any element
      setSelectedElement(null);
      return;
    }

    if (element.id) {
      // Existing element selected or moved
      const updatedElements = canvasElements.map((el) =>
        el.id === element.id ? { ...element } : el
      );
      setCanvasElements(updatedElements);
      setSelectedElement(element);

      // Show properties panel
      const panel = document.getElementById("properties-panel");
      if (panel) {
        panel.style.visibility = "visible";
        panel.classList.remove("slide-out");
        panel.classList.add("slide-in");
      }
    } else {
      // New element dropped
      const newElement = {
        ...element,
        id: Date.now(),
        style: {
          width: "100px",
          height: "40px",
          backgroundColor: "#3B82F6",
          color: "#FFFFFF",
          borderWidth: "0",
          borderColor: "#000000",
          padding: "8px",
        },
      };
      setCanvasElements([...canvasElements, newElement]);
      setSelectedElement(newElement);

      // Show properties panel for new element
      const panel = document.getElementById("properties-panel");
      if (panel) {
        panel.style.visibility = "visible";
        panel.classList.remove("slide-out");
        panel.classList.add("slide-in");
      }
    }
  };

  const updateElementProperties = (id, properties) => {
    const updatedElements = canvasElements.map((el) =>
      el.id === id ? { ...el, ...properties } : el
    );
    setCanvasElements(updatedElements);

    // Update selected element if it was modified
    if (selectedElement && selectedElement.id === id) {
      const updatedElement = updatedElements.find((el) => el.id === id);
      setSelectedElement(updatedElement);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ComponentsPanel />
      <Canvas elements={canvasElements} onElementSelect={handleElementSelect} />
      <PropertiesPanel
        selectedElement={selectedElement}
        onUpdate={updateElementProperties}
      />
    </div>
  );
}

export default App;
