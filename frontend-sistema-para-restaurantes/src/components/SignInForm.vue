<template>
    <div class="signIn-container">
        <div class="content">
            <h1>Iniciar sesión</h1>
            <p>Encuentra el restaurante mas cercano!</p>
            <form @submit.prevent="handleSignIn">
                <div class="form-group">
                    <label for="signInEmail">Correo electrónico</label>
                    <input type="email" v-model="signInEmail" required />
                </div>
                <div class="form-group">
                    <label for="signInPassword">Contraseña</label>
                    <input type="password" v-model="signInPassword" required />
                </div>
                <div class="form-group">
                    <button type="submit">Iniciar sesión</button>
                </div>
            </form>
            <a @click="goBack">Regresar a la página principal</a>
            <Message v-if="signInMessage" :message="signInMessage" :messageClass="signInMessageClass" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Message from './Message.vue'

const router = useRouter()

const signInEmail = ref('')
const signInPassword = ref('')
const signInMessage = ref('')
const signInMessageClass = ref('')

const handleSignIn = async () => {
    const userData = { email: signInEmail.value, password: signInPassword.value }

    try {
        const response = await axios.post(
            'http://localhost:5000/api/auth/signin',
            userData
        );
        signInMessage.value = response.data.message;
        signInMessageClass.value = 'success';
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirigimos al usuario al dashboard
        router.push('/dashboard');
    } catch (error) {
        if (error.response) {
            signInMessage.value = error.response.data.message;
            signInMessageClass.value = 'error';
        } else {
            signInMessage.value = 'Error al conectar con el servidor';
            signInMessageClass.value = 'error';
        }
    }
}

const goBack = () => {
    router.push('/')
}
</script>

<style scoped>
.signIn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0;
}

.content {
    width: 100%;
    max-width: 600px; 
    margin: 0 auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    font-size: 1.8rem;
    color: #333;
}

p {
    margin-bottom: 20px;
    color: #333;
}

a {
    color: #1FB7E4;
    text-decoration: none;
    cursor: pointer;
}

a:hover {
    color: #1c9cc2;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 8px;
}

input {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 12px;
    font-size: 1.2rem;
    background-color: #1FB7E4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #1c9cc2;
}

.success {
    color: green;
    margin-top: 20px;
}

.error {
    color: red;
    margin-top: 20px;
}
</style>
