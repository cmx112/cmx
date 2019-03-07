import Vue from 'vue'
import Router from 'vue-router'

let Index=()=>import("@/pages/Index")
let Login=()=>import("@/pages/login")
let Deatil=()=>import("@/pages/Detail")
let Shopcar=()=>import("@/pages/Shopcar")


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:Index,
    },{
      path:"/Login",
      component:Login
    },{
      path:"/Detail",
      component:Deatil
    },{
      path:"/Shopcar",
      component:Shopcar
    }
  ]
})
