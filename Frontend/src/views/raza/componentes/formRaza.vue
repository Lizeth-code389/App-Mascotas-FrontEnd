<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    
    <el-form-item label="Codigo" prop="codigo">
      <el-input v-model.number="formulario.codigo" />
    </el-form-item>
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>
 

  </el-form>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'
import Raza from '../Raza.vue';


const propiedad = defineProps({
   raza: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  codigo: '',
  nombre: '',
 
  

})

const datosFormulario = () => {

  formulario.codigo = propiedad.dataValue[0].codigo;
  formulario.nombre = propiedad.dataValue[0].nombre;
  

}

const rulesForm = reactive({

  codigo: [
    {  
      type: 'text',
      required: false,
      message: 'Ingrese el codigo',
      trigger: 'blur',
    },


  ],


  nombre: [

    { 
      type:"text",
      required: true, 
      message: 'Raza de la mascota', 
      trigger: 'blur'
     }

  ],

  
})

const limpiarFormulario = () => {
  formRef.value.resetFields()
}

const validarFormulario = () => {

  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      if (valid) {
              resolve(true)
            } else {
                resolve(false)             
            }
            
        })
        })        

    
}

watch(
  () => propiedad.dataValue,
  (newData) => {
    datosFormulario();
  }
);

defineExpose({validarFormulario,formulario,limpiarFormulario})



</script>




<style scoped></style>