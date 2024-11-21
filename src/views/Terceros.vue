<template>
    <h1>Cliente</h1>
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        v-for="filter in backdropFilterList"
        :key="filter.label"
        color="primary"
        :label="filter.label"
        no-caps
        @click="openModal(filter)"
      />
  
      <!-- Modal para agregar tercero -->
      <q-dialog v-model="modalAgregarTerceros" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Agregar un Nuevo tercero</div>
            <q-input v-model="nuevaTerceros.nombre" label="Nombre" filled />
            <q-input v-model="nuevaTerceros.identificacion" label="Identificacion" filled />
            <q-input v-model="nuevaTerceros.tipo" label="Tipo" filled />
            <q-input v-model="nuevaTerceros.email" label="Email" filled />
            <q-input v-model="nuevaTerceros.direccion" label="Direccion" filled />
            <q-input v-model="nuevaTerceros.telefono" label="Telefono" filled />
          </q-card-section>
  
          <q-card-actions>
            <q-btn label="Cancelar" color="secondary" flat @click="cerrarFormulario" />
            <q-btn label="Guardar" color="primary" flat @click="postCategoria" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      <!-- Modal de Confirmación de Cambio de Estado -->
      <q-dialog v-model="modalConfirmarEstado" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">¿Confirmar cambio de estado?</div>
          </q-card-section>
  
          <q-card-actions>
            <q-btn label="Cancelar" color="secondary" flat @click="modalConfirmarEstado = false" />
            <q-btn label="Confirmar" color="primary" flat @click="confirmarCambioEstado" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  
    <div class="q-pa-md">
      <q-table title="Terceros" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" style="text-align: center;">
            <q-btn @click="cambiarEstado(props.row)">📝</q-btn>
            <!-- Botones con condición adecuada para cambiar estado -->
            <q-btn v-if="props.row.estado === 'activo'" @click="cambiarEstado(props.row)">❌</q-btn>
            <q-btn v-if="props.row.estado === 'inactivo'" @click="cambiarEstado(props.row)">✅</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>


</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import { postData, putData, getData } from '../services/apiClient';

let rows = ref([])
let columns = ref([])


const modalAgregarTerceros = ref(false); // Modal de agregar Tercero
  const nuevaTerceros = ref({ 
    nombre: '',
    identificacion: '',
    tipo: '',
    email: '',
    direccion: '',
    telefono: '',
    estado: 'activo', // Establecer el estado inicial
  });
  
  const modalConfirmarEstado = ref(false); // Modal de confirmación de estado
  const tercerosSeleccionada = ref(null); // Tercero seleccionada para cambiar estado
  
  const backdropFilter = ref(null);
  const backdropFilterList = ['blur(4px)'];
  
  // Abrir el modal de agregar tercero
  function openModal(filter) {
    backdropFilter.value = filter;
    modalAgregarTerceros.value = true;
  }
  
  // Cerrar el formulario y resetear los datos
  function cerrarFormulario() {
    modalAgregarTerceros.value = false;
    resetFormulario();
  }
  
  // Resetear el formulario
  function resetFormulario() {
    nuevaTerceros.value.nombre = '';
    nuevaTerceros.value.identificacion = '';
    nuevaTerceros.value.tipo = '';
    nuevaTerceros.value.email = '';
    nuevaTerceros.value.direccion = '';
    nuevaTerceros.value.telefono = '';
    nuevaTerceros.value.estado = 'activo'; // Resetear estado
  }
  
  // Función para listar categorías
  async function listarTerceros() {
    let res = await getData('/terceros');
    console.log(res);
    rows.value = res;
  }
  

onBeforeMount(() => {
    listarTerceros()
})

columns.value = [
    { field: "nombre", label: "Nombre", name: "nombre", align: "center" },
    { field: "identificacion", label: "Identificacion", name: "identificacion", align: "center" },
    { field: "tipo", label: "Tipo", name: "tipo", align: "center" },
    { field: "email", label: "Email", name: "email", align: "center" },
    { field: "direccion", label: "Dirrecion", name: "dirrecion", align: "center" },
    { field: "telefono", label: "Telefono", name: "telefono", align: "center" },
    { field: "estado", label: "Estado", name: "estado", align: "center" },
]
  // Función para agregar una nueva categoría
  const postTerceros = async () => {
    try {
      const response = await postData('/terceros', nuevaTerceros.value);
      console.log('terceros fue creado con éxito', response);
      modalAgregarTerceros.value = false; // Cerrar el modal
      await listarTerceros(); // Volver a cargar las categorías
      resetFormulario(); // Resetear el formulario
    } catch (error) {
      console.log('Error al crear el tercero:', error.response ? error.response.data : error);
    }
  };
  
  // Función para cambiar el estado de la categoría
  function cambiarEstado(terceros) {
    tercerosSeleccionada.value = terceros; // Guardar la categoría seleccionada
    modalConfirmarEstado.value = true; // Mostrar el modal de confirmación
  }
  
  // Función para confirmar el cambio de estado
  const confirmarCambioEstado = async () => {
    if (!tercerosSeleccionada.value) return;
  
    // Cambiar el estado de el tercero
    const terceros = tercerosSeleccionada.value;
    terceros.estado = terceros.estado === 'activo' ? 'inactivo' : 'activo';
  
    try {
      const response = await putData(`/terceros/${terceros._id}`, { estado: terceros.estado });
      console.log('Estado actualizado con éxito:', response);
      
      // Actualizar el estado localmente en la lista de categorías sin recargar desde la API
      const index = rows.value.findIndex((item) => item._id === terceros._id);
      if (index !== -1) {
        rows.value[index].estado = terceros.estado; // Actualizar solo la categoría modificada
      }
      
      modalConfirmarEstado.value = false;  // Cerrar el modal de confirmación
    } catch (error) {
      console.log('Error al actualizar el tercero:', error.response ? error.response.data : error);
    }
  };

//hola
</script>