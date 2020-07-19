import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index.vue"
import BigFile from "../views/BigFile.vue"
import Image from "../views/Image.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "Index", 
    component: Index, 
    children: [
      {
        path: "/BigFile",
        component: BigFile
      },
      {
        path: "/Image",
        component: Image
      },
    ]
  }

]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
