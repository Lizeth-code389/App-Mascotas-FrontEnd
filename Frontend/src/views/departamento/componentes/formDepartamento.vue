<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Codigo" prop="codigo">
      <el-input v-model="formulario.codigo" />
    </el-form-item>
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>
    

  </el-form>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  departamento: {
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
  formulario.pais = propiedad.dataValue[0].id_pais;

}

const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre del departamento', trigger: 'blur' }
  ],
  codigo: [
    {  
      type: 'number',
      required: true,
      message: 'Ingrese el codigo del departamento',
      trigger: 'blur',
    },


  ],
  area: [
    {
      required: false,
      message: 'Seleccione un valor',
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