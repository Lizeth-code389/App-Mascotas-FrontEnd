import { createRouter,createWebHistory} from "vue-router";
import ejemplo from "../views/ejemplo.vue";
import { defineComponent } from "vue";
import Ejemplo from "../views/ejemplo.vue";



const routes = [
    {
        path:'/car',
        name:'Cargos, ejemplo',
        Component:Ejemplo,

    }
]




const router=createRouter({
    history:createWebHistory(),
    routes,

})

export default router;