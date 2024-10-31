<script>
//logica js

import { ref } from 'vue'

const nombre = ref('1110')


</script>



<template>

   <h1>Modulos de paises</h1>

   {{ nombre }}
   <el-input v-model="nombre" style="width: 240px" placeholder="Ingrese su nombre" />


   <el-button type="success">Success</el-button>



</template>


<style>
/* estilos css*/
</style>