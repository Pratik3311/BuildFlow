
import { useEffect, useState } from "react";

interface ResizeHandleProps {
  elementId: string;
  onResize: (elementId: string, deltaWidth: number, deltaHeight: number, direction: string) => void;
}

export const ResizeHandle = ({ elementId, onResize }: ResizeHandleProps) => {
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [direction, setDirection] = useState("");

  const handleMouseDown = (e: React.MouseEvent, handleDirection: string) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setDirection(handleDirection);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      onResize(elementId, deltaX, deltaY, direction);
      
      setStartX(e.clientX);
      setStartY(e.clientY);
    };
    
    const handleMouseUp = () => {
      setResizing(false);
    };
    
    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, startX, startY, elementId, onResize, direction]);

  return (
    <>
      {/* Corner handles */}
      <div 
        className="absolute top-0 left-0 w-3 h-3 bg-blue-500 cursor-nw-resize"
        style={{ zIndex: 10, transform: 'translate(-50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "nw")}
      />
      <div 
        className="absolute top-0 right-0 w-3 h-3 bg-blue-500 cursor-ne-resize"
        style={{ zIndex: 10, transform: 'translate(50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "ne")}
      />
      <div 
        className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500 cursor-sw-resize"
        style={{ zIndex: 10, transform: 'translate(-50%, 50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "sw")}
      />
      <div 
        className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
        style={{ zIndex: 10, transform: 'translate(50%, 50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "se")}
      />
      
      {/* Edge handles */}
      <div 
        className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 cursor-n-resize"
        style={{ zIndex: 10, transform: 'translate(-50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "n")}
      />
      <div 
        className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 cursor-s-resize"
        style={{ zIndex: 10, transform: 'translate(-50%, 50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "s")}
      />
      <div 
        className="absolute left-0 top-1/2 w-3 h-3 bg-blue-500 cursor-w-resize"
        style={{ zIndex: 10, transform: 'translate(-50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "w")}
      />
      <div 
        className="absolute right-0 top-1/2 w-3 h-3 bg-blue-500 cursor-e-resize"
        style={{ zIndex: 10, transform: 'translate(50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown(e, "e")}
      />
    </>
  );
};
