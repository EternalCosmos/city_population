export interface CountryResponse {
  error: boolean,
  msg: string,
  data: Array<PositionRecord>
}

export interface PositionRecord {
  name: string;
  long: string;
  lat: string;
}
