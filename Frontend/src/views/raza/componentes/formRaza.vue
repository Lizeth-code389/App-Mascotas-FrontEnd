<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Codigo" prop="codigo">
      <el-input v-model.number="formulario.codigo" />
    </el-form-item>
    
    <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="formulario.nombre"  :label="raza.nombre" />
    </el-form-item>

  </el-form>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'

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
 
  nombre: '',
  

})

const datosFormulario = () => {

  formulario.codigo = propiedad.dataValue[0].codigo;
  formulario.nombre = propiedad.dataValue[0].nombre;

}

const rulesForm = reactive({
  codigo: [

    { required: true,
      message: 'Por favor ingrese la raza de la mascota', 
      trigger: 'blur' 
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