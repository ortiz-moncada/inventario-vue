<template>
    <h1>Movimientos</h1>
    <div class="q-pa-md q-gutter-sm">
      <!-- Botón para agregar un nuevo movimiento -->
      <q-btn color="red" label="Agregar nuevo movimiento" no-caps @click="openModal" />
  
      <!-- Modal para agregar movimiento -->
      <q-dialog v-model="modalAgregarMovimiento" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Agregar Nuevo Movimiento</div>
            <q-input v-model="nuevoMovimiento.tipo" label="Tipo" filled />
            <q-input v-model="nuevoMovimiento.num_factura" label="Número de Factura" type="number" filled />
            <q-input v-model="nuevoMovimiento.fecha" label="Fecha" type="date" filled />
            <q-input v-model="articulosString" label="Artículos" filled />
            <q-input v-model="nuevoMovimiento.valor" label="Valor" type="number" filled />
            <q-input v-model="nuevoMovimiento.iva" label="IVA" type="number" filled />
            <q-input v-model="nuevoMovimiento.total" label="Total" type="number" filled />
          </q-card-section>
  
          <q-card-actions align="around">
            <q-btn label="Cancelar" color="secondary" flat @click="cerrarFormulario" />
            <q-btn label="Guardar" color="blue" flat @click="postMovimiento" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="id">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" style="text-align: center;">
            <q-btn @click="editarMovimiento(props.row)">📝</q-btn>
            <q-btn v-if="props.row.estado === 'aprobado'" @click="cambiarEstado(props.row)">❌</q-btn>
            <q-btn v-if="props.row.estado === 'anulado'" @click="cambiarEstado(props.row)">✅</q-btn>
            <q-btn>👁️</q-btn>

          </q-td>
        </template>
      </q-table>
    </div>
  
    <!-- Modal para editar movimiento -->
    <q-dialog v-model="modalEditarMovimiento" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Movimiento</div>
          <q-input v-model="movimientoEditado.tipo" label="Tipo" filled />
          <q-input v-model="movimientoEditado.num_factura" label="Número de Factura" type="number" filled />
          <q-input v-model="movimientoEditado.fecha" label="Fecha" type="date" filled />
          <q-input v-model="articulosEditadosString" label="Artículos" filled />
          <q-input v-model="movimientoEditado.valor" label="Valor" type="number" filled />
          <q-input v-model="movimientoEditado.iva" label="IVA" type="number" filled />
          <q-input v-model="movimientoEditado.total" label="Total" type="number" filled />
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
  import { onBeforeMount, ref, computed } from 'vue';
  import { postData, putData, getData } from '../services/apiClient';
  
  const rows = ref([]);
  const columns = ref([
    { field: "tipo", label: "Tipo", name: "tipo", align: "center" },
    { field: "num_factura", label: "Número de Factura", name: "num_factura", align: "center" },
    { field: "fecha", label: "Fecha", name: "fecha", align: "center" },
    { field: "articulos", label: "Artículos", name: "articulos", align: "center" },
    { field: "valor", label: "Valor", name: "valor", align: "center" },
    { field: "iva", label: "IVA", name: "iva", align: "center" },
    { field: "total", label: "Total", name: "total", align: "center" },
    { field: "estado", label: "Estado", name: "estado", align: "center" },
    { field: 'opciones', label: 'Opciones', name: 'opciones', align: 'center' },
  ]);
  
  const modalAgregarMovimiento = ref(false);
  const modalEditarMovimiento = ref(false);
  const modalConfirmarEstado = ref(false);
  const nuevoMovimiento = ref({
    tipo: '',
    num_factura: '',
    fecha: '',
    articulos: [],
    valor: '',
    iva: '',
    total: '',
    estado: ''
  });
  const movimientoEditado = ref({});
  const categoriaSeleccionada = ref(null);
  
  // Conversión entre el array de artículos y el string para el input
  const articulosString = computed({
    get() {
      return nuevoMovimiento.value.articulos.join(', '); // Convierte el array en un string
    },
    set(value) {
      nuevoMovimiento.value.articulos = value ? value.split(',').map(item => item.trim()) : []; // Convierte el string de vuelta a un array
    }
  });
  
  const articulosEditadosString = computed({
    get() {
      return movimientoEditado.value.articulos.join(', '); // Convierte el array en un string
    },
    set(value) {
      movimientoEditado.value.articulos = value ? value.split(',').map(item => item.trim()) : []; // Convierte el string de vuelta a un array
    }
  });
  
  // Solo llamamos a listarMovimientos una vez, en el ciclo de vida (onBeforeMount)
  onBeforeMount(() => {
    listarMovimientos();
  });
  
  // Aseguramos que listarMovimientos no se llame repetidamente
  async function listarMovimientos() {
    try {
      const res = await getData('/movimientos');
      rows.value = res; // Actualizamos solo cuando obtenemos datos nuevos
    } catch (error) {
      console.error('Error al obtener los movimientos:', error);
    }
  }
  
  // Abrir modal para agregar un nuevo movimiento
  function openModal() {
    nuevoMovimiento.value = {
      tipo: '',
      num_factura: '',
      fecha: '',
      articulos: [],
      valor: '',
      iva: '',
      total: '',
      estado: ''
    };
    modalAgregarMovimiento.value = true;
  }
  
  // Cerrar modal de agregar movimiento
  function cerrarFormulario() {
    modalAgregarMovimiento.value = false;
  }
  
  // Función para agregar un nuevo movimiento
  async function postMovimiento() {
    try {
      const response = await postData('/movimientos', nuevoMovimiento.value);
      console.log('Movimiento creado con éxito:', response);
      modalAgregarMovimiento.value = false;
      // Solo actualizar los movimientos cuando el post es exitoso
      await listarMovimientos();
    } catch (error) {
      console.error('Error al crear el movimiento:', error.response ? error.response.data : error);
    }
  }
  
  // Editar movimiento
  function editarMovimiento(row) {
    movimientoEditado.value = { ...row };  // Copia el movimiento seleccionado
    modalEditarMovimiento.value = true;    // Abre el modal de edición
  }
  
  // Cerrar modal de edición
  function cerrarModalEditar() {
    modalEditarMovimiento.value = false;
    movimientoEditado.value = {};  // Limpia el objeto de edición
  }
  
  // Guardar cambios de un movimiento editado
  async function guardarEdicion() {
    if (!movimientoEditado.value.id) return;
  
    try {
      const response = await putData(`/movimientos/modificar/${movimientoEditado.value.id}`, movimientoEditado.value);
      console.log('Movimiento actualizado con éxito:', response);
  
      // Actualizar el movimiento localmente solo si la edición fue exitosa
      const index = rows.value.findIndex(item => item.id === movimientoEditado.value.id);
      if (index !== -1) {
        rows.value[index] = { ...movimientoEditado.value };  // Actualiza el movimiento modificado
      }
  
      modalEditarMovimiento.value = false;
    } catch (error) {
      console.log('Error al actualizar el movimiento:', error.response ? error.response.data : error);
    }
  }
  
  // Función para cambiar el estado de un movimiento
  function cambiarEstado(movimiento) {
    categoriaSeleccionada.value = movimiento;  // Almacenar el movimiento seleccionado
    modalConfirmarEstado.value = true; // Mostrar modal de confirmación
  }
  
  // Función para confirmar el cambio de estado
  const confirmarCambioEstado = async () => {
    if (!categoriaSeleccionada.value) return;
  
    const movimiento = categoriaSeleccionada.value; // Obtener el movimiento seleccionado
  
    // Determinar la ruta y el estado según el estado actual
    let ruta;
    if (movimiento.estado === 'aprobado') {
      ruta = `/movimientos/${movimiento.id}/anular`;  // Ruta para anular el movimiento
      movimiento.estado = 'anulado';  // Cambiar estado a 'anulado'
    } else {
      ruta = `/movimientos/${movimiento.id}/aprobar`;  // Ruta para aprobar el movimiento
      movimiento.estado = 'aprobado';  // Cambiar estado a 'aprobado'
    }
  
    // Realizar la solicitud PUT
    try {
      const response = await putData(ruta, movimiento);
      console.log('Cambio de estado realizado:', response);
      modalConfirmarEstado.value = false;
  
      // Actualizar el estado del movimiento en la tabla
      const index = rows.value.findIndex(item => item.id === movimiento.id);
      if (index !== -1) {
        rows.value[index] = { ...movimiento };  // Actualiza el movimiento con el nuevo estado
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>
  
  