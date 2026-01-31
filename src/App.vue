<script setup>
  import { ref, onMounted } from 'vue';
  import { logOut} from './services/autentication';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const usuariolog = ref(false)
  const auth = getAuth()

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      usuariolog.value = !!user
    })
  })

  const logout = async () =>{
    await logOut()
    router.push('/auth')
  }
</script>

<template>
  <main>

    <div id="div_cuerpo">
        <router-link class="botones" to="/auth" v-if="!usuariolog">Auth</router-link>
        <router-link class="botones" to="/" v-if="usuariolog">Tasks</router-link>
        <router-link class="botones" to="/work" v-if="usuariolog">Work Space</router-link>

        <button class="boton2" v-if="usuariolog" @click="logout">Cerrar Sesión</button>
    </div>

    <div id="completo">
      <router-view></router-view>
    </div>
  </main>

</template>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: "Roboto", sans-serif

#div_cuerpo
  display: flex
  gap: 25px
  background: #F0F0F0
  padding: 1%
  justify-content: center
  width: 100%
  height: 5vw
  .botones
    text-align: center
    font-size: 20px
    text-decoration: none
    align-content: center
    font-weight: 500
    color: white
    padding: 10px
    background: black
    border-radius: 10px
    width: 150px
    height: 50px
    transition: background .3s ease-in-out
    &:hover
      background: transparent
      border: 3px solid black
      color: black

  .boton2
    border: solid red 3px
    font-size: 20px
    padding: 5px
    cursor: pointer
    border-radius: 10px
    width: 150px
    height: 50px
    transition: background .3s ease-in-out, color .3s ease-in-out
    &:hover
      background-color: #F63B3B
      color: #fff
main
  height: 100vh
  display: flex
  flex-direction: column
#completo
  background: #FAFAFA
  flex: 1
</style>
