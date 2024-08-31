export interface CityResult {
  name: string;
  id: number;
  geometry: {
    type: string;
    coordinates: number[][];
  };
}
