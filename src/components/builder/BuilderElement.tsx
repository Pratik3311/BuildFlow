
import { useState } from "react";
import { ElementData } from "@/types/builder";
import { GripVertical, Image as ImageIcon } from "lucide-react";

interface BuilderElementProps {
  element: ElementData;
  isActive: boolean;
  isEditing: boolean;
  setEditing: (isEditing: boolean) => void;
  onTextChange: (content: string) => void;
  onImageChange: (imageUrl: string) => void;
}

const BuilderElement = ({
  element,
  isActive,
  isEditing,
  setEditing,
  onTextChange,
  onImageChange,
}: BuilderElementProps) => {
  const [imageInput, setImageInput] = useState<string>("");

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.type === "text" || element.type === "button") {
      setEditing(true);
    }
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const renderElementContent = () => {
    const commonStyle = {
      width: "100%",
      height: "100%",
      ...element.style,
    };

    switch (element.type) {
      case "text":
        return isEditing ? (
          <textarea
            value={element.content || ""}
            onChange={(e) => onTextChange(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="w-full h-full border-none focus:outline-none resize-none p-0 bg-transparent"
            style={commonStyle}
          />
        ) : (
          <div
            style={commonStyle}
            onDoubleClick={handleDoubleClick}
            className="w-full h-full overflow-hidden"
          >
            {element.content}
          </div>
        );

      case "button":
        return isEditing ? (
          <input
            value={element.content || ""}
            onChange={(e) => onTextChange(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="w-full text-center border-none focus:outline-none"
            style={commonStyle}
          />
        ) : (
          <button
            style={commonStyle}
            className="w-full h-full"
            onDoubleClick={handleDoubleClick}
          >
            {element.content}
          </button>
        );

      case "image":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center" style={commonStyle}>
            {element.imageUrl ? (
              <img
                src={element.imageUrl}
                alt="User uploaded image"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded p-4">
                <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                <input 
                  type="text" 
                  value={imageInput} 
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full p-1 text-sm border rounded mb-2"
                />
                <button
                  onClick={() => onImageChange(imageInput)}
                  className="bg-blue-500 text-white text-xs py-1 px-2 rounded"
                >
                  Set Image
                </button>
              </div>
            )}
          </div>
        );

      case "rectangle":
        return <div className="w-full h-full" style={commonStyle}></div>;

      case "circle":
        return (
          <div
            className="rounded-full"
            style={{
              ...commonStyle,
              borderRadius: "50%",
            }}
          ></div>
        );
        
      case "arrow":
        return (
          <svg width="100%" height="100%" className="pointer-events-none">
            <defs>
              <marker
                id={`arrowhead-${element.id}`}
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon 
                  points="0 0, 10 3.5, 0 7" 
                  fill={element.style?.stroke as string || "#000"} 
                />
              </marker>
            </defs>
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke={element.style?.stroke as string || "#000"}
              strokeWidth={element.style?.strokeWidth as string || "2"}
              markerEnd={`url(#arrowhead-${element.id})`}
            />
          </svg>
        );
        
      case "triangle":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon 
              points="50,0 0,100 100,100" 
              fill={element.style?.backgroundColor as string || "#3b82f6"} 
              stroke={element.style?.borderColor as string || "none"} 
              strokeWidth={element.style?.borderWidth as string || "0"}
            />
          </svg>
        );
        
      case "star":
        return (
          <svg width="100%" height="100%" viewBox="0 0 50 50" preserveAspectRatio="none">
            <path 
              d="M25,1 L31,17 L48,17 L34,27 L39,43 L25,33 L11,43 L16,27 L2,17 L19,17 Z" 
              fill={element.style?.backgroundColor as string || "#f59e0b"} 
              stroke={element.style?.borderColor as string || "none"} 
              strokeWidth={element.style?.borderWidth as string || "0"}
            />
          </svg>
        );
        
      case "heart":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M50,30 C50,30 35,10 20,10 C5,10 0,25 0,30 C0,60 50,90 50,90 C50,90 100,60 100,30 C100,25 95,10 80,10 C65,10 50,30 50,30 Z" 
              fill={element.style?.backgroundColor as string || "#ef4444"} 
              stroke={element.style?.borderColor as string || "none"} 
              strokeWidth={element.style?.borderWidth as string || "0"}
            />
          </svg>
        );
        
      case "hexagon":
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon 
              points="25,0 75,0 100,50 75,100 25,100 0,50" 
              fill={element.style?.backgroundColor as string || "#8b5cf6"} 
              stroke={element.style?.borderColor as string || "none"} 
              strokeWidth={element.style?.borderWidth as string || "0"}
            />
          </svg>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <div className="relative w-full h-full">
      {isActive && (
        <div className="drag-handle absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 rounded text-xs flex items-center cursor-move z-10">
          <GripVertical size={14} />
          <span className="ml-1">{element.type}</span>
        </div>
      )}
      {renderElementContent()}
    </div>
  );
};

export default BuilderElement;
