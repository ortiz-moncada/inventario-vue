<template>
    <h1>Usuarios</h1>
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" label="Agregar nuevo usuario" no-caps @click="openModal" />
  
      <!-- Modal para agregar usuario -->
      <q-dialog v-model="modalAgregarUsuario" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Agregar Nuevo Usuario</div>
            <q-input v-model="nuevoUsuario.nombre" label="Nombre" filled />
            <q-input v-model="nuevoUsuario.email" label="Email" filled />
            <q-input v-model="nuevoUsuario.contraseña" label="Contraseña" />
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
      <q-table title="Usuarios" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="q-pa-sm flex justify-center">
            <!-- Botón de editar usuario -->
            <q-btn icon="edit" color="blue" round @click="editarUsuarios(props.row)" />
  
            <!-- Modal para editar usuarios -->
            <q-dialog v-model="modalEditarUsuario" persistent>
              <q-card>
                <q-card-section>
                  <div class="text-h6">Editar usuario</div>
                  <q-input v-model="usuarioSeleccionado.nombre" label="Nombre" filled />
                  <q-input v-model="usuarioSeleccionado.email" label="Email" filled />
                  <q-input v-model="usuarioSeleccionado.contraseña" label="Contraseña" filled type="password" />
                  <q-input v-model="usuarioSeleccionado.rol" label="Rol" filled />
                </q-card-section>
  
                <q-card-actions>
                  <q-btn label="Cancelar" color="secondary" flat @click="cerrarModalEditar" />
                  <q-btn label="Guardar" color="primary" flat @click="guardarEdicion" />
                </q-card-actions>
              </q-card>
            </q-dialog>
  
            <!-- Botones para cambiar estado -->
            <q-btn v-if="props.row.estado === 'activo'" icon="block" color="red" round @click="cambiarEstado(props.row)" />
            <q-btn v-else-if="props.row.estado === 'inactivo'" icon="check_circle" color="green" round @click="cambiarEstado(props.row)" />
            <q-btn v-else icon="help" color="grey" round disabled />
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
  
  <script setup>
  import { onBeforeMount, ref } from 'vue';
  import { getData, postData, putData } from '../services/apiClient';
  
  const rows = ref([]);
  const columns = [
    { field: 'nombre', label: 'Nombre', align: 'center' },
    { field: 'email', label: 'Email', align: 'center' },
    { field: 'rol', label: 'Rol', align: 'center' },
    { field: 'contraseña', label: 'Contraseña', align: 'center' },
    { field: 'estado', label: 'Estado', align: 'center' },
    { field: 'opciones', label: 'Opciones', align: 'center' },
  ];
  
  const modalAgregarUsuario = ref(false);
  const modalConfirmarEstado = ref(false);
  const modalEditarUsuario = ref(false);
  
  const nuevoUsuario = ref({
    nombre: '',
    email: '',
    contraseña: '',
    rol: '',
    estado: 'activo',
  });
  
  const usuarioSeleccionado = ref(null);
  
  async function listarUsuarios() {
    try {
      const res = await getData('/usuarios/usuario');
      console.log('Respuesta de la API:', res);
  
      if (res?.usuario) {
        rows.value = res.usuario;
      } else {
        console.error('Error: No se encontraron usuarios');
      }
    } catch (error) {
      console.error('Error al listar usuarios:', error);
    }
  }
  
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
  
  async function postUsuario() {
    if (!nuevoUsuario.value.nombre || !nuevoUsuario.value.email || !nuevoUsuario.value.contraseña || !nuevoUsuario.value.rol) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const res = await postData('/usuarios', nuevoUsuario.value);
      if (res) {
        rows.value.push(res.usuario);
        cerrarFormulario();
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  }
  
  function cambiarEstado(usuario) {
    usuarioSeleccionado.value = usuario;
    modalConfirmarEstado.value = true;
  }
  
  async function confirmarCambioEstado() {
    if (!usuarioSeleccionado.value) return;
  
    const usuario = usuarioSeleccionado.value;
    const ruta = `/usuarios/${usuario._id}/${usuario.estado === 'activo' ? 'inactivar' : 'activar'}`;
  
    try {
      const res = await putData(ruta);
      if (res) {
        usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
      }
      modalConfirmarEstado.value = false;
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  }
  
  function editarUsuarios(usuario) {
    usuarioSeleccionado.value = { ...usuario };
    modalEditarUsuario.value = true;
  }
  
  function cerrarModalEditar() {
    modalEditarUsuario.value = false;
  }
  
  async function guardarEdicion() {
    if (!usuarioSeleccionado.value.nombre || !usuarioSeleccionado.value.email || !usuarioSeleccionado.value.contraseña || !usuarioSeleccionado.value.rol) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    try {
      const res = await putData(`/usuarios/${usuarioSeleccionado.value._id}`, usuarioSeleccionado.value);
      if (res) {
        const index = rows.value.findIndex((row) => row._id === usuarioSeleccionado.value._id);
        if (index !== -1) {
          rows.value[index] = res.usuario;
        }
        cerrarModalEditar();
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  }
  
  onBeforeMount(() => {
    listarUsuarios();
  });
  </script>
  