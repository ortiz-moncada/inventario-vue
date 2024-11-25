<template>
    <h1>Artículos</h1>
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        v-for="filter in backdropFilterList"
        :key="filter.label"
        color="primary"
        :label="'Agregar nuevo artículo'"
        no-caps
        @click="openModal(filter)"
      />
  
      <!-- Modal para agregar artículo -->
      <q-dialog v-model="modalAgregarArticulo" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Agregar Nuevo Artículo</div>
            <q-input v-model="nuevoArticulo.nombre" label="Nombre" filled />
            <q-input v-model="nuevoArticulo.precio" label="Precio" type="number" filled />
            <q-input v-model="nuevoArticulo.stock" label="Stock" type="number" filled />
            <q-input v-model="nuevoArticulo.categoria" label="Categoría" filled />
          </q-card-section>
  
          <q-card-actions>
            <q-btn label="Cancelar" color="secondary" flat @click="cerrarFormulario" />
            <q-btn label="Guardar" color="blue" flat @click="postArticulo" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  
    <div class="q-pa-md">
      <q-table title="Artículos" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" style="text-align: center;">
            <q-btn @click="editarArticulo(props.row)">📝</q-btn>
            <q-btn v-if="props.row.estado === 'activo'" @click="cambiarEstado(props.row)">❌</q-btn>
            <q-btn v-else @click="cambiarEstado(props.row)">✅</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  
    <!-- Modal para editar artículo -->
    <q-dialog v-model="modalEditarArticulo" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Artículo</div>
          <q-input v-model="articuloEditado.nombre" label="Nombre" filled />
          <q-input v-model="articuloEditado.precio" label="Precio" type="number" filled />
          <q-input v-model="articuloEditado.stock" label="Stock" type="number" filled />
          <q-input v-model="articuloEditado.categoria" label="Categoría" filled />
        </q-card-section>
  
        <q-card-actions>
          <q-btn label="Cancelar" color="secondary" flat @click="cerrarModalEditar" />
          <q-btn label="Guardar" color="primary" flat @click="guardarEdicion" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { onBeforeMount, ref } from 'vue';
  import { getData, postData, putData } from '../services/apiClient';
  
  let rows = ref([]);
  let columns = ref([]);
  
  const modalAgregarArticulo = ref(false); // Modal de agregar artículo
  const nuevoArticulo = ref({
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: '',
    estado: 'activo', // Estado inicial
  });
  
  const modalEditarArticulo = ref(false); // Modal de edición
  const articuloEditado = ref({
    _id: '',
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
  });
  
  const backdropFilter = ref(null);
  const backdropFilterList = ['blur(4px)'];
  
  // Listar los artículos al montar el componente
  onBeforeMount(() => {
    listarArticulos();
  });
  
  columns.value = [
    { field: 'nombre', label: 'Nombre', name: 'nombre', align: 'center' },
    { field: 'precio', label: 'Precio', name: 'precio', align: 'center' },
    { field: 'categoria', label: 'Categoría', name: 'categoria', align: 'center' },
    { field: 'stock', label: 'Stock', name: 'stock', align: 'center' },
    { field: 'estado', label: 'Estado', name: 'estado', align: 'center' },
    { field: 'opciones', label: 'Opciones', name: 'opciones', align: 'center' },
  ];
  
  // Función para listar los artículos
  async function listarArticulos() {
    try {
      let res = await getData('/articulos/articulo');
      console.log(res);
      rows.value = res;
    } catch (error) {
      console.log('Error al listar los artículos:', error);
    }
  }
  
  // Abrir el modal de agregar artículo
  function openModal(filter) {
    backdropFilter.value = filter;
    modalAgregarArticulo.value = true;
  }
  
  // Cerrar el formulario y resetear los datos
  function cerrarFormulario() {
    modalAgregarArticulo.value = false;
    resetFormulario();
  }
  
  // Resetear el formulario
  function resetFormulario() {
    nuevoArticulo.value = {
      nombre: '',
      precio: 0,
      stock: 0,
      categoria: '',
      estado: 'activo',
    };
  }
  
  // Agregar un nuevo artículo
  async function postArticulo() {
    try {
      const response = await postData('/articulos', nuevoArticulo.value);
      console.log('Artículo creado con éxito', response);
  
      modalAgregarArticulo.value = false; // Cerrar el modal
      await listarArticulos(); // Recargar los artículos
      resetFormulario(); // Limpiar el formulario
    } catch (error) {
      console.log('Error al crear el artículo:', error.response ? error.response.data : error);
    }
  }
  
  // Función para editar un artículo
  function editarArticulo(articulo) {
    articuloEditado.value = { ...articulo };
    modalEditarArticulo.value = true;
  }
  
  // Cerrar el modal de edición
  function cerrarModalEditar() {
    modalEditarArticulo.value = false;
    articuloEditado.value = {};
  }
  
  // Guardar la edición del artículo
  async function guardarEdicion() {
    if (!articuloEditado.value._id) return;
  
    try {
      const response = await putData(`/articulos/modificar/${articuloEditado.value._id}`, {
        nombre: articuloEditado.value.nombre,
        precio: articuloEditado.value.precio,
        stock: articuloEditado.value.stock,
        categoria: articuloEditado.value.categoria,
      });
      console.log('Artículo actualizado con éxito:', response);
  
      const index = rows.value.findIndex((item) => item._id === articuloEditado.value._id);
      if (index !== -1) {
        rows.value[index] = { ...articuloEditado.value };
      }
  
      modalEditarArticulo.value = false;
    } catch (error) {
      console.log('Error al actualizar el artículo:', error.response ? error.response.data : error);
    }
  }
  
  // Cambiar el estado del artículo
  function cambiarEstado(articulo) {
    articulo.estado = articulo.estado === 'activo' ? 'inactivo' : 'activo';
    console.log(`Estado cambiado: ${articulo}`);
  }
  </script>
  