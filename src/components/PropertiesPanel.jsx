const PropertiesPanel = ({ selectedElement, onUpdate }) => {
  if (!selectedElement) {
    return null;
  }

  // Ensure style object exists
  if (!selectedElement.style) {
    selectedElement.style = {};
  }

  const handleChange = (field, value) => {
    onUpdate(selectedElement.id, { [field]: value });
  };

  const handleStyleChange = (field, value) => {
    onUpdate(selectedElement.id, {
      style: { ...selectedElement.style, [field]: value },
    });
  };

  // Convert style object to CSS string
  const getStyleString = () => {
    const style = selectedElement.style;
    return `background-color: ${style.backgroundColor};
border: ${style.borderWidth} ${style.borderStyle} ${style.borderColor};
color: ${style.color};
padding: ${style.padding};
text-align: ${style.textAlign};
text-decoration: ${style.textDecoration};
display: ${style.display};
font-size: ${style.fontSize};
width: ${style.width};
height: ${style.height};`;
  };

  // Parse CSS string to style object
  const parseStyleString = (cssString) => {
    const styleObject = {};
    cssString.split(";").forEach((rule) => {
      if (rule.trim()) {
        const [property, ...values] = rule.split(":").map((str) => str.trim());
        const value = values.join(":"); // Rejoin in case there were colons in the value

        switch (property) {
          case "background-color":
            styleObject.backgroundColor = value;
            break;
          case "border":
            try {
              const [width = "0px", borderStyle = "solid", color = "#000000"] =
                value.split(" ");
              styleObject.borderWidth = width;
              styleObject.borderStyle = borderStyle;
              styleObject.borderColor = color;
            } catch (e) {
              console.log("Error parsing border:", e);
            }
            break;
          case "color":
            styleObject.color = value;
            break;
          case "padding":
            styleObject.padding = value;
            break;
          case "text-align":
            styleObject.textAlign = value;
            break;
          case "text-decoration":
            styleObject.textDecoration = value;
            break;
          case "display":
            styleObject.display = value;
            break;
          case "font-size":
            styleObject.fontSize = value;
            break;
          case "width":
            styleObject.width = value;
            break;
          case "height":
            styleObject.height = value;
            break;
        }
      }
    });
    return styleObject;
  };

  const handleCSSChange = (cssString) => {
    try {
      const newStyles = parseStyleString(cssString);
      onUpdate(selectedElement.id, {
        style: { ...selectedElement.style, ...newStyles },
      });
    } catch (e) {
      console.log("Error updating styles:", e);
    }
  };

  const handleSave = () => {
    const panel = document.getElementById("properties-panel");
    panel.classList.add("slide-out");
    setTimeout(() => {
      panel.style.visibility = "hidden";
    }, 300);
  };

  return (
    <div
      id="properties-panel"
      className="w-64 bg-gray-100 p-4 shadow-lg transform transition-transform duration-300 slide-in"
    >
      <h2 className="text-lg font-semibold mb-4">Properties Panel</h2>

      {/* Styles Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">Styles</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <textarea
            value={getStyleString()}
            onChange={(e) => handleCSSChange(e.target.value)}
            className="w-full h-48 px-3 py-2 border border-gray-200 rounded-md text-sm font-mono"
            spellCheck="false"
          />
        </div>
      </div>

      {/* Additional Properties Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Additional Properties
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Text
            </label>
            <input
              type="text"
              value={selectedElement.label || ""}
              onChange={(e) => handleChange("label", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
};

export default PropertiesPanel;
