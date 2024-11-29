import { createRouter,createWebHistory} from "vue-router";
import { defineComponent } from "vue";
import Ejemplo from "../views/ejemplo.vue";
import Paises from '../views/paises/paises.vue';
import Cargos from '../views/cargos/Cargos.vue';
import Departamento from '../views/departamento/Departamento.vue';
import Mascotas from '../views/mascotas/Mascotas.vue';
import Vacunas from "../views/vacunas/Vacunas.vue";
import LayoutMain from "../components/LayoutMain.vue";
import Login from "../components/Login.vue";



const routes = [
    {
        path:'/',
        name:'home, ejemplo',
        component:LayoutMain,

    },


    {
        path:'/cargos',
        name:'Cargos',
        component: Cargos,
    },

    {   
        
        path:'/pais',
        name:'Paises',
        component: Paises,

    },

    {   
        
        path:'/departamento',
        name:'Departamento',
        component: Departamento,

    },

    {
        path:'/mascotas',
        name:'Mascotas',
        component: Mascotas,

    },

    {
        path:'/vacunas',
        name:'Vacunas',
        component: Vacunas,

    }

    /*{
            path:'/mascotas',
            name:'Mascotas',
            component: Mascotas,
    
    },*/



]




const router=createRouter({
    history:createWebHistory(),
    routes,

})

export default router;