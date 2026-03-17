<template>
  <div class="home">
    <h1>NYPL Manhattan Branches</h1>

    <!-- search form -->
    <div>
      <input type="text" v-model="searchInput" placeholder="search branch name..." />
      <button @click="searchBranches">Search</button>
      <button @click="loadAllBranches">Reset</button>
    </div>

    <p v-if="errorMsg" style="color: red;">{{ errorMsg }}</p>
    <p v-if="loading">Loading...</p>

    <!-- showing how many results -->
    <p v-if="branches.length > 0">Showing {{ filteredBranches.length }} branches</p>

    <!-- passing branch as prop to BranchCard -->
    <div class="grid">
      <BranchCard
        v-for="branch in filteredBranches"
        :key="branch.branch_name"
        :branch="branch"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BranchCard from '../components/BranchCard.vue'

const branches = ref([])
const loading = ref(false)
const errorMsg = ref('')
const searchInput = ref('')

// computed property to filter branches by search
const filteredBranches = computed(() => {
  if (searchInput.value == '') {
    return branches.value
  }
  return branches.value.filter(b =>
    b.branch_name.toLowerCase().includes(searchInput.value.toLowerCase())
  )
})

// load all branches on page load
onMounted(() => {
  loadAllBranches()
})

async function loadAllBranches() {
  loading.value = true
  errorMsg.value = ''
  searchInput.value = ''
  try {
    const res = await fetch('https://data.cityofnewyork.us/resource/3nja-bsch.json?$limit=50')
    if (!res.ok) {
      throw new Error('something went wrong')
    }
    const data = await res.json()
    branches.value = data
    console.log(data)
  } catch (err) {
    console.log(err)
    errorMsg.value = 'Error loading data. Try again.'
  }
  loading.value = false
}

function searchBranches() {
  // make sure search isnt empty
  if (searchInput.value.trim() == '') {
    errorMsg.value = 'Please enter a branch name'
    return
  }
  errorMsg.value = ''
  // filtering is handled by the computed property above
}
</script>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  margin-bottom: 15px;
}

input {
  padding: 8px;
  margin-right: 5px;
  font-size: 14px;
  width: 250px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 15px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #333;
  color: white;
  border: none;
  font-size: 14px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
}
</style>