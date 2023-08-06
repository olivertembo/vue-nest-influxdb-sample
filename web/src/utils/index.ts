export function formatData (data: TimeSeries[]) : ChartData
{
  const chartData: ChartData = {
    labels: [],
    datasets: []
  };

  const fields = new Set();

  for (let i = 0; i < data.length; i++) {
    fields.add(data[i]._field);
  }

  const fieldsArray = Array.from(fields);

  for (let i = 0; i < data.length; i++) {
    const timeString = data[i]._time;
    const fieldIndex = fieldsArray.indexOf(data[i]._field);

    if (chartData.labels.indexOf(timeString) === -1) {
      chartData.labels.push(timeString);
    }

    if (chartData.datasets[fieldIndex] === undefined) {
      const color = Math.floor(Math.random()*16777215).toString(16);
      chartData.datasets[fieldIndex] = {
        label: data[i]._field,
        backgroundColor: '#' + color,
        data: []
      };
    }

    chartData.datasets[fieldIndex].data.push(data[i]._value);
  }

  return chartData;
}