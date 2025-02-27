<template>
  <div class="history-container">
    <h3>Historial de Búsquedas</h3>
    <ul>
      <li v-for="(query, index) in history" :key="index">{{ query }}</li>
    </ul>
    <div class="history-buttons">
        <button @click="clearHistory" class="clear-history-btn">Limpiar Historial</button>
        <button @click="closeHistory">Cerrar</button>
    </div>    
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    history: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits();

const clearHistory = () => {
    emit('clear-history')
}

const closeHistory = () => {
    emit('close-history')
}
</script>

<style scoped>
.history-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.history-container ul {
    list-style-type: none;
    padding: 0;
}

.history-container li {
    padding: 10px;
    background-color: #f7f7f7;
    margin-bottom: 5px;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 18px;
}

button:hover {
    background-color: #d32f2f;
}

.history-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    justify-content: space-between;
}

.clear-history-btn {
    background-color: #e5be01 !important;
    font-size: 18px;
}

.clear-history-btn:hover {
    background-color: #c1a002 !important;
}
</style>