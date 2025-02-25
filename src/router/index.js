import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '@/views/ListView.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list',
      name: 'movies',
      component: ListView,
      props: {genre: null}
    },
    {
      path: '/list/:genre',
      name: 'list-by-genre',
      component: ListView,
      props: true
    },
    {
      path: '/lst/:value',
      name: 'lst',
      component: ListView,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    }
  ],
})

export default router
