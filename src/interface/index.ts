export interface IEVData {
  basemsrp: string;
  cafveligibility: string;
  censustract: string;
  city: string;
  county: string;
  dolvehicleid: string;
  electricrange: string;
  electricutility: string;
  legislativedistrict: string;
  location: string;
  make: string;
  model: string;
  modelyear: string;
  postalcode: string;
  state: string;
  vehicletype: string;
  vin: string;
}

export interface IOverviewData {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}
