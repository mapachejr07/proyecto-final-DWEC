<template>
  <h1>esto es work space </h1>
  <section>

    <div id="contenido" v-for="(i,index) in lista_tareas" :key="index">

      <div id="datos">
        <span><strong>ID: </strong>{{ i.id }}</span><br>
        <span><strong>Descripción: </strong>{{ i.tarea }}</span>
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

</style>
