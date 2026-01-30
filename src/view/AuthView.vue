<template>
  <h1>esto es authview </h1>
  <div id="register" v-if="registrarse">
    <form @submit.prevent="registro">

      <div id="div_email">
        <span>Email:</span>
        <input type="text" v-model="email" placeholder="Dime tu email...">
      </div>

      <div id="div_passwd">
        <span>Password:</span>
        <input type="text" v-model="passwd" placeholder="Agrega tu contraseña....">
      </div>

      <div id="div_confPasswd">
        <span>Confirm Password:</span>
        <input type="text" v-model="confirmaPasswd" placeholder="Confirma tu contraseña">
      </div>
      <button type="submit">Registrarse</button>
    </form>
    <button @click="registrarse = !registrarse">Ir al login</button>
  </div>

  <div id="register" v-if="!registrarse">
    <form @submit.prevent="login">

      <div id="div_email">
        <span>Email:</span>
        <input type="text" v-model="email" placeholder="Dime tu email...">
      </div>

      <div id="div_passwd">
        <span>Password:</span>
        <input type="text" v-model="passwd" placeholder="Agrega tu contraseña....">
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <button @click="registrarse = !registrarse">Ir al registro</button>
  </div>



</template>

<script setup>
import { doLogin, doRegister } from '@/services/autentication'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const registrarse = ref(true)

const email = ref('')
const passwd = ref('')
const confirmaPasswd = ref('')

const comprobar = computed(() =>
  passwd.value === confirmaPasswd.value
)

const registro = async () => {
  if(!comprobar.value){
    toast.error("Los datos son incorrectos, intentalo de nuevo", {
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
    return
  }
  const resultado = await doRegister(email.value, passwd.value)

  if(resultado){
    toast.success("Cuenta creada correctamente, ¡rápido ve a logearte!", {
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
    setTimeout(() => {
      registrarse.value = false
    }, 1500);
  }else{
    toast.error('Algo ha salido mal al registrar')
  }
}

const login = async () => {
  const resultado = await doLogin(email.value, passwd.value)

  if(resultado){
    toast.success("Login correcto", {
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
    setTimeout(() => {
      router.push('/verify')
    }, 2500);
  }else{
    toast.error('Algo ha salido mal en el login')
  }
}



</script>

<style lang="sass">

</style>
