export interface SensorModel {
  identifier: string;
  temp: number;
  ph: number;
  water_level: number;
  turbidity: number;
  created_at: Date;
}
