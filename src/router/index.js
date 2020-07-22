import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index.vue"
import File from "../views/File.vue"
import ImageBed from "../views/ImageBed.vue"
import BigFile from "../views/BigFile.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "Index", 
    component: Index, 
    children: [
      {
        path: "/File",
        component: File
      },
      {
        path: "/ImageBed",
        component: ImageBed
      },
      {
        path: "/BigFile",
        component: BigFile
      }
    ]
  }

]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
