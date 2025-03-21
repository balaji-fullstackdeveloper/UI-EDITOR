const ComponentsPanel = () => {
  const components = [{ type: "button", label: "Button", variant: "primary" }];

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData("component", JSON.stringify(component));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-3">
        {components.map((component, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            {component.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsPanel;
