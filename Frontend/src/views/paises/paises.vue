<template>
   
    <LayoutMain>
    <template #slotLayout>
      <Header 
      :titulo="'Paises'"
      :tituloBoton="'Crear Pais'"
      :abrir="abrirFormulario"
      />
      
      <Formulario :titulo="'Gestion de Paises'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"  >
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <formPaises   
          v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
          :pais="pais" :dataValue="dataPaisById"/>
        </el-col>
      </el-row>
        </template>

      </Formulario>      

      <el-table :data="pais" stripe style="width: 100%">
                <el-table-column prop="codigo" label="codigo" />
                <el-table-column prop="nombre" label="nombre" />
                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="Edit"
                            @click="editarFormulario(registro.row.id)">
                        </el-button>
                        <el-button link type="danger" :icon="Delete"
                            @click="eliminarPais(registro.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
         
    </template>


    </LayoutMain>
  </template>
    
  
  <script lang="ts" setup>
  import { onMounted, reactive, ref, watch } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import  formPaises from './components/formPaises.vue'
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import  {Delete,Edit} from "@element-plus/icons-vue"
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios';

  
const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataPaisById = ref()
const pais = ref([])


const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
}

const editarFormulario = async (id) => {
    dataPaisById.value = await datosById(id)
    mostrarFormulario.value = true
    editandoFormulario.value = true
}

const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearPais()
    }
}

const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarPais()
    }
}

const crearPais = async () => {

    const url = 'http://127.0.0.1:8000/api/pais/save'

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
                    message: 'El pais se creo con exito    .',
                    type: 'success',
                })
                datosPais()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error al crear pais ', error)
    }
}

const actualizarPais = async () => {
 
    const url = 'http://127.0.0.1:8000/api/pais/update'

    const dataFormulario = {
        id:dataPaisById.value[0].id,
      
        codigo: formRef.value.formulario.codigo,
        nombre: formRef.value.formulario.nombre
       
    }
    try {
        axios.put(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El pais fue  actualizo exitosamente    .',
                    type: 'success',
                })
                datosPais()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error al crear pais ', error)
    }

}

const datosById = async (id) => {

    const url = 'http://127.0.0.1:8000/api/pais/datos'

    try {
        const response = axios.get(url, {
            params: {
                id: id
            }
        })
        return (await response).data.result

    } catch (error) {
        console.error('error al crear pais ', error)
    }

}
const eliminarPais = async (id) => {

    const url = 'http://127.0.0.1:8000/api/pais/delete'

    ElMessageBox.confirm(
        'Esta seguro de eliminar el pais ',
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
                        datosPais()

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            } catch (error) {
                console.error('error al crear pais ', error)
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
const datosPais = async () => {

    const url = 'http://127.0.0.1:8000/api/pais/datos'

    try {
        axios.get(url)
            .then(function (response) {
                pais.value = response.data.result
               // console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error al crear pais ', error)
    }


}
const getAreas = async () => {

    const url = 'http://127.0.0.1:8000/api/pais/datos'

    try {
        axios.get(url)
            .then(function (response) {
                pais.value = response.data.result
               // console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }




}

onMounted(() => {
    /*getPais()*/
    datosPais()
})

</script>