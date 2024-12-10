<template>

<LayoutMain>
    <template #slotLayout>
      <Header 
      :titulo="'Vacunas'"
      :tituloBoton="'Crear Vacuna'"
      :abrir="abrirFormulario"
      />
      
      <Formulario :titulo="'Gestion de Vacunas'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos" >
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <formVacunas  
          v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
          :vacunas="vacunas" :dataValue="dataVacunasById"/>
        </el-col>
      </el-row>
        </template>

      </Formulario>      

      <el-table :data="vacunas" stripe style="width: 100%">
                <el-table-column prop="codigo" label="Codigo" />
                <el-table-column prop="nombre" label="Nombre" />
                <el-table-column prop="descripcion_vacuna" label="Descripcion_vacuna" />
                <el-table-column fixed="right" label="Actualizar" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="Edit"
                            @click="editarFormulario(registro.row.id)">
                        </el-button>
                        <el-button link type="danger" :icon="Delete"
                            @click="eliminarVacuna(registro.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
         
    </template>


    </LayoutMain>
  </template>
    
  
  <script lang="ts" setup>
  import { onMounted, reactive, ref, watch } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import  formVacunas from './componentes/formVacunas.vue'
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import  {Delete,Edit} from "@element-plus/icons-vue"
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios';

  
const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataVacunasById = ref()
const vacunas = ref([])


const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
}

const editarFormulario = async (id) => {
    dataVacunasById.value = await datosById(id)
    mostrarFormulario.value = true
    editandoFormulario.value = true
}

const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearVacunas()
    }
}

const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarVacunas()
    }
}

const crearVacunas = async () => {

    const url = 'http://127.0.0.1:8000/api/Vacuna/save'

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
                    message: 'La vacuna se creo con exito    .',
                    type: 'success',
                })
                datosVacunas()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error al crear vacuna ', error)
    }
}

const actualizarVacunas = async () => {
 
    const url = 'http://127.0.0.1:8000/api/Vacuna/update'

    const dataFormulario = {
        id:dataVacunasById.value[0].id,
      
        codigo: formRef.value.formulario.codigo,
        nombre: formRef.value.formulario.nombre
       
    }
    try {
        axios.put(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'Fue  actualizo exitosamente    .',
                    type: 'success',
                })
                datosVacunas()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error al crear vacuna ', error)
    }

}

const datosById = async (id) => {

    const url = 'http://127.0.0.1:8000/api/Vacuna/datos?id=1'

    try {
        const response = axios.get(url, {
            params: {
                id: id
            }
        })
        return (await response).data.result

    } catch (error) {
        console.error('error al crear vacuna ', error)
    }

}
const eliminarVacunas = async (id) => {

    const url = 'http://127.0.0.1:8000/api/Vacuna/delete'

    ElMessageBox.confirm(
        'Esta seguro de eliminar la vacuna ',
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
                        datosVacunas()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            } catch (error) {
                console.error('error al crear vacuna ', error)
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
const datosVacunas = async () => {

    const url = 'http://127.0.0.1:8000/api/Vacuna/datos'

    try {
        axios.get(url)
            .then(function (response) {
                vacunas.value = response.data.result
               // console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error al crear vacuna ', error)
    }


}


onMounted(() => {
    /*getPais()*/
    datosVacunas()
})

</script>