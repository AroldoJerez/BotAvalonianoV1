export interface Boss {
  name: string;
  position?: number;
  layer?: number;
  color?: string;
}

export interface BossConfig {
  name: string;
  [key: string | number]: string;
}
