import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatsView from '../views/StatsView.vue'
import BranchView from '../views/BranchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/stats',
      component: StatsView
    },
  
    {
      path: '/branch/:name',
      component: BranchView,
      props: true
    }
  ]})

export default router