<template>

    <h1>Articulos</h1>
    <div class="q-pa-md">
        <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" >

            <template v-slot:body-cell-opciones="props">
                <q-td :props="props" style="text-align: center;">
                    <q-btn>📝</q-btn>
                   
                    <q-btn v-if="props.row.estado=='activo'">❌</q-btn>
                    <q-btn v-else>✅</q-btn>
                </q-td>
            </template>
        </q-table>
    </div>

    <!-- Este es un comentario de prueva -->

</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import { postData, putData, getData } from '../services/apiClient';
let rows = ref([])
let columns = ref([])


onBeforeMount(() => {
    listarArticulos()
})

columns.value = [
    { field: "nombre", label: "nombre", name: "nombre", align: "center" },
    { field: "precio", label: "precio", name: "precio", align: "center" },
    { field: "categoria", label: "categoria", name: "categoria", align: "center" },
    { field: "stock", label: "stock", name: "stock", align: "center" },
    { field: "estado", label: "estado", name: "estado", align: "center" },
]

async function listarArticulos() {
    let res = await getData("/articulos/articulo")
    console.log(res);
    rows.value = res
}
//hola
</script>