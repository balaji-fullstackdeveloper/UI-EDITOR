import { useEffect, useRef, useState } from "react";

const Canvas = ({ elements, onElementSelect }) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elements.forEach((element) => {
        // Draw button background
        ctx.fillStyle = element.style?.backgroundColor || "#3B82F6";
        ctx.strokeStyle = element.style?.borderColor || "#000000";
        ctx.lineWidth = parseInt(element.style?.borderWidth) || 0;

        const x = element.position?.x || 0;
        const y = element.position?.y || 0;
        const width = parseInt(element.style?.width) || 100;
        const height = parseInt(element.style?.height) || 40;
        const borderRadius = 4;

        // Set border style
        if (element.style?.borderStyle) {
          switch (element.style.borderStyle) {
            case "dashed":
              ctx.setLineDash([5, 5]);
              break;
            case "dotted":
              ctx.setLineDash([2, 2]);
              break;
            default:
              ctx.setLineDash([]);
              break;
          }
        }

        // Draw rounded rectangle
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, borderRadius);
        ctx.fill();
        if (ctx.lineWidth > 0) {
          ctx.stroke();
        }

        // Reset line dash
        ctx.setLineDash([]);

        // Draw text
        ctx.fillStyle = element.style?.color || "#FFFFFF";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(element.label || "Button", x + width / 2, y + height / 2);
      });
    };

    // Initial draw and setup animation frame
    let animationFrameId;
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [elements]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const componentData = JSON.parse(e.dataTransfer.getData("component"));

    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    onElementSelect({
      ...componentData,
      position,
    });
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on any element
    const clickedElement = elements.find((element) => {
      const elX = element.position?.x || 0;
      const elY = element.position?.y || 0;
      const width = parseInt(element.style?.width) || 100;
      const height = parseInt(element.style?.height) || 40;

      return x >= elX && x <= elX + width && y >= elY && y <= elY + height;
    });

    if (clickedElement) {
      setIsDragging(true);
      setDraggedElement(clickedElement);
      setDragOffset({
        x: x - clickedElement.position.x,
        y: y - clickedElement.position.y,
      });
      const panel = document.getElementById("properties-panel");
      if (panel) {
        panel.style.visibility = "visible";
        panel.classList.remove("slide-out");
        panel.classList.add("slide-in");
      }
      onElementSelect(clickedElement);
    } else {
      // Clicked outside any element
      setIsDragging(false);
      setDraggedElement(null);
      const panel = document.getElementById("properties-panel");
      if (panel) {
        panel.classList.remove("slide-in");
        panel.classList.add("slide-out");
        setTimeout(() => {
          panel.style.visibility = "hidden";
          panel.classList.remove("slide-out");
        }, 300);
      }
      onElementSelect(null);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && draggedElement) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      const updatedElement = {
        ...draggedElement,
        position: { x, y },
      };

      onElementSelect(updatedElement);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedElement(null);
  };

  return (
    <div className="w-[800px] bg-white border border-gray-300 shadow-lg rounded-lg mx-auto my-4">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default Canvas;
