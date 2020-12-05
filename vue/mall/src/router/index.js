import Vue from 'vue';
import VueRouter from "vue-router";

const Main = () => import('views/main/Main')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/main'
  },
  {
    path: '/main',
    component:Main
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
