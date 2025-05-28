export interface Container {
  id: string;
  type: 'paper' | 'organic' | 'glass' | 'other';
  center: string;
  location: string;
  latitude: number;
  longitude: number;
  capacity: number;
  unit: 'liters';
}

export interface SimpleContainer {
  id: string;
  capacity: number;
}