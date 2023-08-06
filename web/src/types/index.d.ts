interface DataSet {
  label: string;
  backgroundColor: string;
  data: number[];
};

interface ChartData {
  labels: string[];
  datasets: DataSet[];
};

interface TimeSeries {
  result: string;
  table: number;
  _start: string;
  _stop: string; 
  _time: string;
  _value: number;
  _field: string;
  _measurement: string;
  host: string;
};
