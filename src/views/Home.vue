<template>
  <q-layout view="hhh LpR fFf">
    <q-header 
      id="header-main" 
      class="position-fixed"
      v-show="$route.name !== 'Login'"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">
          <!-- Título si es necesario -->
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
  
     <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <img src="https://img.freepik.com/iconos-gratis/carrito-compras_318-839174.jpg" alt="Logo" />
      <q-list>
        <!-- Página Principal -->
        <q-item clickable to="/home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Página Principal</q-item-label> <!-- Color azul y margen a la izquierda -->
          </q-item-section>
        </q-item>

        <!-- Clientes -->
        <q-item clickable to="/clientes">
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Clientes</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Proveedores -->
        <q-item clickable to="/proveedores">
          <q-item-section avatar>
            <q-icon name="store" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Proveedores</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Movimientos -->
        <q-item clickable to="/movimientos">
          <q-item-section avatar>
            <q-icon name="swap_horiz" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Movimientos</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Artículos -->
        <q-item clickable to="/articulos">
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Artículos</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Categorías -->
        <q-item clickable to="/categorias">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Categorías</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Usuarios (Nuevo) -->
        <q-item clickable to="/usuarios">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Usuarios</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Compras (Nuevo) -->
        <q-item clickable to="/compras">
          <q-item-section avatar>
            <q-icon name="credit_card" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Compras</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Ventas (Nuevo) -->
        <q-item clickable to="/ventas">
          <q-item-section avatar>
            <q-icon name="sell" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Ventas</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Devoluciones de Entrada (Nuevo) -->
        <q-item clickable to="/devoluciones-entrada">
          <q-item-section avatar>
            <q-icon name="undo" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Devoluciones de Entrada</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Devoluciones de Salida (Nuevo) -->
        <q-item clickable to="/devoluciones-salida">
          <q-item-section avatar>
            <q-icon name="arrow_back" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-blue q-ml-sm">Devoluciones de Salida</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>
  
    <q-page-container>
      <router-view v-slot="{ Component }">
        <div v-if="$route.path === '/home'" class="row q-mt-lg city-navigation">
          <!-- Tarjetas (same as before) -->
          <div v-for="card in dashboardCards" :key="card.title" class="col-12 col-sm-6 col-md-3 card-spacing">
            <q-card class="presentation-card">
              <q-img 
                :src="card.image" 
                :alt="card.title" 
                class="card-image" 
              />
              <q-card-section>
                <div class="card-title">{{ card.title }}</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn class="custom-btn" label="Ver más" :to="card.route" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <component v-else :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const dashboardCards = [
  {
    title: 'Clientes',
    route: { name: 'clientes' },
    image: 'https://res.cloudinary.com/dte7upwcr/image/upload/v1662040212/blog/blog2/fidelizar-clientes/fidelizaci%C3%B3n_de_clientes.png'
  },
  {
    title: 'Proveedores',
    route: { name: 'proveedores' },
    image: 'https://www.elcolombiano.com/binrepository/843x562/0c0/0d0/none/11101/IWII/proveedores-empresarios_38710307_20211009175751.jpg'
  },
  {
    title: 'Movimientos',
    route: { name: 'movimientos' },
    image: 'https://image.freepik.com/free-vector/businessman-hand-holding-money-flat-icons-loan-paying-cash-back-concept-vector-money-cash-pay-giving-illustration_53562-5878.jpg'
  },
  {
    title: 'Articulos',
    route: { name: 'articulos' },
    image: 'https://static.vecteezy.com/system/resources/previews/009/951/673/original/trucking-transportation-cartoon-illustration-with-cargo-delivery-services-or-cardboard-box-sent-to-the-consumer-in-flat-style-design-vector.jpg'
  },
  {
    title: 'Categorías',
    route: { name: 'categorias' },
    image: 'https://www.ecommercenews.pe/wp-content/uploads/2017/07/tienda-online.png'
  },
  {
    title: 'Usuarios',
    route: { name: 'usuarios' },
    image: 'https://img.freepik.com/vector-gratis/personajes-personas-su-ilustracion-redes-sociales_53876-58967.jpg?size=626&ext=jpg'
  },
  {
    title: 'Compras',
    route: { name: 'compras' },
    image: 'https://pic.pikbest.com/01/05/35/48d888piCcfB.jpg!bebw700'
  },
  {
    title: 'Ventas',
    route: { name: 'ventas' },
    image: 'https://img.freepik.com/vector-gratis/crecimiento-ventas-analitica-comercio-analisis-beneficios-analista-negocios-plan-marketing-marketologist-personaje-dibujos-animados-portapapeles-ilustracion-metafora-concepto-aislado-vector_335657-2756.jpg'
  },
  {
    title: 'Devoluciones-entrada',
    route: { name: 'devoluciones-entrada' },
    image: 'https://img.freepik.com/vector-premium/ilustracion-diseno-perfecto-politica-devoluciones_362714-3573.jpg'
  },
  {
    title: 'Devoluciones-salida',
    route: { name: 'devoluciones-salida' },
    image: 'https://img.freepik.com/vector-premium/concepto-devolucion-dinero-colorido-ilustrado_23-2148471623.jpg?w=2000'
  }
]

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
#header-main {
  top: 0; /* Asegura que esté pegado al borde superior */
  left: 0; /* Alinea el header con el borde izquierdo */
  width: 100%; /* Asegura que el header ocupe todo el ancho */
  z-index: 1000; /* Eleva el header por encima de otros elementos */
  background-color: blue; 
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); 
}
.main-content {
  margin-top: 56px; 
}


*{
  padding: 0%;
}
#header-main {
  background-color: red;
  color: white;
}

.logo {
  width: 50px;
}

img {
  width: 100px;
}

/* Encabezado */
.header-container {
  animation: fadeIn 1.5s ease-in-out;
}

.title {
  font-family: 'Georgia', serif;
  font-weight: bold;
  color: red;
}

/* Estilo de las tarjetas */
.presentation-card {
  width: 300px;
  margin: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: red;
  color: white;
  border: solid 2px black;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición para hover */
}

/* Imagen dentro de la tarjeta */
.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease; /* Efecto suave de zoom */
}

/* Título de la tarjeta */
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

/* Hover sobre la tarjeta */
.presentation-card:hover {
  transform: translateY(-10px); /* Eleva la tarjeta */
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5); /* Sombra más pronunciada */
  border-color: blue; /* Cambia el color del borde al pasar el mouse */
}

.presentation-card:hover .card-image {
  transform: scale(1.1); /* Zoom más pronunciado en la imagen */
}

/* Estilo de los botones */
.custom-btn {
  background-color: white; 
  color: black; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
  align-items: center;
}

.custom-btn:hover {
  background-color: orange; 
  color: black; 
  transform: scale(1.05); /* Aumenta ligeramente el tamaño del botón */
}

/* Animación de fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Espaciado de las tarjetas */
.card-spacing {
  display: flex;
  justify-content: center; /* Centra la tarjeta en su contenedor */
  align-items: center;
}

</style>
