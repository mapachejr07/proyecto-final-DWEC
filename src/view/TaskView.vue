<template>
  <h1>esto es taskview </h1>
  <div id="div_filtro">

    <select name="" v-model="valor">

      <option value="" selected hidden disabled>Selecciona una opción</option>
      <option value="todas">Todas</option>
      <option value="completadas">Completadas</option>
      <option value="noCompletadas">No completadas</option>

    </select>

  </div>

  <div id="contenedor">
    <div id="contenido" v-for="(i, index) in filtro" :key="index">
        <div id="datos">
            <p>Id:{{ i.id }}</p>
            <p>Tarea:{{ i.todo }}</p>
            <p v-if="i.completed == true">Realizada</p>
            <p v-else>No realizada</p>
        </div>
        <button id="boton" @click="anadir_tarea({
            id : i.id,
            tarea : i.todo,
            realizada : i.completed,
            usuario : i.userId
        })">Agregar tarea</button>
    </div>
  </div>
</template>

<script setup>
import { anadirFavoritos } from '@/services/perfilUsuario';
import { userTareasStore } from '@/stores/peticion';
import { useToast } from 'vue-toastification';
import { onMounted, ref } from 'vue';
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
  await tareas.getData()
})


const valor = ref('todas')

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

</script>

<style lang="sass">
#contenedor
  display: flex
  flex-direction: column
  padding: 1%
  gap: 25px
  #contenido
    display: flex
    flex-direction: row
    gap: 15px
</style>
