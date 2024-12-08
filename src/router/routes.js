import Articulos from '../views/Articulos.vue'
import Categorias from '../views/Categorias.vue'
import Movimientos from '../views/Movimientos.vue'
import provedores from '../views/provedores.vue'
import usuarios from '../views/usuarios.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import compras from '../views/compras.vue'
import ventas from '../views/ventas.vue'
import devolucionesE from '../views/devoluciones-e.vue'
import devolucionesS from '../views/devoluciones-s.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Clientes from '../views/Clientes.vue'
import Provedores from '../views/provedores.vue'
import Usuarios from '../views/usuarios.vue'

const routes = [
    {
        path: '/',
        component: Login
    },

    { path: "/clientes1", component: Clientes, name: "clientes1" },
    { path: "/provedores", component: Provedores, name: "provedores" },
    { path: "/movimientos1", component: Movimientos, name: "movimientos1" },
    { path: "/articulos1", component: Articulos, name: "articulos1" },
    { path: "/categorias1", component: Categorias, name: "categorias1" },
    { path: "/usuarios1", component: Usuarios, name: "usuarios1" },
    { path: "/compras1", component: compras, name: "compras1" },
    { path: "/ventas1", component: ventas, name: "ventas1" },
    { path: "/devoluciones-entrada1", component: devolucionesE, name: "devoluciones-entrada1" },
    { path: "/devoluciones-salida1", component: devolucionesS, name: "devoluciones-salida1" },

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
        },
        {
            path: '/compras',
            component: compras
        },
        {
            path: '/ventas',
            component: ventas
        },
        {
            path: '/devoluciones-entrada',
            component: devolucionesE
        },
        {
            path: '/devoluciones-salida',
            component: devolucionesS
        },
    ]
    
   },
   
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})