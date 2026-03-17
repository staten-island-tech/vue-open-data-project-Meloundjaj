<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/stats">Stats</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
nav {
  background-color: #333;
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 10px;
  font-size: 16px;
}

nav a.router-link-active {
  color: #f0c040;
}
</style>