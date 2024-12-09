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
      <router-view />
    </q-page-container>

    <q-page-container>
    <q-page class="q-pa-md q-gutter-md" style="min-height: 100vh;">
      <!-- Encabezado -->
      <div class="header-container text-center" v-bind:style="{ animation: 'fadeIn 1.5s ease-in-out' }">
        <h1 class="title q-mt-lg">Pagina Principal</h1>
      </div>

      <!-- Sección de navegación de ciudades con tarjetas -->
      <div class="row q-mt-lg city-navigation">
        <!-- Tarjeta 1 -->
        <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://res.cloudinary.com/dte7upwcr/image/upload/v1662040212/blog/blog2/fidelizar-clientes/fidelizaci%C3%B3n_de_clientes.png" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Clientes</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'clientes' }" />
            </q-card-actions>
          </q-card>
        </div>

        <!-- Repita el mismo patrón para las demás tarjetas... -->


         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://www.elcolombiano.com/binrepository/843x562/0c0/0d0/none/11101/IWII/proveedores-empresarios_38710307_20211009175751.jpg" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Proveedores</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'provedores' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://image.freepik.com/free-vector/businessman-hand-holding-money-flat-icons-loan-paying-cash-back-concept-vector-money-cash-pay-giving-illustration_53562-5878.jpg" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Movimientos</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'movimientos' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://static.vecteezy.com/system/resources/previews/009/951/673/original/trucking-transportation-cartoon-illustration-with-cargo-delivery-services-or-cardboard-box-sent-to-the-consumer-in-flat-style-design-vector.jpg" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Articulos</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'articulos' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://www.ecommercenews.pe/wp-content/uploads/2017/07/tienda-online.png" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Categorías</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'categorias' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://img.freepik.com/vector-gratis/personajes-personas-su-ilustracion-redes-sociales_53876-58967.jpg?size=626&ext=jpg" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Usuarios</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'usuarios' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://pic.pikbest.com/01/05/35/48d888piCcfB.jpg!bebw700" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Compras</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'compras' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://img.freepik.com/vector-gratis/crecimiento-ventas-analitica-comercio-analisis-beneficios-analista-negocios-plan-marketing-marketologist-personaje-dibujos-animados-portapapeles-ilustracion-metafora-concepto-aislado-vector_335657-2756.jpg" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Ventas</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'ventas' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://img.freepik.com/vector-premium/ilustracion-diseno-perfecto-politica-devoluciones_362714-3573.jpg" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Devoluciones-entrada</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'devoluciones-entrada' }" />
            </q-card-actions>
          </q-card>
        </div>

         <!-- Tarjeta 1 -->
         <div class="col-12 col-sm-6 col-md-3 card-spacing">
          <q-card class="presentation-card">
            <q-img 
              src="https://img.freepik.com/vector-premium/concepto-devolucion-dinero-colorido-ilustrado_23-2148471623.jpg?w=2000" 
              alt="Hotel en Berna" 
              class="card-image" 
            />
            <q-card-section>
              <div class="card-title">Devoluciones-salida</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="custom-btn" label="Ver más" :to="{ name: 'devoluciones-salida' }" />
            </q-card-actions>
          </q-card>
        </div>

      </div>
    </q-page>
  </q-page-container>
  </q-layout>

  
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

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
  background-color: white; /* Color de fondo para que sea visible */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Añade una sombra elegante */
}
.main-content {
  margin-top: 56px; /* Ajusta según la altura de tu header */
}


*{
  padding: 0%;
}
#header-main {
  background-color: blue;
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
  color: blue;
}

/* Estilo de las tarjetas */
.presentation-card {
  width: 300px;
  margin: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: black;
  color: gold;
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
  border-color: gold; /* Cambia el color del borde al pasar el mouse */
}

.presentation-card:hover .card-image {
  transform: scale(1.1); /* Zoom más pronunciado en la imagen */
}

/* Estilo de los botones */
.custom-btn {
  background-color: black; 
  color: gold; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
  align-items: center;
}

.custom-btn:hover {
  background-color: gold; 
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
