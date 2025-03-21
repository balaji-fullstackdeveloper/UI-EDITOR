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

  const handleSave = () => {
    const panel = document.getElementById("properties-panel");
    panel.classList.add("slide-out");
    setTimeout(() => {
      panel.style.display = "none";
    }, 300);
  };

  return (
    <div
      id="properties-panel"
      className="w-64 bg-white p-4 shadow-lg transform transition-transform duration-300 slide-in"
    >
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={selectedElement.label || ""}
            onChange={(e) => handleChange("label", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <input
            type="text"
            value={selectedElement.style.width || ""}
            onChange={(e) => handleStyleChange("width", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <input
            type="text"
            value={selectedElement.style.height || ""}
            onChange={(e) => handleStyleChange("height", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Width
          </label>
          <input
            type="text"
            value={selectedElement.style.borderWidth || ""}
            onChange={(e) => handleStyleChange("borderWidth", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Style
          </label>
          <select
            value={selectedElement.style.borderStyle || "solid"}
            onChange={(e) => handleStyleChange("borderStyle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="groove">Groove</option>
            <option value="ridge">Ridge</option>
            <option value="inset">Inset</option>
            <option value="outset">Outset</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Color
          </label>
          <input
            type="color"
            value={selectedElement.style.borderColor || "#000000"}
            onChange={(e) => handleStyleChange("borderColor", e.target.value)}
            className="w-full h-10 p-1 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Padding
          </label>
          <input
            type="text"
            value={selectedElement.style.padding || ""}
            onChange={(e) => handleStyleChange("padding", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <input
            type="color"
            value={selectedElement.style.backgroundColor || "#ffffff"}
            onChange={(e) =>
              handleStyleChange("backgroundColor", e.target.value)
            }
            className="w-full h-10 p-1 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Color
          </label>
          <input
            type="color"
            value={selectedElement.style.color || "#000000"}
            onChange={(e) => handleStyleChange("color", e.target.value)}
            className="w-full h-10 p-1 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
