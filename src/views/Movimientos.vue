<template>

    <h1>movimientos</h1>
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
    listarMovimientos()
})

columns.value = [
    { field: "tipo", label: "tipo", name: "tipo", align: "center" },
    { field: "num_fact", label: "num_fact", name: "num_fact", align: "center" },
    { field: "fecha", label: "fecha", name: "fecha", align: "center" },
    { field: "articulos", label: "articulos", name: "articulos", align: "center" },
    { field: "valor", label: "valor", name: "valor", align: "center" },
    { field: "iva", label: "iva", name: "iva", align: "center" },
    { field: "total", label: "total", name: "total", align: "center" },
    { field: "estado", label: "estado", name: "estado", align: "center" },
]


async function listarMovimientos() {
    let res = await getData("/movimientos")
    console.log(res);
    rows.value = res
}
//hola
</script>