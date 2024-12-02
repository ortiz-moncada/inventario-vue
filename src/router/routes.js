import Articulos from '../views/Articulos.vue'
import Categorias from '../views/Categorias.vue'
import Movimientos from '../views/Movimientos.vue'
import provedores from '../views/provedores.vue'
import usuarios from '../views/usuarios.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Clientes from '../views/Clientes.vue'

const routes = [
    {
        path: '/',
        component: Login
    },
   {

    path:"/home",
    component: Home,
    children:[
        {
            path: '/articulos',
            component: Articulos
        },
        {
            path: '/categorias',
            component: Categorias
        },
        {
            path: '/movimientos',
            component: Movimientos
        },
        {
            path: '/clientes',
            component: Clientes
        },
        {
            path: '/proveedores',
            component: provedores
        },
        {
            path: '/usuarios',
            component: usuarios
        }
    ]
   },
   
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})