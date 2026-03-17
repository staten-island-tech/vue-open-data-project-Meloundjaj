<template>
  <div class="card" @click="goToBranch">
    <h3>{{ branch.branch_name }}</h3>
    <p>Visits: {{ branch.visits }}</p>
    <p>Items Circulated: {{ branch.items_circulated }}</p>
    <p>Registrations: {{ branch.registrations }}</p>
    <p>Click for more info</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

  
const props = defineProps({
  branch: Object
})

const router = useRouter()

function goToBranch() {
  router.push('/branch/' + props.branch.branch_name)
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 5px;
}

.card:hover {
  background-color: #f5f5f5;
}

.card h3 {
  margin-bottom: 5px;
}

.card p {
  margin: 3px 0;
  font-size: 14px;
  color: #555;
}
</style>