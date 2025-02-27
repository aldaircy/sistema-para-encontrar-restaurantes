<template>
  <div :class="messageClass" class="message">
    {{ message }}
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    message: String,
    messageClass: String,
})
</script>

<style scoped>
.message {
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
}

.success {
    color: green;
}

.error {
    color: red;
}
</style>
