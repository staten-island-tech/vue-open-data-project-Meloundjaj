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


async function getData() {
  loading.value = true
  try {
   const res = await fetch(

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