
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Image, Text, Square, Circle, RectangleHorizontal, Triangle,
  Copy, Download, ArrowRight, LayoutTemplate, Link,
  Star, Heart, Hexagon, Share2
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger 
} from "@/components/ui/drawer";

interface SidebarProps {
  onAddElement: (type: string) => void;
  onDuplicateElement?: () => void;
  onExportCanvas: () => void;
  activeElementId?: string | null;
  onLoadTemplate: (templateName: string) => void;
  onShareDesign?: () => void;
  onDeleteSelected?: () => void;
  hasSelection?: boolean;
}

interface ElementButtonProps {
  type: string;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const ElementButton = ({ type, icon: Icon, label, onClick }: ElementButtonProps) => {
  // Add drag and drop functionality
  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData("element-type", type);
  };

  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-20 py-2"
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
    >
      <Icon size={24} />
      <span className="mt-1 text-sm">{label}</span>
    </Button>
  );
};

const Sidebar = ({ 
  onAddElement, 
  onDuplicateElement, 
  onExportCanvas, 
  activeElementId,
  onLoadTemplate,
  onShareDesign,
  onDeleteSelected,
  hasSelection
}: SidebarProps) => {
  const isMobile = useIsMobile();

  // For desktop sidebar view
  const DesktopSidebar = () => (
    <div className="bg-white border-r border-gray-200 p-4 flex flex-col h-full w-64">
      <h2 className="text-xl font-bold mb-4">Elements</h2>
      <div className="grid grid-cols-2 gap-2">
        <ElementButton
          type="text"
          icon={Text}
          label="Text"
          onClick={() => onAddElement("text")}
        />
        <ElementButton
          type="image"
          icon={Image}
          label="Image"
          onClick={() => onAddElement("image")}
        />
        <ElementButton
          type="button"
          icon={RectangleHorizontal}
          label="Button"
          onClick={() => onAddElement("button")}
        />
        <ElementButton
          type="rectangle"
          icon={Square}
          label="Rectangle"
          onClick={() => onAddElement("rectangle")}
        />
        <ElementButton
          type="circle"
          icon={Circle}
          label="Circle"
          onClick={() => onAddElement("circle")}
        />
        <ElementButton
          type="arrow"
          icon={ArrowRight}
          label="Arrow"
          onClick={() => onAddElement("arrow")}
        />
        <ElementButton
          type="triangle"
          icon={Triangle}
          label="Triangle"
          onClick={() => onAddElement("triangle")}
        />
        <ElementButton
          type="star"
          icon={Star}
          label="Star"
          onClick={() => onAddElement("star")}
        />
        <ElementButton
          type="heart"
          icon={Heart}
          label="Heart"
          onClick={() => onAddElement("heart")}
        />
        <ElementButton
          type="hexagon"
          icon={Hexagon}
          label="Hexagon"
          onClick={() => onAddElement("hexagon")}
        />
      </div>

      <Separator className="my-4" />
      
      <div className="space-y-2">
        <h3 className="font-medium">Actions</h3>
        {activeElementId && (
          <Button 
            variant="outline" 
            className="w-full flex items-center" 
            onClick={onDuplicateElement}
          >
            <Copy size={16} className="mr-2" />
            Duplicate Element
          </Button>
        )}
        
        {hasSelection && (
          <Button 
            variant="outline" 
            className="w-full flex items-center" 
            onClick={onDeleteSelected}
          >
            <Copy size={16} className="mr-2" />
            Delete Selected
          </Button>
        )}
      </div>

      <Separator className="my-4" />
      
      <div className="space-y-2">
        <h3 className="font-medium">Templates</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full flex items-center">
              <LayoutTemplate size={16} className="mr-2" />
              Load Template
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onLoadTemplate("portfolio")}>
              Portfolio Template
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onLoadTemplate("business-card")}>
              Business Card
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onLoadTemplate("social-post")}>
              Social Media Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="my-4" />
      
      <div className="mt-auto space-y-2">
        <Button className="w-full mb-2 flex items-center justify-center" onClick={onExportCanvas}>
          <Download size={16} className="mr-2" />
          Export as JPG
        </Button>
        
        <Button 
          className="w-full flex items-center justify-center" 
          variant="outline"
          onClick={onShareDesign}
        >
          <Share2 size={16} className="mr-2" />
          Share Design
        </Button>
      </div>
    </div>
  );

  // For mobile drawer view
  const MobileSidebar = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-16 left-4 z-30">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 py-6">
        <div className="grid grid-cols-3 gap-2 mb-6">
          <DrawerClose asChild>
            <Button size="sm" variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={() => onAddElement("text")}>
              <Text size={20} />
              <span className="text-xs mt-1">Text</span>
            </Button>
          </DrawerClose>
          
          <DrawerClose asChild>
            <Button size="sm" variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={() => onAddElement("button")}>
              <RectangleHorizontal size={20} />
              <span className="text-xs mt-1">Button</span>
            </Button>
          </DrawerClose>
          
          <DrawerClose asChild>
            <Button size="sm" variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={() => onAddElement("rectangle")}>
              <Square size={20} />
              <span className="text-xs mt-1">Rectangle</span>
            </Button>
          </DrawerClose>
          
          <DrawerClose asChild>
            <Button size="sm" variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={() => onAddElement("circle")}>
              <Circle size={20} />
              <span className="text-xs mt-1">Circle</span>
            </Button>
          </DrawerClose>
          
          <DrawerClose asChild>
            <Button size="sm" variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={() => onAddElement("triangle")}>
              <Triangle size={20} />
              <span className="text-xs mt-1">Triangle</span>
            </Button>
          </DrawerClose>
          
          <DrawerClose asChild>
            <Button size="sm" variant="outline" className="flex flex-col items-center p-3 h-auto" onClick={() => onAddElement("star")}>
              <Star size={20} />
              <span className="text-xs mt-1">Star</span>
            </Button>
          </DrawerClose>
        </div>
        
        <div className="space-y-3">
          {activeElementId && (
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center" 
                onClick={onDuplicateElement}
              >
                <Copy size={16} className="mr-2" />
                Duplicate
              </Button>
            </DrawerClose>
          )}
          
          {hasSelection && (
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center" 
                onClick={onDeleteSelected}
              >
                <Copy size={16} className="mr-2" />
                Delete Selected
              </Button>
            </DrawerClose>
          )}
          
          <Separator className="my-3" />
          
          <DrawerClose asChild>
            <Button className="w-full flex items-center justify-center" onClick={onExportCanvas}>
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </DrawerClose>
          
          <DrawerClose asChild>
            <Button 
              className="w-full flex items-center justify-center" 
              variant="outline"
              onClick={onShareDesign}
            >
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );

  // Return the appropriate sidebar based on device size
  return (
    <>
      {isMobile ? <MobileSidebar /> : <DesktopSidebar />}
    </>
  );
};

export default Sidebar;
