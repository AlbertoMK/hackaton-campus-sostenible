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
  type: 'paper' | 'organic' | 'glass' | 'other';
  capacity: number;
}

export interface ContainerLevel {
  id: string,
  level: number,
}

export interface ContainerHistory {
  id: string,
  history: LevelData[],
}

interface LevelData {
  timestamp: string,
  levelPercent: number,
}