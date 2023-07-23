import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ToyDetails from '../views/ToyDetails.vue'
import ToyEdit from '../views/ToyEdit.vue'
import ToyIndex from '../views/ToyIndex.vue'
// import DragAndDrop from '../views/DragAndDrop.vue'

import Dashboard from '../views/Dashboard.vue'
// import GoogleMap from '../views/GoogleMap.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },

    {
      path: '/toy',
      name: 'toyIndex',
      component: ToyIndex,
    },
    {
      path: '/toy/:toyId',
      name: 'toyDetails',
      component: ToyDetails,
    },

    {
      path: '/toy/edit/:toyId?',
      name: 'toyEdit',
      component: ToyEdit,
    },
    {
      path: '/toy/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    // {
    //   path: '/test',
    //   name: 'DragAndDrop',
    //   component: DragAndDrop,
    // },


    // {
    //   path: '/toy',
    //   component: toyIndex,
    //   children: [
    //     {
    //       path: 'edit/:toyId?',
    //       component: toyEdit,
    //     },
    //     {
    //       path: 'details/:toyId',
    //       component: toyDetails,
    //     },
    //   ],
    // },
  ],
})

export default router
