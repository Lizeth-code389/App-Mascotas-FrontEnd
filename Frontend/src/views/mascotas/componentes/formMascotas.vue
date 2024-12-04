<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>
    <el-form-item label="Edad" prop="edad">
      <el-input v-model="formulario.edad" />
    </el-form-item>
  
    <el-form-item label="Sexo" prop="sexo">
      <el-input v-model="formulario.sexo" />
    </el-form-item>
  
    <el-form-item label="Peso" prop="peso">
      <el-input v-model="formulario.peso" />
    </el-form-item>
  
    <el-form-item label="Esterilizado" prop="esterilizado">
      <el-input v-model="formulario.esterilizado" />
    </el-form-item>
  
    <el-form-item label="Descripción" prop="descripción">
      <el-input v-model="formulario.descripcion" />
    </el-form-item>
    

  </el-form>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  mascotas: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  nombre: '',
  edad: '',
  sexo: '',
  peso: '',
  edad: '',
  esterilizado: '',
  descripcion: '',

})

const datosFormulario = () => {

  formulario.nombre = propiedad.dataValue[0].nombre;
  formulario.edad = propiedad.dataValue[0].edad;
  formulario.sexo = propiedad.dataValue[0].sexo;
  formulario.peso = propiedad.dataValue[0].peso;
  formulario.esterilizado = propiedad.dataValue[0].esterilizado;
  formulario.descripcion = propiedad.dataValue[0].descripcion;
  formulario.raza = propiedad.dataValue[0].id_raza;

}

const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre de la mascota', trigger: 'blur' }
  ],
  edad: [
    { 
      type: 'number',
      required: true,
      message: 'Ingrese la edad de la mascota',
      trigger: 'blur',
    },

  ],

  sexo: [
    {
      required: true,
      message: 'Ingrese el sexo de la mascota',
      trigger: 'blur',
    },
  ],

  peso: [
    {  
      type: 'number',
      required: true,
      message: 'Ingrese el peso',
      trigger: 'blur',
    },

  ],

  esterilizado: [
    {
      required: true,
      message: 'Se encuentra esterilizado',
      trigger: 'blur',
    },
  ],

  descripcion: [
    {
      required: true,
      message: 'Ingrese la descripcion de su mascota',
      trigger: 'blur',
    },
  ],

  /*area: [
    {
      required: false,
      message: 'Seleccione un valor',
      trigger: 'blur',
    },
  ],*/
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