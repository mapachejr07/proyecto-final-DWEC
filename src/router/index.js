import WorkSpaceView from '@/view/WorkSpaceView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '@/view/TaskView.vue'
import { getUser } from '@/services/autentication'
import AuthView from '@/view/AuthView.vue'
import { estaAutenticado } from '@/services/autentication'
import { useToast } from 'vue-toastification'


const toast = useToast()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: TaskView, meta: {requiresAuth: true}},
    {path: '/auth', component: AuthView},
    {path: '/work', component: WorkSpaceView, meta: {requiresAuth: true}}
  ],
})

export default router

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const user = getUser()

    if(estaAutenticado() && user.emailVerified ){
      next()
    }else{
      toast.info("Necesitas tener una cuenta verificada", {
      position: "top-right",
      timeout: 2006,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    })
      next('/auth')
    }

  }else{

    next()
  }
})

