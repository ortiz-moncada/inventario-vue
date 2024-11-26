import Articulos from '../views/Articulos.vue'
import Categorias from '../views/Categorias.vue'
import Movimientos from '../views/Movimientos.vue'
import Clientes from '../views/Clientes.vue'
import Login from '../views/Login.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
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
    }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})