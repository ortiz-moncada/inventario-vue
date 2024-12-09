<template>
    <h1>Proveedores</h1>
    <div class="q-pa-md q-gutter-sm">
      <!-- Botón para agregar un nuevo artículo -->
      <q-btn
        color="primary"
        label="Agregar nuevo proveedor"
        no-caps
        @click="openModal"
      />
  
      <!-- Modal para agregar artículo -->
      <q-dialog v-model="modalAgregarProveedor" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Agregar Nuevo Proveedor</div>
            <q-input v-model="nuevoProveedor.nombre" label="Nombre" filled />
          <q-input v-model="nuevoProveedor.identificacion" label="Identidad" filled />
          <q-input v-model="nuevoProveedor.telefono" label="Telefono" filled />
          <q-input v-model="nuevoProveedor.email" label="Email" filled />
          </q-card-section>
  
          <q-card-actions align="around">
            <q-btn label="Cancelar" color="secondary" flat @click="cerrarFormulario" />
            <q-btn label="Guardar" color="blue" flat @click="postProveedor" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  
    <div class="q-pa-md">
      <q-table title="Artículos" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" style="text-align: center;">
            <q-btn @click="editarProveedor(props.row)">📝</q-btn>
            <q-btn v-if="props.row.estado === 'activo'" @click="cambiarEstado(props.row)">❌</q-btn>
            <q-btn v-if="props.row.estado === 'inactivo'" @click="cambiarEstado(props.row)">✅</q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  
    <!-- Modal para editar artículo -->
    <q-dialog v-model="modalEditarProveedor" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Proveedor</div>
          <q-input v-model="ProveedorEditado.nombre" label="Nombre" filled />
          <q-input v-model="ProveedorEditado.identificacion" label="Identidad" filled />
          <q-input v-model="ProveedorEditado.telefono" label="Telefono" filled />
          <q-input v-model="ProveedorEditado.email" label="Email" filled />
        </q-card-section>
  
        <q-card-actions align="around">
          <q-btn label="Cancelar" color="secondary" flat @click="cerrarModalEditar" />
          <q-btn label="Guardar" color="primary" flat @click="guardarEdicion" />
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
  </template>
  
  <script setup>
  import { onBeforeMount, ref } from 'vue';
  import { getData, postData, putData } from '../services/apiClient';
  
  let rows = ref([]);
  let columns = ref([]);
  
  // Modales para agregar, editar, y confirmar cambio de estado
  const modalAgregarProveedor = ref(false);
  const modalEditarProveedor = ref(false);
  const modalConfirmarEstado = ref(false);
  
  // Artículos
  const nuevoProveedor = ref({
    nombre:'',
    identificacion:'',
    email:'',
    telefono:'',
    estado: 'activo', // Estado inicial
  });
  
  const ProveedorEditado = ref({
    nombre:'',
    identificacion:'',
    email:'',
    telefono:'',
  });
  
  const ProveedorSeleccionado = ref(null); // Artículo para confirmar cambio de estado
  
  // Configuración de columnas de la tabla
  columns.value = [
  { field: 'nombre', label: 'Nombre', name: 'nombre', align: 'center' },
  { field: 'identificacion', label: 'Identificacion', name: 'identificacion', align: 'center' },
  { field: 'telefono', label: 'Telefono', name: 'telefono', align: 'center' },
  { field: 'email', label: 'Email', name: 'email', align: 'center' },
  { field: 'opciones', label: 'Opciones', name: 'opciones', align: 'center' }
  ];
  
  // Función para listar los artículos
  async function listarProveedor() {
    try {
      let res = await getData('/proveedores');
      rows.value = res;
    } catch (error) {
      console.log('Error al listar los artículos:', error);
    }
  }
  
  // Abrir modal de agregar artículo
  function openModal() {
    modalAgregarProveedor.value = true;
  }
  
  // Cerrar formulario de agregar artículo
  function cerrarFormulario() {
    modalAgregarProveedor.value = false;
    resetFormulario();
  }
  
  // Resetear formulario de agregar artículo
  function resetFormulario() {
    nuevoProveedor.value = {
      nombre:'',
    identificacion:'',
    email:'',
    telefono:'',
    estado: 'activo', // Estado inicial
    };
  }
  
  // Agregar un nuevo artículo
  async function postProveedor() {
    try {
      const response = await postData('/proveedores/PS', nuevoProveedor.value);
      console.log('proveedor creado con éxito:', response);
  
      modalAgregarProveedor.value = false; // Cerrar el modal
      await listarProveedor(); // Actualizar la tabla de artículos
      resetFormulario(); // Limpiar el formulario
    } catch (error) {
      console.log('Error al crear el Proveedor:', error.response ? error.response.data : error);
    }
  }
  
  // Abrir modal de edición de artículo
  function editarProveedor(provedor) {
    ProveedorEditado.value = { ...provedor }; // Copiar datos del artículo a editar
    modalEditarProveedor.value = true;
  }
  
  // Cerrar modal de edición de artículo
  function cerrarModalEditar() {
    modalEditarProveedor.value = false;
    ProveedorEditado.value = {
      nombre:'',
    identificacion:'',
    email:'',
    telefono:'',
    };
  }
  
  // Guardar cambios en el artículo editado
  async function guardarEdicion() {
    if (!ProveedorEditado.value._id) return;
  
    try {
      const response = await putData(`/proveedor/modificar/${ProveedorEditado.value._id}`, {
        nombre: ProveedorEditado.value.nombre,
        identificacion: ProveedorEditado.value.identificacion,
        email: ProveedorEditado.value.email,
        telefono: ProveedorEditado.value.telefono
      });
      console.log('Proveedor actualizado con éxito:', response);
  
      const index = rows.value.findIndex((item) => item._id === ProveedorEditado.value._id);
      if (index !== -1) {
        rows.value[index] = { ...ProveedorEditado.value };
      }
  
      modalEditarProveedor.value = false; // Cerrar el modal
    } catch (error) {
      console.log('Error al actualizar el proveedor:', error.response ? error.response.data : error);
    }
  }
  
  // Cambiar estado de un artículo
  function cambiarEstado(proveedor) {
    ProveedorSeleccionado.value = proveedor;
    modalConfirmarEstado.value = true; // Mostrar modal de confirmación
  }
  
  // Confirmar cambio de estado
  async function confirmarCambioEstado() {
    if (!ProveedorSeleccionado.value) return;
  
    const proveedor = ProveedorSeleccionado.value;
    let ruta;
    if (proveedor.estado === 'activo') {
      // Si la categoría está activa, desactivarla
      ruta = `/provedor/${proveedor._id}/inactivar`;
      articulo.estado = 'inactivo';
    } else {
      // Si la categoría está inactiva, activarla
      ruta = `/articulos/${proveedor._id}/activar`;
      proveedor.estado = 'activo';
    }
  
    try {
      const response = await putData(ruta);
      console.log('Estado actualizado con éxito:', response);
  
      const index = rows.value.findIndex((item) => item._id === proveedor._id);
      if (index !== -1) {
        rows.value[index].estado = proveedor.estado;
      }
  
      modalConfirmarEstado.value = false;
    } catch (error) {
      console.log('Error al actualizar el estado:', error.response ? error.response.data : error);
    }
  }
  
  onBeforeMount(() => {
    listarProveedor();
  });
  </script>
  