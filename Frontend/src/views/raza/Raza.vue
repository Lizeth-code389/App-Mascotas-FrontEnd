<template>
   
  <LayoutMain>
  <template #slotLayout>
    <Header 
    :titulo="'Raza'"
    :tituloBoton="'Crear Raza'"
    :abrir="abrirFormulario"
    />
    
    <Formulario :titulo="'Gestion de Raza'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos" >
      <template #slotForm>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <FormRaza  
        v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
        :raza="raza" :dataValue="dataRazaById"/>
      </el-col>
    </el-row>
      </template>

    </Formulario>      

    <el-table :data="raza" stripe style="width: 100%">
               <el-table-column prop="codigo" label="Codigo" />
              <el-table-column prop="nombre" label="Nombre" />
              <el-table-column fixed="right" label="Actualizar" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarRaza(registro.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
       
  </template>


  </LayoutMain>
</template>
  

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import  formRaza from './componentes/formRaza.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import  {Delete,Edit} from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';



const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataRazaById = ref()
const raza = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataRazaById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearRaza()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarRaza()
  }
}

const crearRaza = async () => {

  const url = 'http://127.0.0.1:8000/api/Raza/save'

  const dataFormulario = {
      
      codigo: formRef.value.formulario.codigo,
      nombre: formRef.value.formulario.nombre
      
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: ' Se creo con exito    .',
                  type: 'success',
              })
              datosRaza()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error al crear raza ', error)
  }
}

const actualizarRaza = async () => {

  const url = 'http://127.0.0.1:8000/api/Raza/update'

  const dataFormulario = {
      id:dataRazaById.value[0].id,
    
      
      nombre: formRef.value.formulario.nombre
     
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'Raza fue  actualizo exitosamente    .',
                  type: 'success',
              })
              datosRaza()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error al crear raza ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Raza/datos?id=1'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.result

  } catch (error) {
      console.error('error al crear raza ', error)
  }

}
const eliminarRaza = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Raza/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar raza? ',
      'Eliminar Registro',
      {
          confirmButtonText: 'SI',
          cancelButtonText: 'Cancelar',
          type: 'error',
      }
  )
      .then(() => {

          try {
              axios.delete(url, { data: { id } })
                  .then(function (response) {
                      datosRaza()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error al crear raza ', error)
          }
          ElMessage({
              type: 'success',
              message: 'Se elimino correctamente el registro',
          })
      })
      .catch(() => {
          ElMessage({
              type: 'info',
              message: 'Eliminacion cancelada',
          })
      })

}
const datosRaza = async () => {

  const url = 'http://127.0.0.1:8000/api/Raza/datos'

  try {
      axios.get(url)
          .then(function (response) {
              raza.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error al crear raza ', error)
  }


}


onMounted(() => {
  /*getPais()*/
  datosRaza()
})

</script>