<template>
  <div class="stats">
    <h1>Branch Statistics</h1>
    <p v-if="loading">Loading...</p>
    <p v-if="errorMsg" style="color: red;">{{ errorMsg }}</p>

    <div v-if="!loading && branches.length > 0">

      <!-- chart 1 - bar chart for visits -->
      <h2>Visits by Branch</h2>
      <canvas id="barChart"></canvas>

      <!-- chart 2 - doughnut chart for items circulated -->
      <h2 style="margin-top: 40px;">Items Circulated</h2>
      <div style="max-width: 500px;">
        <canvas id="doughnutChart"></canvas>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const branches = ref([])
const loading = ref(false)
const errorMsg = ref('')


onMounted(async () => {
  await getData()
  if (branches.value.length > 0) {
    makeCharts()
  }
})

async function getData() {
  loading.value = true
  try {
   const res = await fetch(
  'https://data.cityofnewyork.us/resource/3nja-bsch.json?$limit=50',
  {
    headers: {
      'X-App-Token': 'APJ6r0raekjtRaPBN1UpTmMGr'
    }
  }
)
    if (!res.ok) {
      throw new Error('failed to fetch: ' + res.status)
    }
    const data = await res.json()
    branches.value = data
    console.log('got data', data)
  } catch (err) {
    console.log(err)
    errorMsg.value = 'Failed to load data: ' + err.message
  }
  loading.value = false
}

function makeCharts() {

  const top10 = branches.value
    .filter(b => b.visits)
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10)

  const labels = top10.map(b => b.branch_name)
  const visitData = top10.map(b => Number(b.visits))

 
  const ctx1 = document.getElementById('barChart')
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Visits',
        data: visitData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  const top6 = branches.value
    .filter(b => b.items_circulated)
    .sort((a, b) => b.items_circulated - a.items_circulated)
    .slice(0, 6)

  const ctx2 = document.getElementById('doughnutChart')
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: top6.map(b => b.branch_name),
      datasets: [{
        label: 'Items Circulated',
        data: top6.map(b => Number(b.items_circulated)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ]
      }]
    }
  })
}
</script>

<style scoped>
.stats {
  padding: 20px;
}

h2 {
  margin-top: 30px;
  margin-bottom: 10px;
}

canvas {
  max-height: 400px;
}
</style>