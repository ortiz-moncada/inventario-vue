import Articulos from '../views/Articulos.vue'
import Categorias from '../views/Categorias.vue'
import Movimientos from '../views/Movimientos.vue'
import Provedores from '../views/provedores.vue'
import Usuarios from '../views/usuarios.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Compras from '../views/Compras.vue'
import Ventas from '../views/Ventas.vue'

import Clientes from '../views/Clientes.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        children: [
            { path: '/articulos', component: Articulos, name: 'articulos' },
            { path: '/categorias', component: Categorias, name: 'categorias' },
            { path: '/movimientos', component: Movimientos, name: 'movimientos' },
            { path: '/clientes', component: Clientes, name: 'clientes' },
            { path: '/proveedores', component: Provedores, name: 'proveedores' },
            { path: '/usuarios', component: Usuarios, name: 'usuarios' },
            { path: '/compras', component: Compras, name: 'compras' },
            { path: '/ventas', component: Ventas, name: 'ventas' },
            { path: '/devoluciones-entrada', component: Ventas, name: 'devoluciones-entrada' },
            { path: '/devoluciones-salida', component: Ventas, name: 'devoluciones-salida' },
        ]
    }
    
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})