<template>

    <LayoutMain>
    <template #slotLayout>
      <Header 
      :titulo="'Raza'"
      :tituloBoton="'Crear Raza'"
      :abrir="abrirFormulario"
      />
      

      <Formulario :titulo="'Gestion Raza'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"  >
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <formRaza  
            v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"  
          />
        </el-col>
      </el-row>
        </template>

      </Formulario>      

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="nombre" label="Nombre" width="180"/>
            <el-table-column prop="actualizar" label="Actualizar" width="180">

              
              <template #default>
                <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario">                  
                </el-button>
                <el-button link type="danger" :icon="Delete" ></el-button>
              </template>
            </el-table-column>
          </el-table>
         
    </template>


    </LayoutMain>
  </template>
    
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import  formRaza from './componentes/formRaza.vue';
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import  {Delete,Edit} from "@element-plus/icons-vue"

  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)

  const abrirFormulario =()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  }

  const editarFormulario= async()=>{
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }

  const tableData = [
  {
    codigo: '+57',
    nombre: 'Siamés'
  }
]
  </script>