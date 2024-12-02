<template>
   <!-- para ver los cambios -->
  <h1>Categorías</h1>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      v-for="filter in backdropFilterList"
      :key="filter.label"
      color="primary"
      :label="'Agregar nueva categoría'"
      no-caps
      @click="openModal(filter)"
    />

    <!-- Modal para agregar categoría -->
    <q-dialog v-model="modalAgregarCategoria" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Agregar Nueva Categoria</div>
          <q-input v-model="nuevaCategoria.descripcion" label="Descripción" filled />
        </q-card-section>
 
        <q-card-actions>
          <q-btn label="Cancelar" color="secondary" flat @click="cerrarFormulario" />
          <q-btn label="Guardar" color="blue" flat @click="postCategoria" /> 
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
    <q-table title="Categorías" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" style="text-align: center;">
          <q-btn @click="editarCategoria(props.row)">
    📝
  </q-btn>

  <!-- Modal para editar categoría -->
  <q-dialog v-model="modalEditarCategoria" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Editar Categoría</div>
        <q-input v-model="categoriaEditada.descripcion" label="Descripción" filled />
        <!-- Puedes agregar otros campos que necesites para editar -->
      </q-card-section>

      <q-card-actions>
        <q-btn label="Cancelar" color="secondary" flat @click="cerrarModalEditar" />
        <q-btn label="Guardar" color="primary" flat @click="guardarEdicion" />
      </q-card-actions>
    </q-card>
  </q-dialog>

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
import { getData, postData, putData } from '../services/apiClient';

// Definición de las filas y columnas de la tabla
let rows = ref([]);
let columns = ref([]);


const modalAgregarCategoria = ref(false); // Modal de agregar categoría
const nuevaCategoria = ref({
  nombre: '',
  descripcion: '',
  estado: 'activo', // Establecer el estado inicial
});

const modalEditarCategoria = ref(false);  // Modal de edición
const categoriaEditada = ref({
  _id: '',
  descripcion: '',
  // otros campos que puedas necesitar
});

const modalConfirmarEstado = ref(false); // Modal de confirmación de estado
const categoriaSeleccionada = ref(null); // Categoria seleccionada para cambiar estado

const backdropFilter = ref(null);
const backdropFilterList = ['blur(4px)'];

// Abrir el modal de agregar categoría
function openModal(filter) {
  backdropFilter.value = filter;
  modalAgregarCategoria.value = true;
}

// Cerrar el formulario y resetear los datos
function cerrarFormulario() {
  modalAgregarCategoria.value = false;
  resetFormulario();
}

// Resetear el formulario
function resetFormulario() {
  nuevaCategoria.value.descripcion = '';
  nuevaCategoria.value.estado = 'activo'; // Resetear estado
}

// Función para listar categorías
async function listarCategorias() {
  let res = await getData('/categorias');
  console.log(res);
  rows.value = res.categoria;
}

// Cargar las categorías al montar el componente
onBeforeMount(() => {
  listarCategorias();
});

// Definir las columnas de la tabla
columns.value = [
  { field: 'descripcion', label: 'Descripcion', name: 'descripcion', align: 'center' },
  { field: 'estado', label: 'Estado', name: 'estado', align: 'center' },
  { field: 'opciones', label: 'Opciones', name: 'opciones', align: 'center' },
];

// Función para agregar una nueva categoría
const postCategoria = async () => {
  try {
    const response = await postData('/categorias', nuevaCategoria.value);
    console.log('Categoria creada con éxito', response);
    modalAgregarCategoria.value = false; // Cerrar el modal
    await listarCategorias(); // Volver a cargar las categorías
    resetFormulario(); // Resetear el formulario
  } catch (error) {
    console.log('Error al crear la categoria:', error.response ? error.response.data : error);
  }
};

// Función para cambiar el estado de la categoría
function cambiarEstado(categoria) {
  categoriaSeleccionada.value = categoria;
  modalConfirmarEstado.value = true; 
}

// Función para confirmar el cambio de estado
const confirmarCambioEstado = async () => {
  if (!categoriaSeleccionada.value) return;

  // Obtener la categoría seleccionada
  const categoria = categoriaSeleccionada.value;

  // Determinar la ruta y el estado según el estado actual
  let ruta;
  if (categoria.estado === 'activo') {
    // Si la categoría está activa, desactivarla
    ruta = `/categorias/${categoria._id}/anulados`;
    categoria.estado = 'inactivo';
  } else {
    // Si la categoría está inactiva, activarla
    ruta = `/categorias/${categoria._id}/activar`;
    categoria.estado = 'activo';
  }

  try {
    // Realizar la solicitud PUT a la ruta correspondiente
    const response = await putData(ruta);

    console.log('Estado actualizado con éxito:', response);
    
    // Actualizar el estado localmente en la lista de categorías sin recargar desde la API
    const index = rows.value.findIndex((item) => item._id === categoria._id);
    if (index !== -1) {
      rows.value[index].estado = categoria.estado; // Actualizar solo la categoría modificada
    }
    
    modalConfirmarEstado.value = false;  // Cerrar el modal de confirmación
  } catch (error) {
    console.log('Error al actualizar el estado:', error.response ? error.response.data : error);
  }
};

//funcion editar

function editarCategoria(categoria) {
  categoriaEditada.value = { ...categoria };  
  modalEditarCategoria.value = true;  
}

// Función para cerrar el modal de edición
function cerrarModalEditar() {
  modalEditarCategoria.value = false;
  categoriaEditada.value = {};  
}

// Función para guardar la edición
const guardarEdicion = async () => {
  if (!categoriaEditada.value._id) return;

  try {
    const response = await putData(`/categorias/modificar/${categoriaEditada.value._id}`, {descripcion:categoriaEditada.value.descripcion});
    console.log('Categoría actualizada con éxito:', response);

    const index = rows.value.findIndex(item => item._id === categoriaEditada.value._id);
    if (index !== -1) {
      rows.value[index] = { ...categoriaEditada.value };  
    }

    modalEditarCategoria.value = false;  
  } catch (error) {
    console.log(error);
    
    console.log('Error al actualizar la categoría:', error.response ? error.response.data : error);
  }
};

</script>

<style>
h1 {
  color: #1E90FF; 
  font-size: 3rem; 
  font-weight: bold; 
  text-align: center; 
  letter-spacing: 2px; 
  text-transform: uppercase; 
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  margin: 20px 0; 
}
.q-btn {
  color: inherit; /* Asegúrate de que el texto sea visible */
  font-weight: bold; /* Para hacerlo más visible */
}
</style>