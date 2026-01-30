import WorkSpaceView from '@/view/WorkSpaceView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '@/view/TaskView.vue'
import { getUser } from '@/services/autentication'
import AuthView from '@/view/AuthView.vue'
import { estaAutenticado } from '@/services/autentication'
import VerificationView from '@/view/VerificationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: TaskView, meta: {requiresAuth: true}},
    {path: '/auth', component: AuthView},
    {path: '/verify', component: VerificationView},
    {path: '/work', component: WorkSpaceView, meta: {requiresAuth: true}}
  ],
})

export default router


router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const user = getUser()

    if(estaAutenticado() && user.emaiVerification ){
      next()

    }else{

      next('/auth')
    }

  }else{

    next()
  }
})

