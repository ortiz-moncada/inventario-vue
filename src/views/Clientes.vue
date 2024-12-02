<template>
  <h1>Clientes</h1>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      v-for="filter in backdropFilterList"
      :key="filter.label"
      color="primary"
      :label="filter.label"
      no-caps
      @click="openModal(filter)"
    />

    <!-- Modal para agregar categoría -->
    <q-dialog v-model="modalAgregarCliente" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Agregar Nuevos Clientes</div>
          <q-input v-model="nuevaCliente.nombre" label="Nombre" filled />
          <q-input v-model="nuevaCliente.identificacion" label="Identidad" filled />
          <q-input v-model="nuevaCliente.telefono" label="Telefono" filled />
          <q-input v-model="nuevaCliente.email" label="Email" filled />
        </q-card-section>

        <q-card-actions>
          <q-btn label="Cancelar" color="secondary" flat @click="cerrarFormulario" />
          <q-btn label="Guardar" color="primary" flat @click="postClientes" />
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
    <q-table title="Clientes" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" style="text-align: center;">
          <q-btn @click="cambiarEstado(props.row)">
            📝
          </q-btn>

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

const modalAgregarCliente = ref(false); // Modal de agregar categoría
const nuevaCliente = ref({
    nombre:'',
    identificacion:'',
    email:'',
    telefono:'',
    estado: 'activo', // Establecer el estado inicial
});

const modalConfirmarEstado = ref(false); // Modal de confirmación de estado
const clienteSeleccionado = ref(null); // Categoria seleccionada para cambiar estado

const backdropFilter = ref(null);
const backdropFilterList = ['blur(4px)'];

// Abrir el modal de agregar categoría
function openModal(filter) {
  backdropFilter.value = filter;
  modalAgregarCliente.value = true;
}

// Cerrar el formulario y resetear los datos
function cerrarFormulario() {
  modalAgregarCliente.value = false;
  resetFormulario();
}

// Resetear el formulario
function resetFormulario() {
  nuevaCliente.value.nombre = '';
  nuevaCliente.value.identificacion = '';
  nuevaCliente.value.email = '';
  nuevaCliente.value.telefono = '';
  nuevaCliente.value.estado = 'activo'; // Resetear estado
}

// Función para listar categorías
async function listarClientes() {
  try {
    console.log('Intentando obtener clientes desde la API...');
    const response = await getData('/clientes');
    console.log('Datos recibidos del servidor:', response);

    if (Array.isArray(response)) {
      rows.value = response; // Asignar datos al estado de la tabla
      console.log('Clientes asignados a rows:', rows.value);
    } else {
      console.error('La respuesta no es un arreglo:', response);
    }
  } catch (error) {
    console.error('Error al listar clientes:', error.response ? error.response.data : error.message);
  }
}



// Cargar las categorías al montar el componente
onBeforeMount(() => {
  listarClientes();
});

// Definir las columnas de la tabla
columns.value = [
  { field: 'nombre', label: 'Nombre', name: 'nombre', align: 'center' },
  { field: 'identificacion', label: 'Identificacion', name: 'identificacion', align: 'center' },
  { field: 'telefono', label: 'Telefono', name: 'telefono', align: 'center' },
  { field: 'email', label: 'Email', name: 'email', align: 'center' },
  { field: 'opciones', label: 'Opciones', name: 'opciones', align: 'center' }
];


// Función para agregar una nueva categoría
const postClientes = async () => {
  try {
    const response = await postData('/clientes/', nuevaCliente.value);
    console.log('Cliente creado con exito', response);
    modalAgregarCliente.value = false; // Cerrar el modal
    await listarClientes(); // Volver a cargar las categorías
    resetFormulario(); // Resetear el formulario
  } catch (error) {
    console.log('Error al crear el cliente:', error.response ? error.response.data : error);
  }
};

// Función para cambiar el estado de la categoría
function cambiarEstado(clientes) {
  clienteSeleccionado.value = clientes; // Guardar la categoría seleccionada
  modalConfirmarEstado.value = true; // Mostrar el modal de confirmación
}

// Función para confirmar el cambio de estado
const confirmarCambioEstado = async () => {
  if (!clienteSeleccionado.value) return;

  // Cambiar el estado de la categoría
  const cliente = clienteSeleccionado.value;
  cliente.estado = cliente.estado === 'activo' ? 'inactivo' : 'activo';

  try {
    const response = await putData(`/cliente/${cliente._id}`, { estado: cliente.estado });
    console.log('Estado actualizado con éxito:', response);
    
    // Actualizar el estado localmente en la lista de categorías sin recargar desde la API
    const index = rows.value.findIndex((item) => item._id === cliente._id);
    if (index !== -1) {
      rows.value[index].estado = cliente.estado; // Actualizar solo la categoría modificada
    }
    
    modalConfirmarEstado.value = false;  // Cerrar el modal de confirmación
  } catch (error) {
    console.log('Error al actualizar el estado:', error.response ? error.response.data : error);
  }
};
</script>
