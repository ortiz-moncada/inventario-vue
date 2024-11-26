<template>
    <q-layout view="hhh LpR fFf">
  
      <q-header id="header-main" v-show="$route.name !== 'Login'">
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
              <q-item-label class="text-blue q-ml-sm">Clientes</q-item-label> <!-- Color azul y margen a la izquierda -->
            </q-item-section>
          </q-item>
  
          <!-- Proveedores -->
          <q-item clickable to="/proveedores">
            <q-item-section avatar>
              <q-icon name="store" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue q-ml-sm">Proveedores</q-item-label> <!-- Color azul y margen a la izquierda -->
            </q-item-section>
          </q-item>
  
          <!-- Movimientos -->
          <q-item clickable to="/movimientos">
            <q-item-section avatar>
              <q-icon name="swap_horiz" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue q-ml-sm">Movimientos</q-item-label> <!-- Color azul y margen a la izquierda -->
            </q-item-section>
          </q-item>
  
          <!-- Artículos -->
          <q-item clickable to="/articulos">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue q-ml-sm">Artículos</q-item-label> <!-- Color azul y margen a la izquierda -->
            </q-item-section>
          </q-item>
  
          <!-- Categorías -->
          <q-item clickable to="/categorias">
            <q-item-section avatar>
              <q-icon name="category" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue q-ml-sm">Categorías</q-item-label> <!-- Color azul y margen a la izquierda -->
            </q-item-section>
          </q-item>
  
          <!-- Correo Electrónico -->
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="email" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue q-ml-sm">correo@example.com</q-item-label> <!-- Aquí va tu correo -->
            </q-item-section>
          </q-item>
  
        </q-list>
      </q-drawer>
  
      <q-page-container>
        <router-view />
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
    background-color: blue;
    color: white;
  }
  
  .logo {
    width: 50px;
  }
  
  img {
    width: 100px;
  }
  </style>
  