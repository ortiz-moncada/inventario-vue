<template>

    <h1>Categorias</h1>
    <div class="q-pa-md">
        <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" >

            <template v-slot:body-cell-opciones="props">
                <q-td :props="props" style="text-align: center;">
                    <q-btn>📝</q-btn>
                   
                    <q-btn v-if="props.row.estado=='activo'">❌</q-btn>
                    <q-btn v-else="props.row.estado=='inactivo'">✅</q-btn>
                </q-td>
            </template>
            <!-- <template v-slot:body-cell-estado>
                <q-td :props="props">
                    
                </q-td>
            </template> -->
        </q-table>
    </div>


</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import { postData, putData, getData } from '../services/apiClient';

let rows = ref([])
let columns = ref([])


onBeforeMount(() => {
    listarCategorias()
})

columns.value = [
    { field: "descripcion", label: "Descripcion", name: "descripcion", align: "center" },
    { field: "estado", label: "Estado", name: "estado", align: "center" },
    { field: "opciones", label: "Opciones", name: "opciones", align: "center" },
]

async function listarCategorias() {
    let res = await getData("/categorias")
    console.log(res);
    rows.value = res.categoria
}

</script>