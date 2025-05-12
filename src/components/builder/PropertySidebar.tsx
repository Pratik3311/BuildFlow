
import { ElementData } from "@/types/builder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Palette, BoxSelect, Text, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  Move, AlignHorizontalJustifyCenter, AlignVerticalJustifyCenter,
  CloudFog
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertySidebarProps {
  element: ElementData | null;
  onUpdateElement: (element: ElementData) => void;
}

const PropertySidebar = ({ element, onUpdateElement }: PropertySidebarProps) => {
  const isMobile = useIsMobile();

  const [openSections, setOpenSections] = useState<{
    [key: string]: boolean;
  }>({
    dimensions: true,
    position: true,
    appearance: true,
    shadow: true,
    text: true,
    arrow: true,
  });

  if (!element) {
    return (
      <div className={`bg-white border-l border-gray-200 p-4 ${isMobile ? 'w-full' : 'w-64'}`}>
        <h2 className="text-xl font-bold mb-4">Properties</h2>
        <p className="text-gray-500">Select an element to edit its properties</p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const updateElementStyle = (
    property: string,
    value: string | number
  ) => {
    if (!element) return;

    onUpdateElement({
      ...element,
      style: {
        ...element.style,
        [property]: value,
      },
    });
  };

  const updateElementContent = (content: string) => {
    if (!element) return;

    onUpdateElement({
      ...element,
      content,
    });
  };

  const updateElementPosition = (x: number, y: number) => {
    if (!element) return;

    onUpdateElement({
      ...element,
      position: {
        x: x !== undefined ? x : element.position.x,
        y: y !== undefined ? y : element.position.y,
      },
    });
  };

  const updateElementSize = (width: number, height: number) => {
    if (!element) return;

    onUpdateElement({
      ...element,
      size: {
        width: width !== undefined ? width : element.size.width,
        height: height !== undefined ? height : element.size.height,
      },
    });
  };

  const moveElement = (direction: string, amount: number = 10) => {
    if (!element) return;
    let { x, y } = element.position;

    switch (direction) {
      case "up":
        y -= amount;
        break;
      case "down":
        y += amount;
        break;
      case "left":
        x -= amount;
        break;
      case "right":
        x += amount;
        break;
    }

    updateElementPosition(x, y);
  };

  return (
    <div className={`bg-white border-l border-gray-200 p-4 overflow-y-auto ${isMobile ? 'w-full h-96' : 'w-64'}`}>
      <h2 className="text-xl font-bold mb-2">Properties</h2>
      <p className="text-sm text-gray-500 mb-4">
        Edit {element.type} element
      </p>

      {/* Dimensions Section */}
      <Collapsible
        open={openSections.dimensions}
        onOpenChange={() => toggleSection("dimensions")}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <div className="flex items-center">
            <Move size={16} className="mr-2" />
            <span>Size</span>
          </div>
          <span>{openSections.dimensions ? "−" : "+"}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          <div>
            <Label htmlFor="width" className="text-xs">
              Width (px)
            </Label>
            <Input
              id="width"
              type="number"
              value={element.size.width}
              onChange={(e) => updateElementSize(Number(e.target.value), element.size.height)}
              className="h-8"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-xs">
              Height (px)
            </Label>
            <Input
              id="height"
              type="number"
              value={element.size.height}
              onChange={(e) => updateElementSize(element.size.width, Number(e.target.value))}
              className="h-8"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Position Section */}
      <Collapsible
        open={openSections.position}
        onOpenChange={() => toggleSection("position")}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <div className="flex items-center">
            <AlignHorizontalJustifyCenter size={16} className="mr-2" />
            <span>Position</span>
          </div>
          <span>{openSections.position ? "−" : "+"}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="posX" className="text-xs">
                X Position
              </Label>
              <Input
                id="posX"
                type="number"
                value={element.position.x}
                onChange={(e) => updateElementPosition(Number(e.target.value), element.position.y)}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor="posY" className="text-xs">
                Y Position
              </Label>
              <Input
                id="posY"
                type="number"
                value={element.position.y}
                onChange={(e) => updateElementPosition(element.position.x, Number(e.target.value))}
                className="h-8"
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-2 space-x-1">
            <button 
              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => moveElement("up")}
            >
              <ArrowUp size={16} />
            </button>
            <button 
              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => moveElement("down")}
            >
              <ArrowDown size={16} />
            </button>
            <button 
              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => moveElement("left")}
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => moveElement("right")}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Shadow Section - New! */}
      <Collapsible
        open={openSections.shadow}
        onOpenChange={() => toggleSection("shadow")}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <div className="flex items-center">
            <CloudFog size={16} className="mr-2" />
            <span>Shadow</span>
          </div>
          <span>{openSections.shadow ? "−" : "+"}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="shadowEnabled" className="text-xs">
              Enable Shadow
            </Label>
            <input
              id="shadowEnabled"
              type="checkbox"
              checked={!!element.style?.boxShadow && element.style.boxShadow !== 'none'}
              onChange={(e) => updateElementStyle("boxShadow", e.target.checked ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none')}
              className="h-4 w-4"
            />
          </div>
          
          {element.style?.boxShadow && element.style.boxShadow !== 'none' && (
            <>
              <div>
                <Label htmlFor="shadowColor" className="text-xs">
                  Shadow Color
                </Label>
                <div className="flex gap-2">
                  <input
                    id="shadowColor"
                    type="color"
                    value="#000000"
                    onChange={(e) => {
                      const color = e.target.value;
                      const opacity = element.style?.shadowOpacity || 0.2;
                      const x = element.style?.shadowX || 0;
                      const y = element.style?.shadowY || 4;
                      const blur = element.style?.shadowBlur || 6;
                      
                      // Convert color to RGB components - make sure we're working with strings
                      const colorStr = String(color);
                      const r = parseInt(colorStr.substring(1, 3), 16);
                      const g = parseInt(colorStr.substring(3, 5), 16);
                      const b = parseInt(colorStr.substring(5, 7), 16);
                      
                      updateElementStyle("boxShadow", `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`);
                      updateElementStyle("shadowColor", color);
                    }}
                    className="w-8 h-8 rounded-md border"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="shadowOpacity" className="text-xs">
                  Shadow Opacity
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="shadowOpacity"
                    min={0}
                    max={100}
                    step={1}
                    value={[Math.round((element.style?.shadowOpacity as number || 0.2) * 100)]}
                    onValueChange={(value) => {
                      const opacity = value[0] / 100;
                      // Make sure we're working with strings for shadowColor
                      const colorStr = String(element.style?.shadowColor || "#000000");
                      const x = element.style?.shadowX || 0;
                      const y = element.style?.shadowY || 4;
                      const blur = element.style?.shadowBlur || 6;
                      
                      // Convert color to RGB components
                      const r = parseInt(colorStr.substring(1, 3), 16);
                      const g = parseInt(colorStr.substring(3, 5), 16);
                      const b = parseInt(colorStr.substring(5, 7), 16);
                      
                      updateElementStyle("shadowOpacity", opacity);
                      updateElementStyle("boxShadow", `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`);
                    }}
                    className="flex-1"
                  />
                  <span className="text-sm w-8 text-right">
                    {Math.round((element.style?.shadowOpacity as number || 0.2) * 100)}%
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="shadowBlur" className="text-xs">
                  Shadow Blur
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="shadowBlur"
                    min={0}
                    max={30}
                    step={1}
                    value={[element.style?.shadowBlur as number || 6]}
                    onValueChange={(value) => {
                      const blur = value[0];
                      // Make sure we're working with strings for shadowColor
                      const colorStr = String(element.style?.shadowColor || "#000000");
                      const opacity = element.style?.shadowOpacity || 0.2;
                      const x = element.style?.shadowX || 0;
                      const y = element.style?.shadowY || 4;
                      
                      // Convert color to RGB components
                      const r = parseInt(colorStr.substring(1, 3), 16);
                      const g = parseInt(colorStr.substring(3, 5), 16);
                      const b = parseInt(colorStr.substring(5, 7), 16);
                      
                      updateElementStyle("shadowBlur", blur);
                      updateElementStyle("boxShadow", `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`);
                    }}
                    className="flex-1"
                  />
                  <span className="text-sm w-8 text-right">
                    {element.style?.shadowBlur as number || 6}px
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="shadowX" className="text-xs">
                    X Offset
                  </Label>
                  <Input
                    id="shadowX"
                    type="number"
                    value={element.style?.shadowX as number || 0}
                    onChange={(e) => {
                      const x = parseInt(e.target.value);
                      // Make sure we're working with strings for shadowColor
                      const colorStr = String(element.style?.shadowColor || "#000000");
                      const opacity = element.style?.shadowOpacity || 0.2;
                      const y = element.style?.shadowY || 4;
                      const blur = element.style?.shadowBlur || 6;
                      
                      // Convert color to RGB components
                      const r = parseInt(colorStr.substring(1, 3), 16);
                      const g = parseInt(colorStr.substring(3, 5), 16);
                      const b = parseInt(colorStr.substring(5, 7), 16);
                      
                      updateElementStyle("shadowX", x);
                      updateElementStyle("boxShadow", `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`);
                    }}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label htmlFor="shadowY" className="text-xs">
                    Y Offset
                  </Label>
                  <Input
                    id="shadowY"
                    type="number"
                    value={element.style?.shadowY as number || 4}
                    onChange={(e) => {
                      const y = parseInt(e.target.value);
                      // Make sure we're working with strings for shadowColor
                      const colorStr = String(element.style?.shadowColor || "#000000");
                      const opacity = element.style?.shadowOpacity || 0.2;
                      const x = element.style?.shadowX || 0;
                      const blur = element.style?.shadowBlur || 6;
                      
                      // Convert color to RGB components
                      const r = parseInt(colorStr.substring(1, 3), 16);
                      const g = parseInt(colorStr.substring(3, 5), 16);
                      const b = parseInt(colorStr.substring(5, 7), 16);
                      
                      updateElementStyle("shadowY", y);
                      updateElementStyle("boxShadow", `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`);
                    }}
                    className="h-8"
                  />
                </div>
              </div>
            </>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Appearance Section */}
      <Collapsible
        open={openSections.appearance}
        onOpenChange={() => toggleSection("appearance")}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          <div className="flex items-center">
            <Palette size={16} className="mr-2" />
            <span>Appearance</span>
          </div>
          <span>{openSections.appearance ? "−" : "+"}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          {element.type !== "arrow" && (
            <div>
              <Label htmlFor="bgColor" className="text-xs">
                Background Color
              </Label>
              <div className="flex gap-2">
                <input
                  id="bgColor"
                  type="color"
                  value={(element.style?.backgroundColor as string) || "#ffffff"}
                  onChange={(e) => updateElementStyle("backgroundColor", e.target.value)}
                  className="w-8 h-8 rounded-md border"
                />
                <Input
                  value={(element.style?.backgroundColor as string) || "#ffffff"}
                  onChange={(e) => updateElementStyle("backgroundColor", e.target.value)}
                  className="h-8 flex-1"
                />
              </div>
            </div>
          )}
          
          {element.type === "arrow" ? (
            <>
              <div>
                <Label htmlFor="strokeColor" className="text-xs">
                  Arrow Color
                </Label>
                <div className="flex gap-2">
                  <input
                    id="strokeColor"
                    type="color"
                    value={(element.style?.stroke as string) || "#000000"}
                    onChange={(e) => updateElementStyle("stroke", e.target.value)}
                    className="w-8 h-8 rounded-md border"
                  />
                  <Input
                    value={(element.style?.stroke as string) || "#000000"}
                    onChange={(e) => updateElementStyle("stroke", e.target.value)}
                    className="h-8 flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="strokeWidth" className="text-xs">
                  Arrow Width
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="strokeWidth"
                    min={1}
                    max={10}
                    step={1}
                    value={[parseInt((element.style?.strokeWidth as string) || "2")]}
                    onValueChange={(value) => updateElementStyle("strokeWidth", `${value[0]}`)}
                    className="flex-1"
                  />
                  <span className="text-sm w-8 text-right">
                    {parseInt((element.style?.strokeWidth as string) || "2")}px
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="borderColor" className="text-xs">
                  Border Color
                </Label>
                <div className="flex gap-2">
                  <input
                    id="borderColor"
                    type="color"
                    value={(element.style?.borderColor as string) || "#000000"}
                    onChange={(e) => updateElementStyle("borderColor", e.target.value)}
                    className="w-8 h-8 rounded-md border"
                  />
                  <Input
                    value={(element.style?.borderColor as string) || "#000000"}
                    onChange={(e) => updateElementStyle("borderColor", e.target.value)}
                    className="h-8 flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="borderWidth" className="text-xs">
                  Border Width (px)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="borderWidth"
                    min={0}
                    max={10}
                    step={1}
                    value={[parseInt((element.style?.borderWidth as string) || "0")]}
                    onValueChange={(value) => updateElementStyle("borderWidth", `${value[0]}px`)}
                    className="flex-1"
                  />
                  <span className="text-sm w-8 text-right">
                    {parseInt((element.style?.borderWidth as string) || "0")}px
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="borderStyle" className="text-xs">
                  Border Style
                </Label>
                <select
                  id="borderStyle"
                  value={(element.style?.borderStyle as string) || "solid"}
                  onChange={(e) => updateElementStyle("borderStyle", e.target.value)}
                  className="w-full h-8 border rounded-md px-2 text-sm"
                >
                  <option value="none">None</option>
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                </select>
              </div>

              <div>
                <Label htmlFor="borderRadius" className="text-xs">
                  Border Radius (px)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="borderRadius"
                    min={0}
                    max={50}
                    step={1}
                    value={[parseInt((element.style?.borderRadius as string) || "0")]}
                    onValueChange={(value) => updateElementStyle("borderRadius", `${value[0]}px`)}
                    className="flex-1"
                  />
                  <span className="text-sm w-8 text-right">
                    {parseInt((element.style?.borderRadius as string) || "0")}px
                  </span>
                </div>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="opacity" className="text-xs">
              Opacity
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                id="opacity"
                min={0}
                max={100}
                step={5}
                value={[Math.round((element.style?.opacity as number || 1) * 100)]}
                onValueChange={(value) => updateElementStyle("opacity", value[0] / 100)}
                className="flex-1"
              />
              <span className="text-sm w-8 text-right">
                {Math.round((element.style?.opacity as number || 1) * 100)}%
              </span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Text Section - only for text and button elements */}
      {(element.type === "text" || element.type === "button") && (
        <Collapsible
          open={openSections.text}
          onOpenChange={() => toggleSection("text")}
          className="mb-4"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            <div className="flex items-center">
              <Text size={16} className="mr-2" />
              <span>Text</span>
            </div>
            <span>{openSections.text ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <div>
              <Label htmlFor="content" className="text-xs">
                Content
              </Label>
              <Input
                id="content"
                value={element.content || ""}
                onChange={(e) => updateElementContent(e.target.value)}
                className="h-8"
              />
            </div>
            
            <div>
              <Label htmlFor="textColor" className="text-xs">
                Text Color
              </Label>
              <div className="flex gap-2">
                <input
                  id="textColor"
                  type="color"
                  value={(element.style?.color as string) || "#000000"}
                  onChange={(e) => updateElementStyle("color", e.target.value)}
                  className="w-8 h-8 rounded-md border"
                />
                <Input
                  value={(element.style?.color as string) || "#000000"}
                  onChange={(e) => updateElementStyle("color", e.target.value)}
                  className="h-8 flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="fontSize" className="text-xs">
                Font Size (px)
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="fontSize"
                  min={8}
                  max={72}
                  step={1}
                  value={[parseInt((element.style?.fontSize as string) || "16")]}
                  onValueChange={(value) => updateElementStyle("fontSize", `${value[0]}px`)}
                  className="flex-1"
                />
                <span className="text-sm w-8 text-right">
                  {parseInt((element.style?.fontSize as string) || "16")}px
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="fontWeight" className="text-xs">
                Font Weight
              </Label>
              <select
                id="fontWeight"
                value={(element.style?.fontWeight as string) || "normal"}
                onChange={(e) => updateElementStyle("fontWeight", e.target.value)}
                className="w-full h-8 border rounded-md px-2 text-sm"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                <option value="bolder">Bolder</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="textAlign" className="text-xs">
                Text Alignment
              </Label>
              <select
                id="textAlign"
                value={(element.style?.textAlign as string) || "left"}
                onChange={(e) => updateElementStyle("textAlign", e.target.value)}
                className="w-full h-8 border rounded-md px-2 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default PropertySidebar;
