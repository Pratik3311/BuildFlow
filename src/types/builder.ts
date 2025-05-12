
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ElementData {
  id: string;
  type: string;
  position: Position;
  size: Size;
  content?: string;
  imageUrl?: string;
  style?: Record<string, string | number>;
  isEditable?: boolean;
  points?: Position[]; // For arrow elements
  isSelected?: boolean; // For multi-select functionality
}

export interface HistoryState {
  elements: ElementData[];
  canvasBackground: string;
}

export interface SharedDesign {
  id: string;
  elements: ElementData[];
  canvasBackground: string;
  createdAt: string;
  publicId?: string; // For global sharing
}
