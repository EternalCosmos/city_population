export interface PopulationResponse {
  error: boolean,
  msg: string,
  data: {
    city: string,
    country: string,
    populationCounts: Array<PopulationRecord>
  }
}

export interface PopulationRecord {
  year: string;
  value: string;
  sex: string;
  reliabilty: string;
}
