<template>
  <main>

    <div id="cuerpo">
      <div id="register" v-if="registrarse">
        <form @submit.prevent="registro">

          <div id="div_inputs">
            <label>Email:</label>
            <input type="email" v-model="email" placeholder="Dime tu email..." required>
          </div>

          <div id="div_inputs">
            <label>Password:</label>
            <input type="text" v-model="passwd" placeholder="Agrega tu contraseña...." required>
          </div>

          <div id="div_inputs">
            <label>Confirm Password:</label>
            <input type="text" v-model="confirmaPasswd" placeholder="Confirma tu contraseña" required>
          </div>
          <div id="div_botones">
            <button class="sesion" type="submit">Registrarse</button>
            <button class="botones" @click="registrarse = !registrarse">Ir al login</button>
          </div>
        </form>
      </div>

      <div id="register" v-if="!registrarse">
        <form @submit.prevent="login">

          <div id="div_inputs">
            <span>Email:</span>
            <input type="email" v-model="email" placeholder="Dime tu email..." required>
          </div>

          <div id="div_inputs">
            <span>Password:</span>
            <input type="text" v-model="passwd" placeholder="Agrega tu contraseña...." required>
          </div>

          <div id="div_botones">
            <button class="sesion" type="submit">Iniciar Sesión</button>
            <button class="botones" @click="registrarse = !registrarse">Ir al registro</button>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { doLogin, doRegister } from '@/services/autentication'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { sendEmail } from '@/services/autentication'
import { auth } from '@/firebase/config'

const user = auth.currentUser

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
    const enviar = await sendEmail(user)
    console.log(enviar);
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
      router.push('/')
    }, 2000);
  }else{
    toast.error('Algo ha salido mal en el login')
  }
}
</script>
<style scoped lang="sass">
main
  min-height: 100vh
  background: #D4D4D4
  display: flex
  justify-content: center
  align-items: center

#cuerpo
  display: flex
  justify-content: center
  align-items: center
  width: 100%

#register
  width: 360px
  background: #f0f0f0
  padding: 1.8rem
  border-radius: 14px
  box-shadow: 0 8px 18px rgba(0,0,0,0.25)

  form
    display: flex
    flex-direction: column
    gap: 20px

#div_inputs
  display: flex
  flex-direction: column
  gap: 6px

  label, span
    font-size: 0.9rem
    font-weight: 600
    color: #3a3a3a

  input
    padding: 0.55rem 0.7rem
    border-radius: 6px
    border: 1px solid #bdbdbd
    background: #eaeaea
    color: #2f2f2f
    outline: none
    font-size: 0.9rem
    transition: border 0.2s ease, background 0.2s ease

    &:focus
      background: #fff
      border: 1px solid #3a3a3a

#div_botones
  display: flex
  flex-direction: column
  gap: 10px
  margin-top: 10px

.sesion
  background: #3a3a3a
  color: #f5f5f5
  border: none
  border-radius: 8px
  padding: 0.6rem
  font-size: 0.95rem
  font-weight: 600
  cursor: pointer
  transition: background 0.2s ease

  &:hover
    background: #4a4a4a

.botones
  background: transparent
  color: #3a3a3a
  border: 1px solid #3a3a3a
  border-radius: 8px
  padding: 0.55rem
  font-size: 0.9rem
  font-weight: 500
  cursor: pointer
  transition: background 0.2s ease, color 0.2s ease

  &:hover
    background: #3a3a3a
    color: #f5f5f5

</style>
