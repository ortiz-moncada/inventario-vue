<template>
  <h1>Usuarios</h1>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      color="primary"
      label="Agregar nuevo Usuario"
      no-caps
      @click="openModal()"
    />

    <!-- Modal para agregar usuario -->
    <q-dialog v-model="modalAgregarUsuario" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Agregar Nuevo Usuario</div>
          <q-input v-model="nuevoUsuario.nombre" label="Nombre" filled />
          <q-input v-model="nuevoUsuario.email" label="Email" filled />
          <q-input v-model="nuevoUsuario.contraseña" label="Contraseña" type="password" filled />
          <q-input v-model="nuevoUsuario.rol" label="Rol" filled />
        </q-card-section>

        <q-card-actions>
          <q-btn label="Cancelar" color="secondary" flat @click="cerrarFormulario" />
          <q-btn label="Guardar" color="blue" flat @click="postUsuario" />
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
    <q-table title="Usuarios" :rows="rows" :columns="columns" row-key="_id">
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" style="text-align: center;">
          <q-btn icon="edit" color="primary" @click="editarUsuarios(props.row)" />
          <q-btn
            v-if="props.row.estado === 'activo'"
            icon="block"
            color="negative"
            @click="cambiarEstado(props.row)"
          />
          <q-btn
            v-if="props.row.estado === 'inactivo'"
            icon="check_circle"
            color="positive"
            @click="cambiarEstado(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <!-- Modal para editar usuario -->
  <q-dialog v-model="modalEditarUsuario" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Editar Usuario</div>
        <q-input v-model="UsuarioEditada.nombre" label="Nombre" filled />
        <q-input v-model="UsuarioEditada.email" label="Email" filled />
        <q-input v-model="UsuarioEditada.contraseña" label="Contraseña" type="password" filled />
        <q-input v-model="UsuarioEditada.rol" label="Rol" filled />
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

// Definición de las filas y columnas de la tabla
let rows = ref([]);
let columns = ref([
  { field: 'nombre', label: 'Nombre', align: 'center' },
  { field: 'email', label: 'Email', align: 'center' },
  { field: 'rol', label: 'Rol', align: 'center' },
  { field: 'estado', label: 'Estado', align: 'center' },
  { field: 'opciones', label: 'Opciones', align: 'center' },
]);

const modalAgregarUsuario = ref(false); // Modal de agregar usuario
const modalEditarUsuario = ref(false); // Modal de edición
const modalConfirmarEstado = ref(false); // Modal de confirmación de estado

const nuevoUsuario = ref({
  nombre: '',
  email: '',
  contraseña: '',
  rol: '',
  estado: 'activo',
});

const UsuarioEditada = ref({
  nombre: '',
  email: '',
  contraseña: '',
  rol: '',
});

const UsuarioSeleccionado = ref(null);

// Funciones del flujo
function openModal() {
  modalAgregarUsuario.value = true;
}

function cerrarFormulario() {
  modalAgregarUsuario.value = false;
  resetFormulario();
}

function resetFormulario() {
  nuevoUsuario.value = {
    nombre: '',
    email: '',
    contraseña: '',
    rol: '',
    estado: 'activo',
  };
}

function resetUsuarioEditado() {
  UsuarioEditada.value = {
    nombre: '',
    email: '',
    contraseña: '',
    rol: '',
  };
}

async function listarUsuarios() {
  const res = await getData('/usuarios/usuario');
  rows.value = res.usuario;
}

onBeforeMount(() => {
  listarUsuarios();
});

const postUsuario = async () => {
  if (!nuevoUsuario.value.nombre || !nuevoUsuario.value.email || !nuevoUsuario.value.contraseña || !nuevoUsuario.value.rol) {
    console.error('Por favor, completa todos los campos.');
    return;
  }
  try {
    const response = await postData('/usuarios', nuevoUsuario.value);
    modalAgregarUsuario.value = false;
    await listarUsuarios();
    resetFormulario();
  } catch (error) {
    console.error('Error al crear el usuario:', error.response ? error.response.data : error);
  }
};

function cambiarEstado(usuario) {
  UsuarioSeleccionado.value = usuario;
  modalConfirmarEstado.value = true;
}

const confirmarCambioEstado = async () => {
  if (!UsuarioSeleccionado.value) return;
  const usuario = UsuarioSeleccionado.value;
  const ruta = usuario.estado === 'activo'
    ? `/usuarios/${usuario._id}/inactivar`
    : `/usuarios/${usuario._id}/activar`;

  try {
    await putData(ruta);
    usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
    modalConfirmarEstado.value = false;
  } catch (error) {
    console.error('Error al actualizar el estado:', error.response ? error.response.data : error);
  }
};

function editarUsuarios(usuario) {
  UsuarioEditada.value = { ...usuario };
  modalEditarUsuario.value = true;
}

function cerrarModalEditar() {
  modalEditarUsuario.value = false;
  resetUsuarioEditado();
}

const guardarEdicion = async () => {
  if (!UsuarioEditada.value._id) return;
  try {
    await putData(`/usuarios/modificar/${UsuarioEditada.value._id}`, UsuarioEditada.value);
    const index = rows.value.findIndex((item) => item._id === UsuarioEditada.value._id);
    if (index !== -1) rows.value[index] = { ...UsuarioEditada.value };
    cerrarModalEditar();
  } catch (error) {
    console.error('Error al actualizar el usuario:', error.response ? error.response.data : error);
  }
};
</script>


  
  
  
  
  <style>
  h1 {
    color: red; 
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