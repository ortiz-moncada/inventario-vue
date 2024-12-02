<template>
  <h1>Artículos</h1>
  <div class="q-pa-md q-gutter-sm">
    <!-- Botón para agregar un nuevo artículo -->
    <q-btn
      color="primary"
      label="Agregar nuevo artículo"
      no-caps
      @click="openModal"
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

        <q-card-actions align="around">
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
          <q-btn v-if="props.row.estado === 'inactivo'" @click="cambiarEstado(props.row)">✅</q-btn>
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
const modalAgregarArticulo = ref(false);
const modalEditarArticulo = ref(false);
const modalConfirmarEstado = ref(false);

// Artículos
const nuevoArticulo = ref({
  nombre: '',
  precio: 0,
  stock: 0,
  categoria: '',
  estado: 'activo', // Estado inicial
});

const articuloEditado = ref({
  _id: '',
  nombre: '',
  precio: 0,
  stock: 0,
  categoria: '',
});

const articuloSeleccionado = ref(null); // Artículo para confirmar cambio de estado

// Configuración de columnas de la tabla
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
    rows.value = res;
  } catch (error) {
    console.log('Error al listar los artículos:', error);
  }
}

// Abrir modal de agregar artículo
function openModal() {
  modalAgregarArticulo.value = true;
}

// Cerrar formulario de agregar artículo
function cerrarFormulario() {
  modalAgregarArticulo.value = false;
  resetFormulario();
}

// Resetear formulario de agregar artículo
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
    const response = await postData('/articulos/registrar', nuevoArticulo.value);
    console.log('Artículo creado con éxito:', response);

    modalAgregarArticulo.value = false; // Cerrar el modal
    await listarArticulos(); // Actualizar la tabla de artículos
    resetFormulario(); // Limpiar el formulario
  } catch (error) {
    console.log('Error al crear el artículo:', error.response ? error.response.data : error);
  }
}

// Abrir modal de edición de artículo
function editarArticulo(articulo) {
  articuloEditado.value = { ...articulo }; // Copiar datos del artículo a editar
  modalEditarArticulo.value = true;
}

// Cerrar modal de edición de artículo
function cerrarModalEditar() {
  modalEditarArticulo.value = false;
  articuloEditado.value = {
    _id: '',
    nombre: '',
    precio: 0,
    stock: 0,
    categoria: '',
  };
}

// Guardar cambios en el artículo editado
async function guardarEdicion() {
  if (!articuloEditado.value._id) return;

  try {
    const response = await putData(`/articulos/${articuloEditado.value._id}`, {
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

    modalEditarArticulo.value = false; // Cerrar el modal
  } catch (error) {
    console.log('Error al actualizar el artículo:', error.response ? error.response.data : error);
  }
}

// Cambiar estado de un artículo
function cambiarEstado(articulo) {
  articuloSeleccionado.value = articulo;
  modalConfirmarEstado.value = true; // Mostrar modal de confirmación
}

// Confirmar cambio de estado
async function confirmarCambioEstado() {
  if (!articuloSeleccionado.value) return;

  const articulo = articuloSeleccionado.value;
  let ruta;
  if (articulo.estado === 'activo') {
    // Si la categoría está activa, desactivarla
    ruta = `/articulos/${articulo._id}/inactivar`;
    articulo.estado = 'inactivo';
  } else {
    // Si la categoría está inactiva, activarla
    ruta = `/articulos/${articulo._id}/activar`;
    articulo.estado = 'activo';
  }

  try {
    const response = await putData(ruta);
    console.log('Estado actualizado con éxito:', response);

    const index = rows.value.findIndex((item) => item._id === articulo._id);
    if (index !== -1) {
      rows.value[index].estado = articulo.estado;
    }

    modalConfirmarEstado.value = false;
  } catch (error) {
    console.log('Error al actualizar el estado:', error.response ? error.response.data : error);
  }
}

onBeforeMount(() => {
  listarArticulos();
});
</script>
