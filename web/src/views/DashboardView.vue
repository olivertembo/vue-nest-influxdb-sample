<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="chart">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


let chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Power',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    },
    {
      label: 'Voltage',
      backgroundColor: 'green',
      data: [30, 29, 50, 60, 79, 80, 0]
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}


const store = useStore();
const user = computed(() => store.state.user);
const accessToken = computed(() => store.state.token);

console.log("Current user", user);
console.log("Current token", accessToken);

onMounted(async () => {
  if (!accessToken.value) {
    throw new Error('Access token not found in store.');
  }

  const headers = {
    Authorization: `Bearer ${accessToken.value}`,
    'Content-Type': 'application/json',
  };


  try {

    const response = await fetch('http://localhost:4000/api/data/solar', {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from the API.');
    }
    const data = await response.json();

    if (data.length > 0) {
      const newChartData = {
        labels: data.map((item: any) => item._time), // Array of _time values
        datasets: [
          {
            label: 'Power',
            backgroundColor: '#f87979',
            data: data
              .filter((item: any) => item._field === 'power') // Filter data for power values
              .map((item: any) => item._value), // Array of power values
          },
          {
            label: 'Voltage',
            backgroundColor: 'green',
            data: data
              .filter((item: any) => item._field === 'voltage') // Filter data for voltage values
              .map((item: any) => item._value), // Array of voltage values
          },
        ],
      };
      chartData = newChartData;
      console.log("New chart data", newChartData);
    }
    console.log("Data", data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>
<style>
.dashboard {
  padding: 1rem;
}

.chart {
  max-width: 700px;
  height: 500px;
  margin: auto;
}
</style>
