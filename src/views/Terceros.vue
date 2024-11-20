<template>
    <h1>Articulos</h1>
    <div class="q-pa-md">
        <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" >

            <template v-slot:body-cell-opciones="props">
                <q-td :props="props" style="text-align: center;">
                    <q-btn>📝</q-btn>
                   
                    <q-btn v-if="props.row.estado=='activo'">❌</q-btn>
                    <q-btn v-else=>✅</q-btn>
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


onBeforeMount(() => {
    listarTerceros()
})

columns.value = [
    { field: "nombre", label: "nombre", name: "nombre", align: "center" },
    { field: "identificacion", label: "identificacion", name: "identificacion", align: "center" },
    { field: "tipo", label: "tipo", name: "tipo", align: "center" },
    { field: "email", label: "email", name: "email", align: "center" },
    { field: "direccion", label: "dirrecion", name: "dirrecion", align: "center" },
    { field: "telefono", label: "telefono", name: "telefono", align: "center" },
    { field: "estado", label: "estado", name: "estado", align: "center" },
]


async function listarTerceros() {
    let res = await getData("/terceros")
    console.log(res);
    rows.value = res
}
//hola
</script>