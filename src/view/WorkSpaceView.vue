<template>
  <header>
    <h1>esto es work space </h1>
  </header>

  <section>

    <div id="contenido" v-for="(i,index) in lista_tareas" :key="index">

      <div id="datos">
        <span><strong>ID: </strong>{{ i.id }}</span><br>
        <span><strong>Tarea: </strong>{{ i.tarea }}</span>
        <p v-if="i.realizada == true">Realizada</p>
        <p v-else>No realizada</p>
      </div>
    </div>

  </section>
</template>


<script setup>
import { obtenerFavoritos } from '@/services/perfilUsuario';
import { onActivated, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()
const lista_tareas = ref([])

const tareas = async () => {
  try {
    const response = await obtenerFavoritos()
    if(response.ok){
      lista_tareas.value = response.favs
    }else{
      toast.error('algo ha salido mal al obtener tareas')
    }

  } catch (error) {
    alert('Algo ha fallado en la función de tareas')
    console.log(error);
  }
}

onMounted(() => {
  tareas()
})

onActivated(() => {
  tareas()
})


</script>

<style lang="sass">
header
  width: 100%
  padding: 1.2rem 2rem
  display: flex
  justify-content: center
  align-items: center
  background: #D4D4D4
  box-shadow: 0 4px 12px rgba(0,0,0,0.25)

  h1
    margin: 0
    font-size: 1.6rem
    color: #3a3a3a
    font-weight: 700
    letter-spacing: 2px
    text-transform: uppercase

section
  min-height: 100vh
  background: #D4D4D4
  display: flex
  flex-direction: column
  align-items: center
  padding: 1rem
  gap: 20px

#contenido
  width: 50%
  background: #f0f0f0
  padding: 1.2rem 1.5rem
  border-radius: 10px
  box-shadow: 0 6px 14px rgba(0,0,0,0.25)
  transition: transform 0.2s ease, box-shadow 0.2s ease
  &:hover
    box-shadow: 0 15px 20px rgba(0,0,0,0.5)

  #datos
    display: flex
    flex-direction: column
    gap: 6px
    color: #3a3a3a
    span
      font-size: 1rem
    p
      margin: 0
      font-weight: 600

</style>
