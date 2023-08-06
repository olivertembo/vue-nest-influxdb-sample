<template>
  <div class="dashboard">
    <button class="btn" @click="generateData">generate DATA</button>
    <div class="loading" v-if="isLoading">
      Loading...
    </div>
    <div class="chart" v-if="chartLoadData && !isLoading">
      <h4>Device 1</h4>
      <Line :data="chartLoadData" :options="chartOptions" />
    </div>
    <br />
    <div class="chart" v-if="solarData && !isLoading">
      <h4>Device 2</h4>
      <Line :data="solarData" :options="chartOptions" />
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
import store from '../store';
import { formatData } from '../utils';
import { computed, onMounted, ref } from 'vue';

const generateData = async () => {
    if (!accessToken.value) {
        console.error('Access token not found in store.');
        return;
    }

    isLoading.value = true;

    const headers = {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch('http://localhost:4000/api/data/seed', {
            method: 'GET', // I'm assuming POST, modify if needed.
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to generate data via the API.');
        }

        const result = await response.json();
        console.log('Data generated:', result);

        // If you need to refresh the data in the charts after generating, 
        // you might want to call the fetching logic again here.
        
    } catch (error) {
        console.error('Error generating data:', error);
    } finally {
        isLoading.value = false;
    }

    await fetchData();
};

const fetchData = async () => {
    if (!accessToken.value) {
        throw new Error('Access token not found in store.');
    }

    const headers = {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json',
    };

    let response = await fetch('http://localhost:4000/api/data/solar', {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data from the API.');
    }
    let data = await response.json();

    if (data.length > 0) {
        solarData.value = formatData(data);
    }

    response = await fetch('http://localhost:4000/api/data/load', {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data from the API.');
    }

    data = await response.json();

    if (data.length > 0) {
        chartLoadData.value = formatData(data);
    }
};


interface DataSet {
  label: string;
  backgroundColor: string;
  data: number[];
};

interface ChartData {
  labels: string[];
  datasets: DataSet[];
};


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const isLoading = ref(false);
const chartLoadData = ref<ChartData>({
    labels: [],
    datasets: []
  });
const solarData = ref<ChartData>({
    labels: [],
    datasets: []
  });

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const accessToken = computed(() => store.state.token);


onMounted(async () => {
  try {
        isLoading.value = true;
        await fetchData();
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>
<style>
.dashboard {
  padding: 1rem;
}
.btn {
  display: block;
  margin: auto;
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
}
.loading {
  text-align: center;
  font-size: large;
}

.chart {
  max-width: 700px;
  height: 500px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
}
h4 {
  text-align: center;
  font-size: large;
}
</style>
