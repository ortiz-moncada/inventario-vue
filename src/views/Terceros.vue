<template>
    <div>
        <q-table title="Terceros" :rows="rows" :columns="columns" row-key="name">

        </q-table>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getData } from '../services/apiClient.js'


const columns = ref([
    {
        name: "nombre",
        align: "center",
        label: "Nombre",
        field: "nombre",
        sortable: true,
    },
    {
        name: "identificacion",
        align: "center",
        label: "Identificacion",
        field: "identificacion",
        sortable: true,
    },
    {
        name: "direccion",
        align: "center",
        label: "Direccion",
        field: "direccion",
        sortable: true,
    },
    {
        name: "telefono",
        align: "center",
        label: "Telefono",
        field: "telefono",
        sortable: true,
    },
    {
        name: "email",
        align: "center",
        label: "Email",
        field: "email",
        sortable: true,
    },
    {
        name: "tipo",
        align: "center",
        label: "Tipo",
        field: "tipo",
        sortable: true,
    },
    {
        name: "estado",
        align: "center",
        label: "Estado",
        field: "estado",
        sortable: true,
    },
    
])

const rows = ref([])

async function getDataFromApi() {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage
    if (!token) {
        console.log('Token no encontrado');
        return;  // Salir si el token no está disponible
    }

    try {
        const response = await getData('terceros');  // Llamada a la API
        console.log(response);  // Verifica toda la respuesta en consola
        if (response && Array.isArray(response)) {
            rows.value = response;  // Asigna el arreglo de objetos a rows
        } else {
            console.log('La respuesta no contiene los datos esperados');
        }
    } catch (error) {
        console.log('Error al obtener los datos:', error.response ? error.response.data : error);
    }
}



onMounted(async () => {
    await getDataFromApi()
})

</script>