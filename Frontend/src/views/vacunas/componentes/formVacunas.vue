<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Codigo" prop="codigo">
      <el-input v-model.number="formulario.codigo" />
    </el-form-item>
    
    <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="formulario.nombre"  :label="Vacunas.nombre" />
    </el-form-item>

    <el-form-item label="Descripción  Vacuna" prop="descripcion  vacuna">
        <el-input v-model="formulario.descripcion_vacuna"  :label="Vacunas.descripcion_vacuna" />
    </el-form-item>

  </el-form>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'
import Vacunas from '../Vacunas.vue';

const propiedad = defineProps({
  Vacunas: {
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
  descripcion_vacuna: '',
  

})

const datosFormulario = () => {

  formulario.codigo = propiedad.dataValue[0].codigo;
  formulario.nombre = propiedad.dataValue[0].nombre;
  formulario.descripcion_vacuna = propiedad.dataValue[0].descripcion_vacuna;
  
  

}

const rulesForm = reactive({
  codigo: [
    { required: true, message: 'Por favor ingrese el codigo de la vacuna', trigger: 'blur' },
  
    {
      type: 'number',
      message: 'El código debe ser un número',
      trigger: 'blur',
    },
    ],

  nombre: [
    {
      required: true, 
      message: 'Por favor ingrese el nombre de la vacuna',
      trigger: 'blur',
    },
  ],
  
  descripcion_vacuna: [
    { 
      type:'text',
      required: true, 
      message: 'Por favor ingrese la descripcion de la vacuna',
      trigger: 'blur',
    },
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