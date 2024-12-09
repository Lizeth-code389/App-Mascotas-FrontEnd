<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Mascotas'" :tituloBoton="'Crear Mascota  +'" :abrir="abrirFormulario" />


            <Formulario :titulo="'Mascotas'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormMascotas v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :departamento="departamento" :dataValue="dataMascotasById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="mascotas" stripe style="width: 100%">
              <el-table-column prop="nombre" label="nombre" />
              <el-table-column prop="edad" label="edad" />
              <el-table-column prop="sexo" label="sexo" />
              <el-table-column prop="id_raza" label="raza" />
              <el-table-column prop="peso" label="peso" />
              <el-table-column prop="esterilizado" label="esterilizado" />
              <el-table-column prop="id_departamento" label="departamento" />
              <el-table-column prop="descripcion" label="descripcion" />
              
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarMascota(registro.row.id)"></el-button>
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
import FormMascotas from './componentes/formMascotas.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataMascotasById = ref()

const mascotas = ref([])
const departamento = ref([])
const raza = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataMascotasById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {

  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearMascota()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarMascota()
  }
}

const crearMascota = async () => {

  const url = 'http://127.0.0.1:8000/api/Mascota/save'

  const dataFormulario = {
      nombre: formRef.value.formulario.nombre,
      edad: formRef.value.formulario.edad,
      sexo: formRef.value.formulario.sexo,
      id_raza: formRef.value.formulario.idRaza,
      peso: formRef.value.formulario.peso,
      esterilizado: formRef.value.formulario.esterilizado,
      descripcion: formRef.value.formulario.descripcion,
      id_departamento: formRef.value.formulario.idDepartamento,
      
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'La mascota se creo con exito    .',
                  type: 'success',
              })
              datosMascota()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error al crear la mascota ', error)
  }
}

const actualizarMascota = async () => {

  const url = 'http://127.0.0.1:8000/api/Mascota/update'

  const dataFormulario = {
      id:dataMascotasById.value[0].id,
      nombre: formRef.value.formulario.nombre,
      edad: formRef.value.formulario.edad,
      sexo: formRef.value.formulario.sexo,
      id_raza: formRef.value.formulario.raza,
      peso: formRef.value.formulario.peso,
      esterilizado: formRef.value.formulario.esterilizado,
      descripcion: formRef.value.formulario.descripcion,
      id_departamento: formRef.value.formulario.departamento,
      
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'La mascota se actualizo con exito    .',
                  type: 'success',
              })
              datosMascota()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error al crear la mascota ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Mascota/datos?id=1'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.result

  } catch (error) {
      console.error('error al crear  la mascota ', error)
  }

}
const eliminarMascota = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Mascota/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar la mascota? ',
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
                      datosMascota()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error al crear la mascota ', error)
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
const datosMascota = async () => {

  const url = 'http://127.0.0.1:8000/api/Mascota/datos'

  try {
      axios.get(url)
          .then(function (response) {
              mascotas.value = response.data.result
             

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear al crear mascota ', error)
  }


}

const getDepartamento = async () => {

const url = 'http://127.0.0.1:8000/api/Departamento/datos'

try {
    axios.get(url)
        .then(function (response) {
          departamento.value = response.data.result
           

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al crear departamento ', error)
}




}

const getRaza = async () => {

const url = 'http://127.0.0.1:8000/api/Raza/datos'

try {
    axios.get(url)
        .then(function (response) {
          raza.value = response.data.result
          

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al crear raza ', error)
}




}



onMounted(() => {
  getDepartamento()
  getRaza()
  datosMascota()
})

</script>