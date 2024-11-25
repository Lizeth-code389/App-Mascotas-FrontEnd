import { createRouter,createWebHistory} from "vue-router";
import { defineComponent } from "vue";
import Ejemplo from "../views/ejemplo.vue";
import Paises from '../views/paises/paises.vue';
import Cargos from '../views/cargos/cargos.vue'
import LayoutMain from "../components/LayoutMain.vue";
import Login from "../components/Login.vue";



const routes = [
    {
        path:'/',
        name:'home, ejemplo',
        component:LayoutMain,

    },

    {
        path:'/Login',
        name:'Login, ejemplo',
        component:Login,

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

    }


]




const router=createRouter({
    history:createWebHistory(),
    routes,

})

export default router;