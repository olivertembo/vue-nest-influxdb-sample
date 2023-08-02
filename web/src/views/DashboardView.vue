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
import { computed } from 'vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


 const chartData = {
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

console.log("Current user", user);
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
