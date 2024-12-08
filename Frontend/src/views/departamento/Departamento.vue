<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Departamento'" :tituloBoton="'Crear Departamento  +'" :abrir="abrirFormulario" />


            <Formulario :titulo="'Gestión Departamentos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormDepartamento v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :paises="paises" :dataValue="dataDepartamentoById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="departamento" stripe style="width: 100%">
              <el-table-column prop="codigo" label="codigo" />
              <el-table-column prop="nombre" label="nombre" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminardepartamento(registro.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>

      </template>


  </LayoutMain>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import FormDepartamento from './componentes/formDepartamento.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataDepartamentoById = ref()

const departamento = ref([])
const paises = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataDepartamentoById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await creardepartamento()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarDepartamento()
  }
}

const creardepartamento = async () => {0

  const url = 'http://127.0.0.1:8000/api/Departamento/save'

  const dataFormulario = {
      codigo: formRef.value.formulario.codigo,
      nombre: formRef.value.formulario.nombre,
      id_pais: formRef.value.formulario.idPais
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El departamento se creo con exito    .',
                  type: 'success',
              })
              datosDepartamento()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear departamento ', error)
  }
}

const actualizarDepartamento = async () => {

  const url = 'http://127.0.0.1:8000/api/Departamento/update'

  const dataFormulario = {
      id:dataDepartamentoById.value[0].id,
      codigo: formRef.value.formulario.codigo,
      nombre: formRef.value.formulario.nombre,
      id_pais: formRef.value.formulario.pais
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El departamento se actualizo con exito    .',
                  type: 'success',
              })
              datosDepartamento()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear departamento ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Departamento/datos?id=1'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.result

  } catch (error) {
      console.error('error al crear departamento ', error)
  }

}
const eliminardepartamento = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Departamento/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el departamento ',
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
                      datosDepartamento()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error al crear departamento ', error)
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
const datosDepartamento = async () => {

  const url = 'http://127.0.0.1:8000/api/Departamento/datos'

  try {
      axios.get(url)
          .then(function (response) {
             departamento.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error al crear departamento ', error)
  }


}


const getPais = async () => {

  const url = 'http://127.0.0.1:8000/api/pais/datos'

  try {
      axios.get(url)
          .then(function (response) {
            paises.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error al crear departamento ', error)
  }




}

onMounted(() => {
  getPais()
  datosDepartamento()
})

</script>