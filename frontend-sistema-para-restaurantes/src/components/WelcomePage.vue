<template>
  <div class="welcome-container">
    <div class="content">
      <h1>Encontrar Restaurantes</h1>
      <p>¡Regístrate e inicia sesión para continuar!</p>
      
      <div class="buttons-container">
        <button @click="goToSignUp">Registrarse</button>
        <button @click="goToSignIn">Iniciar sesión</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSignUp = () => {
    router.push('/register');
}

const goToSignIn = () => {
    router.push('/login');
}
</script>

<style scoped>
.welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    padding: 0; 
}

.content {
    width: 100%;
    max-width: 600px; 
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1 {
    font-size: 2rem;
    color: #333;
}

p {
    color: #666;
    margin-bottom: 30px;
}

.buttons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

button {
    padding: 12px 30px;
    font-size: 1.2rem;
    color: #fff;
    background-color: #1FB7E4;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #1c9cc2;
}

button:focus {
    outline: none;
}
</style>
