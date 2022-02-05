import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/latest-matches',
    name: 'LatestMatches',
    component: () => import('../views/LatestMatches.vue')
  },
  {
    path: '/match-detail',
    name: 'MatchDetail',
    component: () => import('../views/MatchDetail.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
