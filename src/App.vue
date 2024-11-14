<template>
  <q-layout view="hhh LpR fFf">

    <q-header id="header-main"   v-show="$route.name !== 'Login'">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-center" >
          
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <img src="https://cdn-icons-png.flaticon.com/128/10112/10112441.png" alt="">
      <q-list>

        <q-item clickable to="/movimientos">
          <q-item-section>
            <q-item-label>Movimientos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/articulos">
          <q-item-section>
            <q-item-label>Artículos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/categorias">
          <q-item-section>
            <q-item-label>Categorias</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/terceros">
          <q-item-section>
            <q-item-label>Terceros</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          
          <div class="text-footer">INVENTARIO - 2024 © Todos los derechos reservados  </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'


const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)


function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>

<style>
#header-main{
  background-color: rgb(2, 21, 38);
  color: white;
}

.logo{
  width: 50px;
}

.text-footer{
  font-size: 12px;
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
</style>

