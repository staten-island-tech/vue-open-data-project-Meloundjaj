<template>
  <div class="branch-detail">
    <RouterLink to="/">← back</RouterLink>

    <p v-if="loading">Loading...</p>
    <p v-if="errorMsg" style="color:red">{{ errorMsg }}</p>

    <div v-if="branchInfo">
      <h1>{{ branchInfo.branch_name }}</h1>
      <table>
        <tr>
          <th>Visits</th>
          <td>{{ branchInfo.visits }}</td>
        </tr>
        <tr>
          <th>Registrations</th>
          <td>{{ branchInfo.registrations }}</td>
        </tr>
        <tr>
          <th>Items Circulated</th>
          <td>{{ branchInfo.items_circulated }}</td>
        </tr>
        <tr>
          <th>Computer Sessions</th>
          <td>{{ branchInfo.computer_sessions }}</td>
        </tr>
        <tr>
          <th>WiFi Sessions</th>
          <td>{{ branchInfo.wifi_sessions }}</td>
        </tr>
        <tr>
          <th>Programs</th>
          <td>{{ branchInfo.programs }}</td>
        </tr>
        <tr>
          <th>Program Attendance</th>
          <td>{{ branchInfo.program_attendance }}</td>
        </tr>
      </table>
    </div>

    <p v-if="!loading && !branchInfo && !errorMsg">Branch not found</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'


const props = defineProps({
  name: String
})

const branchInfo = ref({branch_name: 'Your Branch'})
const results =ref([])


async function fetchbranchData() {
  try {
    const res = await fetch(
      `https://data.cityofnewyork.us/resource/3nja-bsch.json?branch=${encodeURIComponent(branchInfo.value.branch_name)}`,
    )
    
    const data = await res.json()

    results.value = data.slice(0, 5)
    results.value = data[0]
    results.value = data.filter(item => item.branch_name === props.name)
  } catch (err) {
    console.log('Fetch error:', err)
    errorMsg.value = 'Failed to load branch data: ' + err.message

  }
}

</script>

<style scoped>
.branch-detail {
  padding: 20px;
}

h1 {
  margin: 15px 0;
}

table {
  border-collapse: collapse;
  width: 400px;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
  font-weight: bold;
}

a {
  color: #333;
  font-size: 14px;
}
</style>