import { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "@/components/builder/Sidebar";
import Canvas from "@/components/builder/Canvas";
import PropertySidebar from "@/components/builder/PropertySidebar";
import { ElementData, HistoryState, SharedDesign } from "@/types/builder";
import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { Undo2, Redo2, Share2, CheckSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger 
} from "@/components/ui/drawer";

const MAX_HISTORY = 50; // Maximum number of history states to keep

const Index = () => {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasBackground, setCanvasBackground] = useState<string>("#ffffff");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isPropertySidebarVisible, setIsPropertySidebarVisible] = useState(true);
  
  // Share design dialog state
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  
  // History management
  const [history, setHistory] = useState<HistoryState[]>([{ elements: [], canvasBackground: "#ffffff" }]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isUndoDisabled = historyIndex <= 0;
  const isRedoDisabled = historyIndex >= history.length - 1;

  const location = useLocation();
  const navigate = useNavigate();
  const { shareId } = useParams();
  const isMobile = useIsMobile();

  // Check for shared design ID in URL parameters
  useEffect(() => {
    if (shareId) {
      loadSharedDesign(shareId);
    }
  }, [shareId]);

  // Load shared design from localStorage
  const loadSharedDesign = (designId: string) => {
    try {
      const savedDesign = localStorage.getItem(`shared-design-${designId}`);
      
      if (!savedDesign) {
        toast({
          title: "Design Not Found",
          description: "The shared design could not be found",
          variant: "destructive",
        });
        return;
      }
      
      const design = JSON.parse(savedDesign) as SharedDesign;
      
      setElements(design.elements);
      setCanvasBackground(design.canvasBackground);
      
      // Add to history
      const newHistory = [{ elements: design.elements, canvasBackground: design.canvasBackground }];
      setHistory(newHistory);
      setHistoryIndex(0);
      
      toast({
        title: "Shared Design Loaded",
        description: "You're viewing a shared design",
      });
    } catch (error) {
      console.error("Error loading shared design:", error);
      toast({
        title: "Error Loading Design",
        description: "There was a problem loading the shared design",
        variant: "destructive",
      });
    }
  };

  // Generate share link for design
  const generateShareLink = () => {
    try {
      // Generate unique ID for sharing
      const designId = uuidv4();
      const shareUrl = `${window.location.origin}/${designId}`;
      
      // Create design object
      const sharedDesign: SharedDesign = {
        id: designId,
        elements,
        canvasBackground,
        createdAt: new Date().toISOString(),
      };
      
      // Save design to localStorage
      localStorage.setItem(`shared-design-${designId}`, JSON.stringify(sharedDesign));
      
      setShareLink(shareUrl);
      setShareDialogOpen(true);
      
    } catch (error) {
      console.error("Error saving shared design:", error);
      toast({
        title: "Error Creating Share Link",
        description: "There was a problem generating a share link",
        variant: "destructive",
      });
    }
  };

  // Copy share link to clipboard
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      toast({
        title: "Link Copied",
        description: "Share link copied to clipboard",
      });
    }).catch(err => {
      console.error("Could not copy link: ", err);
    });
  };

  // Add state to history
  const addToHistory = useCallback((elements: ElementData[], background: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ elements: JSON.parse(JSON.stringify(elements)), canvasBackground: background });
    
    // Limit history size
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (isUndoDisabled) return;
    
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    
    const prevState = history[newIndex];
    setElements(JSON.parse(JSON.stringify(prevState.elements)));
    setCanvasBackground(prevState.canvasBackground);
  };

  const handleRedo = () => {
    if (isRedoDisabled) return;
    
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    
    const nextState = history[newIndex];
    setElements(JSON.parse(JSON.stringify(nextState.elements)));
    setCanvasBackground(nextState.canvasBackground);
  };

  // Get default size based on element type
  const getDefaultSize = (type: string) => {
    switch (type) {
      case "text":
        return { width: 200, height: 40 };
      case "button":
        return { width: 120, height: 40 };
      case "rectangle":
        return { width: 120, height: 80 };
      case "circle":
        return { width: 80, height: 80 };
      case "triangle":
        return { width: 80, height: 80 };
      case "star":
        return { width: 100, height: 100 };
      case "heart":
        return { width: 80, height: 80 };
      case "hexagon":
        return { width: 100, height: 100 };
      case "arrow":
        return { width: 150, height: 20 };
      case "image":
        return { width: 200, height: 150 };
      default:
        return { width: 120, height: 80 };
    }
  };

  const getDefaultStyle = (type: string) => {
    switch (type) {
      case "text":
        return { color: "#000000", fontSize: "16px" };
      case "button":
        return { backgroundColor: "#3b82f6", color: "#ffffff", borderRadius: "4px" };
      case "rectangle":
        return { backgroundColor: "#3b82f6", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
      case "circle":
        return { backgroundColor: "#10b981", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
      case "triangle":
        return { backgroundColor: "#8b5cf6", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
      case "star":
        return { backgroundColor: "#f59e0b", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
      case "heart":
        return { backgroundColor: "#ef4444", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
      case "hexagon":
        return { backgroundColor: "#6366f1", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
      case "arrow":
        return { stroke: "#000000", strokeWidth: "2" };
      default:
        return {};
    }
  };

  const addElement = (type: string, customPosition?: { x: number, y: number }) => {
    // Generate random position with some margin from edges if not provided
    const position = customPosition || {
      x: Math.floor(Math.random() * 300) + 20,
      y: Math.floor(Math.random() * 300) + 20
    };
    
    // Get default size based on element type
    const size = getDefaultSize(type);
    const style = getDefaultStyle(type);

    let newElement: ElementData = {
      id: `element-${Date.now()}`,
      type,
      position,
      size,
      content: type === "text" ? "Double click to edit text" : 
               type === "button" ? "Button" : "",
      imageUrl: type === "image" ? "" : undefined,
      style,
      isEditable: true,
    };

    // Special handling for arrow
    if (type === "arrow") {
      newElement.points = [
        { x: 0, y: 0 },
        { x: 150, y: 0 }
      ];
    }

    const updatedElements = [...elements, newElement];
    setElements(updatedElements);
    setActiveElement(newElement.id);
    addToHistory(updatedElements, canvasBackground);
    
    toast({
      title: "Element Added",
      description: `Added a new ${type} element to the canvas`,
    });
  };

  const updateElement = (updatedElement: ElementData) => {
    const updatedElements = elements.map((el) => 
      (el.id === updatedElement.id ? updatedElement : el)
    );
    setElements(updatedElements);
    addToHistory(updatedElements, canvasBackground);
  };

  const deleteElement = (id: string) => {
    const updatedElements = elements.filter((el) => el.id !== id);
    setElements(updatedElements);
    if (activeElement === id) {
      setActiveElement(null);
    }
    setSelectedElements(selectedElements.filter(elementId => elementId !== id));
    addToHistory(updatedElements, canvasBackground);
    
    toast({
      title: "Element Deleted",
      description: "Element has been removed from the canvas",
    });
  };

  const duplicateElement = () => {
    if (!activeElement) return;
    
    const elementToDuplicate = elements.find(el => el.id === activeElement);
    if (!elementToDuplicate) return;
    
    const newElement = {
      ...JSON.parse(JSON.stringify(elementToDuplicate)),
      id: `element-${Date.now()}`,
      position: {
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20
      }
    };
    
    const updatedElements = [...elements, newElement];
    setElements(updatedElements);
    setActiveElement(newElement.id);
    addToHistory(updatedElements, canvasBackground);
    
    toast({
      title: "Element Duplicated",
      description: `Duplicated the ${elementToDuplicate.type} element`,
    });
  };

  const deleteSelectedElements = () => {
    if (selectedElements.length === 0) return;
    
    const updatedElements = elements.filter(el => !selectedElements.includes(el.id));
    setElements(updatedElements);
    setSelectedElements([]);
    setActiveElement(null);
    addToHistory(updatedElements, canvasBackground);
    
    toast({
      title: "Elements Deleted",
      description: `Deleted ${selectedElements.length} selected elements`,
    });
  };

  const handleMultiSelect = (elementIds: string[]) => {
    setSelectedElements(elementIds);
  };

  const toggleMultiSelectMode = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
  };

  const exportCanvas = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `my-canvas-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Canvas Exported",
        description: "Your design has been exported as JPG",
      });
    } catch (error) {
      console.error("Error exporting canvas:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your design",
        variant: "destructive",
      });
    }
  };

  const getActiveElementData = () => {
    if (!activeElement) return null;
    return elements.find(el => el.id === activeElement) || null;
  };

  const updateCanvasBackground = (color: string) => {
    setCanvasBackground(color);
    addToHistory(elements, color);
  };

  const loadTemplate = (templateName: string) => {
    let templateElements: ElementData[] = [];
    let templateBackground = "#ffffff";
    
    // Simple portfolio template
    if (templateName === "portfolio") {
      templateBackground = "#f8f9fa";
      templateElements = [
        {
          id: `element-${Date.now()}-1`,
          type: "text",
          position: { x: 50, y: 50 },
          size: { width: 400, height: 60 },
          content: "John Doe - Designer & Developer",
          style: { fontSize: "32px", fontWeight: "bold", color: "#333333" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-2`,
          type: "text",
          position: { x: 50, y: 120 },
          size: { width: 500, height: 80 },
          content: "I create beautiful and functional web experiences with a focus on user experience and modern design principles.",
          style: { fontSize: "16px", color: "#666666" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-3`,
          type: "rectangle",
          position: { x: 50, y: 230 },
          size: { width: 200, height: 200 },
          style: { backgroundColor: "#4c6ef5", borderRadius: "8px" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-4`,
          type: "rectangle",
          position: { x: 270, y: 230 },
          size: { width: 200, height: 200 },
          style: { backgroundColor: "#ff922b", borderRadius: "8px" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-5`,
          type: "rectangle",
          position: { x: 490, y: 230 },
          size: { width: 200, height: 200 },
          style: { backgroundColor: "#51cf66", borderRadius: "8px" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-6`,
          type: "button",
          position: { x: 50, y: 450 },
          size: { width: 150, height: 50 },
          content: "Contact Me",
          style: { backgroundColor: "#212529", color: "#ffffff", borderRadius: "4px" },
          isEditable: true,
        }
      ];
    } 
    // Business card template
    else if (templateName === "business-card") {
      templateBackground = "#ffffff";
      templateElements = [
        {
          id: `element-${Date.now()}-1`,
          type: "rectangle",
          position: { x: 100, y: 100 },
          size: { width: 400, height: 200 },
          style: { backgroundColor: "#343a40", borderRadius: "8px" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-2`,
          type: "text",
          position: { x: 130, y: 130 },
          size: { width: 200, height: 40 },
          content: "John Doe",
          style: { fontSize: "24px", fontWeight: "bold", color: "#ffffff" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-3`,
          type: "text",
          position: { x: 130, y: 170 },
          size: { width: 200, height: 30 },
          content: "Product Designer",
          style: { fontSize: "16px", color: "#ced4da" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-4`,
          type: "text",
          position: { x: 130, y: 230 },
          size: { width: 300, height: 30 },
          content: "john@example.com | (555) 123-4567",
          style: { fontSize: "14px", color: "#ced4da" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-5`,
          type: "circle",
          position: { x: 400, y: 150 },
          size: { width: 60, height: 60 },
          style: { backgroundColor: "#fd7e14" },
          isEditable: true,
        },
      ];
    }
    // Social media post template
    else if (templateName === "social-post") {
      templateBackground = "#e9ecef";
      templateElements = [
        {
          id: `element-${Date.now()}-1`,
          type: "rectangle",
          position: { x: 100, y: 100 },
          size: { width: 500, height: 500 },
          style: { backgroundColor: "#dee2e6", borderRadius: "12px" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-2`,
          type: "text",
          position: { x: 150, y: 150 },
          size: { width: 400, height: 100 },
          content: "Your Amazing Product Launch",
          style: { fontSize: "32px", fontWeight: "bold", color: "#212529", textAlign: "center" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-3`,
          type: "circle",
          position: { x: 300, y: 300 },
          size: { width: 100, height: 100 },
          style: { backgroundColor: "#339af0" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-4`,
          type: "text",
          position: { x: 150, y: 420 },
          size: { width: 400, height: 60 },
          content: "Coming Soon - Stay Tuned!",
          style: { fontSize: "18px", color: "#495057", textAlign: "center" },
          isEditable: true,
        },
        {
          id: `element-${Date.now()}-5`,
          type: "button",
          position: { x: 275, y: 500 },
          size: { width: 150, height: 40 },
          content: "Learn More",
          style: { backgroundColor: "#339af0", color: "#ffffff", borderRadius: "20px" },
          isEditable: true,
        },
      ];
    }

    setElements(templateElements);
    setCanvasBackground(templateBackground);
    addToHistory(templateElements, templateBackground);
    
    toast({
      title: "Template Loaded",
      description: `Loaded the ${templateName} template`,
    });
  };

  // For mobile device property drawer
  const PropertyDrawer = () => {
    const activeElement = getActiveElementData();
    
    if (!activeElement) return null;
    
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed top-16 right-4 z-30"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 5.98935 8.87499 7.49998 8.87499C9.01061 8.87499 10.0846 9.25463 10.8291 9.9883C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.0749 12.975 13.8623 12.975 13.5999C12.975 11.72 12.4778 10.2794 11.4959 9.31167C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-4 py-6">
          <PropertySidebar 
            element={activeElement} 
            onUpdateElement={updateElement} 
          />
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isUndoDisabled}
            onClick={handleUndo}
            className="flex items-center gap-1"
          >
            <Undo2 size={16} />
            <span className="hidden sm:inline">Undo</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isRedoDisabled}
            onClick={handleRedo}
            className="flex items-center gap-1"
          >
            <Redo2 size={16} />
            <span className="hidden sm:inline">Redo</span>
          </Button>
          <div className="ml-2 flex items-center gap-2">
            <span className="text-sm hidden sm:inline">Background:</span>
            <input
              type="color"
              value={canvasBackground}
              onChange={(e) => updateCanvasBackground(e.target.value)}
              className="w-8 h-8 rounded-md border"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isMultiSelectMode ? "default" : "outline"}
            size="sm"
            onClick={toggleMultiSelectMode}
            className="flex items-center gap-1"
          >
            <CheckSquare size={16} />
            <span className="hidden sm:inline">Select Multiple</span>
          </Button>
          {selectedElements.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteSelectedElements}
              className="flex items-center gap-1"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Delete Selected</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={generateShareLink}
            disabled={isGeneratingLink}
            className="flex items-center gap-1"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar 
            onAddElement={addElement} 
            onDuplicateElement={activeElement ? duplicateElement : undefined}
            activeElementId={activeElement}
            onExportCanvas={exportCanvas}
            onLoadTemplate={loadTemplate}
            onShareDesign={generateShareLink}
            onDeleteSelected={deleteSelectedElements}
            hasSelection={selectedElements.length > 0}
          />
        )}
        
        <div className="flex-1 flex flex-col">
          <Canvas
            elements={elements}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
            onAddElement={addElement}
            ref={canvasRef}
            canvasBackground={canvasBackground}
            onMultiSelect={handleMultiSelect}
            selectedElements={selectedElements}
            isMultiSelectMode={isMultiSelectMode}
            toggleMultiSelectMode={toggleMultiSelectMode}
          />
        </div>
        
        {!isMobile && (
          <PropertySidebar 
            element={getActiveElementData()} 
            onUpdateElement={updateElement} 
          />
        )}
        
        {/* Mobile UI components */}
        {isMobile && (
          <>
            <Sidebar 
              onAddElement={addElement} 
              onDuplicateElement={activeElement ? duplicateElement : undefined}
              activeElementId={activeElement}
              onExportCanvas={exportCanvas}
              onLoadTemplate={loadTemplate}
              onShareDesign={generateShareLink}
              onDeleteSelected={deleteSelectedElements}
              hasSelection={selectedElements.length > 0}
            />
            
            {activeElement && <PropertyDrawer />}
          </>
        )}
      </div>
      
      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share your design</DialogTitle>
            <DialogDescription>
              Anyone with this link can view your design. Share it with friends or colleagues.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Input
                readOnly
                value={shareLink}
                className="px-3 py-2 w-full"
              />
            </div>
            <Button onClick={copyShareLink}>Copy</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
