
import { useState, useRef, forwardRef, ForwardedRef, useEffect } from "react";
import Draggable from "react-draggable";
import { ElementData } from "@/types/builder";
import BuilderElement from "./BuilderElement";
import { ResizeHandle } from "./ResizeHandle";
import { useIsMobile } from "@/hooks/use-mobile";

interface CanvasProps {
  elements: ElementData[];
  activeElement: string | null;
  setActiveElement: (id: string | null) => void;
  onUpdateElement: (element: ElementData) => void;
  onDeleteElement: (id: string) => void;
  onAddElement?: (type: string, position: { x: number, y: number }) => void;
  canvasBackground?: string;
  onMultiSelect?: (ids: string[]) => void;
  selectedElements?: string[];
  isMultiSelectMode?: boolean;
  toggleMultiSelectMode?: () => void;
}

const Canvas = forwardRef(({
  elements,
  activeElement,
  setActiveElement,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
  canvasBackground = "#ffffff",
  onMultiSelect,
  selectedElements = [],
  isMultiSelectMode = false,
  toggleMultiSelectMode,
}: CanvasProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [editingText, setEditingText] = useState<string | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [selectionBox, setSelectionBox] = useState<{start: {x: number, y: number}, current: {x: number, y: number}} | null>(null);
  const [canvasScale, setCanvasScale] = useState<number>(1);

  // Adjust canvas scale based on viewport
  useEffect(() => {
    const updateScale = () => {
      if (isMobile) {
        setCanvasScale(0.8);
      } else {
        setCanvasScale(1);
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isMobile]);

  // Add global keyboard event listener for Ctrl+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Select all elements with Ctrl+A
      if ((e.key === 'a' || e.key === 'A') && (e.ctrlKey || e.metaKey) && onMultiSelect) {
        e.preventDefault();
        const allElementIds = elements.map(el => el.id);
        onMultiSelect(allElementIds);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [elements, onMultiSelect]);

  const handleDragStop = (_e: any, data: any, elementId: string) => {
    const element = elements.find((el) => el.id === elementId);
    if (!element) return;

    onUpdateElement({
      ...element,
      position: { x: data.x, y: data.y },
    });
  };

  const handleResize = (id: string, deltaWidth: number, deltaHeight: number, direction: string) => {
    const element = elements.find((el) => el.id === id);
    if (!element) return;

    let newWidth = element.size.width;
    let newHeight = element.size.height;
    let newX = element.position.x;
    let newY = element.position.y;

    // Handle resizing based on direction
    switch(direction) {
      case "e": // Right edge
        newWidth = Math.max(20, element.size.width + deltaWidth);
        break;
      case "w": // Left edge
        newWidth = Math.max(20, element.size.width - deltaWidth);
        newX += deltaWidth;
        break;
      case "s": // Bottom edge
        newHeight = Math.max(20, element.size.height + deltaHeight);
        break;
      case "n": // Top edge
        newHeight = Math.max(20, element.size.height - deltaHeight);
        newY += deltaHeight;
        break;
      case "se": // Bottom-right corner
        newWidth = Math.max(20, element.size.width + deltaWidth);
        newHeight = Math.max(20, element.size.height + deltaHeight);
        break;
      case "sw": // Bottom-left corner
        newWidth = Math.max(20, element.size.width - deltaWidth);
        newHeight = Math.max(20, element.size.height + deltaHeight);
        newX += deltaWidth;
        break;
      case "ne": // Top-right corner
        newWidth = Math.max(20, element.size.width + deltaWidth);
        newHeight = Math.max(20, element.size.height - deltaHeight);
        newY += deltaHeight;
        break;
      case "nw": // Top-left corner
        newWidth = Math.max(20, element.size.width - deltaWidth);
        newHeight = Math.max(20, element.size.height - deltaHeight);
        newX += deltaWidth;
        newY += deltaHeight;
        break;
      default:
        break;
    }

    onUpdateElement({
      ...element,
      position: { x: newX, y: newY },
      size: { width: newWidth, height: newHeight },
    });
  };

  const handleTextEdit = (id: string, content: string) => {
    const element = elements.find((el) => el.id === id);
    if (!element) return;

    onUpdateElement({
      ...element,
      content,
    });
  };

  const handleImageChange = (id: string, imageUrl: string) => {
    const element = elements.find((el) => el.id === id);
    if (!element) return;

    onUpdateElement({
      ...element,
      imageUrl,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (selectedElements && selectedElements.length > 0) {
        // Delete all selected elements
        selectedElements.forEach(id => onDeleteElement(id));
        if (onMultiSelect) onMultiSelect([]);
      } else if (activeElement) {
        onDeleteElement(activeElement);
      }
    }
    
    // Toggle multi-select mode with Shift key
    if (e.key === "Shift" && toggleMultiSelectMode) {
      toggleMultiSelectMode();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    // Release multi-select mode when Shift is released
    if (e.key === "Shift" && toggleMultiSelectMode && isMultiSelectMode) {
      toggleMultiSelectMode();
    }
  };

  const handleCanvasDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasContainerRef.current || !onAddElement) return;
    
    // Get the canvas bounds
    const canvasRect = canvasContainerRef.current.getBoundingClientRect();
    
    // Calculate position relative to the canvas
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    // Add a text element at the click position
    onAddElement("text", { x, y });
  };
  
  // Handle canvas mouse down for selection box
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasContainerRef.current) return;
    
    // Only start selection box if clicking directly on the canvas (not an element)
    if ((e.target as HTMLElement).classList.contains('canvas-container')) {
      const canvasRect = canvasContainerRef.current.getBoundingClientRect();
      const startPos = {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top
      };
      
      setSelectionBox({
        start: startPos,
        current: startPos
      });
      
      // Clear active element when starting a new selection
      setActiveElement(null);
      
      // Clear multi-selection if not in multi-select mode
      if (!isMultiSelectMode && onMultiSelect) {
        onMultiSelect([]);
      }
    }
  };
  
  // Handle canvas mouse move for selection box
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectionBox && canvasContainerRef.current) {
      const canvasRect = canvasContainerRef.current.getBoundingClientRect();
      setSelectionBox({
        ...selectionBox,
        current: {
          x: e.clientX - canvasRect.left,
          y: e.clientY - canvasRect.top
        }
      });
    }
  };
  
  // Handle canvas mouse up for selection box
  const handleCanvasMouseUp = () => {
    if (selectionBox && onMultiSelect) {
      // Calculate selection box coordinates
      const selectionRect = {
        left: Math.min(selectionBox.start.x, selectionBox.current.x),
        top: Math.min(selectionBox.start.y, selectionBox.current.y),
        right: Math.max(selectionBox.start.x, selectionBox.current.x),
        bottom: Math.max(selectionBox.start.y, selectionBox.current.y)
      };
      
      // Find elements that are within the selection box
      const selectedIds = elements.filter(element => {
        const elementRect = {
          left: element.position.x,
          top: element.position.y,
          right: element.position.x + element.size.width,
          bottom: element.position.y + element.size.height
        };
        
        // Check if element intersects with selection box
        return !(
          elementRect.left > selectionRect.right ||
          elementRect.right < selectionRect.left ||
          elementRect.top > selectionRect.bottom ||
          elementRect.bottom < selectionRect.top
        );
      }).map(element => element.id);
      
      // Update selected elements
      if (isMultiSelectMode) {
        // In multi-select mode, add to existing selection
        onMultiSelect([...new Set([...selectedElements, ...selectedIds])]);
      } else {
        // Not in multi-select mode, replace selection
        onMultiSelect(selectedIds);
      }
      
      // Clear selection box
      setSelectionBox(null);
    }
  };

  // Handle element click for selection
  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    
    if (isMultiSelectMode && onMultiSelect) {
      // In multi-select mode, toggle selection
      const isSelected = selectedElements.includes(elementId);
      if (isSelected) {
        onMultiSelect(selectedElements.filter(id => id !== elementId));
      } else {
        onMultiSelect([...selectedElements, elementId]);
      }
    } else {
      // Not in multi-select mode, select only this element
      setActiveElement(elementId);
      if (onMultiSelect) {
        onMultiSelect([elementId]);
      }
    }
  };

  // Handle drag and drop from sidebar
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("element-type");
    
    if (elementType && onAddElement && canvasContainerRef.current) {
      const canvasRect = canvasContainerRef.current.getBoundingClientRect();
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;
      
      onAddElement(elementType, { x, y });
    }
  };

  // Calculate selection box style
  const selectionBoxStyle = selectionBox ? {
    position: 'absolute' as const,
    left: Math.min(selectionBox.start.x, selectionBox.current.x),
    top: Math.min(selectionBox.start.y, selectionBox.current.y),
    width: Math.abs(selectionBox.current.x - selectionBox.start.x),
    height: Math.abs(selectionBox.current.y - selectionBox.start.y),
    border: '1px dashed #3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    pointerEvents: 'none' as const
  } : {};

  return (
    <div 
      className="flex-1 bg-gray-100 relative overflow-auto"
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onClick={() => {
        setActiveElement(null);
        if (!isMultiSelectMode && onMultiSelect) {
          onMultiSelect([]);
        }
      }}
    >
      <div className={`w-full h-full ${isMobile ? 'p-2' : 'p-4'}`}>
        <div 
          ref={(node) => {
            // Forward ref for html2canvas
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            // Store ref locally for event handling
            if (canvasContainerRef) {
              canvasContainerRef.current = node;
            }
          }}
          className="canvas-container shadow-md w-full h-full min-h-[600px] rounded-md relative"
          style={{ 
            backgroundColor: canvasBackground,
            maxWidth: isMobile ? '100%' : '1200px',
            margin: '0 auto'
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDoubleClick={handleCanvasDoubleClick}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={() => selectionBox && setSelectionBox(null)}
        >
          {elements.map((element) => (
            <Draggable
              key={element.id}
              defaultPosition={element.position}
              position={element.position}
              onStop={(e, data) => handleDragStop(e, data, element.id)}
              bounds="parent"
              handle={activeElement === element.id || selectedElements.includes(element.id) ? ".drag-handle" : undefined}
              scale={canvasScale}
              disabled={editingText === element.id}
            >
              <div
                style={{
                  position: "absolute",
                  width: element.size.width,
                  height: element.size.height,
                }}
                onClick={(e) => handleElementClick(e, element.id)}
                className={`
                  ${activeElement === element.id ? "outline outline-2 outline-blue-500" : ""}
                  ${selectedElements.includes(element.id) ? "outline outline-2 outline-blue-500" : ""}
                  ${activeElement !== element.id && !selectedElements.includes(element.id) ? "cursor-move" : ""}
                `}
              >
                <BuilderElement
                  element={element}
                  isActive={activeElement === element.id || selectedElements.includes(element.id)}
                  isEditing={editingText === element.id}
                  setEditing={(isEditing) => setEditingText(isEditing ? element.id : null)}
                  onTextChange={(content) => handleTextEdit(element.id, content)}
                  onImageChange={(imageUrl) => handleImageChange(element.id, imageUrl)}
                />
                
                {(activeElement === element.id || selectedElements.includes(element.id)) && (
                  <ResizeHandle
                    elementId={element.id}
                    onResize={handleResize}
                  />
                )}
                
                {/* Selection indicator */}
                {selectedElements.includes(element.id) && activeElement !== element.id && (
                  <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none"></div>
                )}
              </div>
            </Draggable>
          ))}
          
          {/* Selection box */}
          {selectionBox && <div style={selectionBoxStyle}></div>}
        </div>
      </div>
    </div>
  );
});

Canvas.displayName = "Canvas";

export default Canvas;
