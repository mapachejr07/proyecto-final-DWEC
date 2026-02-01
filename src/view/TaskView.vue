<template>
  <main>
    <header>
      <h1>TASK VIEW</h1>
      <div id="div_filtro">
        <select v-model="valor">
          <option value="" disabled hidden>Selecciona una opción</option>
          <option value="todas">Todas</option>
          <option value="completadas">Completadas</option>
          <option value="noCompletadas">No completadas</option>
        </select>
      </div>
    </header>



    <div v-if="loading" class="spinner-wrapper">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>
    <div v-else id="contenedor">
      <div id="contenido" v-for="(i, index) in filtro" :key="index">
        <div id="datos">
          <p>Id: {{ i.id }}</p>
          <p>Tarea: {{ i.todo }}</p>
          <p v-if="i.completed">Realizada</p>
          <p v-else>No realizada</p>
        </div>

        <button id="boton" v-if="!i.completed" @click="anadir_tarea({
            id: i.id,
            tarea: i.todo,
            realizada: i.completed,
            usuario: i.userId
          })">Agregar tarea</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { anadirFavoritos } from '@/services/perfilUsuario';
import { userTareasStore } from '@/stores/peticion';
import { useToast } from 'vue-toastification';
import { onMounted, ref, watch } from 'vue';
import { computed } from 'vue';

const toast = useToast()
const tareas = userTareasStore()

const anadir_tarea = async(tareas) => {
  try {
    const response = await anadirFavoritos(tareas)
    if(response.ok){
      toast.success('tarea añadida con exito')
    }
  } catch (error) {
    alert('error al añadir la tarea')
    console.log(error);
  }
}

onMounted( async () => {
  loading.value = true
  await tareas.getData()
  loading.value = false
})

const valor = ref('todas')
const loading = ref(false)


const filtro = computed(() => {
  if(valor.value === 'todas'){
    return tareas.lista_tareas
  }
  if(valor.value === 'completadas'){
    return tareas.lista_tareas.filter(i => i.completed === true)
  }
  if(valor.value === 'noCompletadas'){
    return tareas.lista_tareas.filter(i => i.completed === false)
  }
  return tareas.lista_tareas
})

watch(valor, () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 240)
})
</script>

<style lang="sass">
header
  width: 100%
  padding: 1.2rem 2rem
  display: flex
  justify-content: space-between
  align-items: center
  background: #D4D4D4
  box-shadow: 0 4px 12px rgba(0,0,0,0.25)

  h1
    margin: 0
    font-size: 1.6rem
    color: #3a3a3a
    font-weight: 700
    letter-spacing: 2px
  #div_filtro
    select
      background: #3a3a3a
      color: #e0e0e0
      border: none
      padding: 0.5rem 0.9rem
      font-size: 1.2rem
      border-radius: 6px
      outline: none
      cursor: pointer
      transition: all 0.25s ease
      &:hover
        background: #444


#contenedor
  display: flex
  flex-direction: column
  background: #D4D4D4
  justify-content: center
  align-items: center
  padding: 1%
  gap: 25px

  #contenido
    display: flex
    align-items: center
    padding: 1%
    background: #f0f0f0
    box-shadow: 0 6px 14px rgba(0,0,0,0.25)
    border-radius: 10px
    width: 50%
    flex-direction: row
    gap: 15px

    #boton
      display: flex
      justify-content: center
      align-items: center
      width: 130px
      height: 42px
      background: #3a3a3a
      color: #f5f5f5
      font-size: 0.95rem
      font-weight: 600
      border-radius: 8px
      border: none
      cursor: pointer
      box-shadow: 2px 2px 6px rgba(0,0,0,0.35)
      transition: all 0.25s ease

      &:hover
        background: #4a4a4a








// Animación
.spinner-wrapper
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  background: rgba(0,0,0,0.3)
  z-index: 1000

.sk-chase
  width: 60px
  height: 60px
  position: relative
  animation: sk-chase 2.5s infinite linear both

  .sk-chase-dot
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    animation: sk-chase-dot 2s infinite ease-in-out both

    &:before
      content: ''
      display: block
      width: 25%
      height: 25%
      background-color: #fff
      border-radius: 100%
      animation: sk-chase-dot-before 2s infinite ease-in-out both

    &:nth-child(1)
      animation-delay: -1.1s
      &:before
        animation-delay: -1.1s

    &:nth-child(2)
      animation-delay: -1.0s
      &:before
        animation-delay: -1.0s

    &:nth-child(3)
      animation-delay: -0.9s
      &:before
        animation-delay: -0.9s

    &:nth-child(4)
      animation-delay: -0.8s
      &:before
        animation-delay: -0.8s

    &:nth-child(5)
      animation-delay: -0.7s
      &:before
        animation-delay: -0.7s

    &:nth-child(6)
      animation-delay: -0.6s
      &:before
        animation-delay: -0.6s

@keyframes sk-chase
  100%
    transform: rotate(360deg)

@keyframes sk-chase-dot
  80%, 100%
    transform: rotate(360deg)

@keyframes sk-chase-dot-before
  50%
    transform: scale(0.4)
  0%, 100%
    transform: scale(1.0)
</style>
