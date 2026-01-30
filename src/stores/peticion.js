import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const userRickStore = defineStore('counter', () => {
  const lista_personajes = ref([])

  const getData = async () => {
    const resultado = await axios.get('https://rickandmortyapi.com/api/character')
    lista_personajes.value = resultado.data.results
  }
  return{getData, lista_personajes}
})

