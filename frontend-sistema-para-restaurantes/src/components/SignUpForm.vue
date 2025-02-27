<template>
    <div class="signUp-container">
        <div class="content">
            <h1>Crear una cuenta</h1>
            <p>¡Únete a nuestra comunidad con tus credenciales!</p>
            <form @submit.prevent="handleSignUp">
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" v-model="password" required />
                </div>
                <div class="form-group">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
            <a @click="goBack">Regresar a la página principal</a>
            <Message v-if="message" :message="message" :messageClass="messageClass" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Message from './Message.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const message = ref('')
const messageClass = ref('')

const handleSignUp = async () => {
    const userData = { email: email.value, password: password.value }

    try {
        const response = await axios.post(
            'http://localhost:5000/api/auth/signup',
            userData
            );
            message.value = response.data.message
            messageClass.value = 'success'
            email.value = ''
            password.value = ''

            // Después de un registro exitoso, volvemos a la página principal automáticamente
            // NOTA: Hay que buscar la manera de avisarle al usuario que el registro fue exitoso!
            router.push('/')
    } catch (error) {
        if (error.response) {
            message.value = error.response.data.message
            messageClass.value = 'error'
        } else {
            message.value = 'Error al conectar con el servidor'
            messageClass.value = 'error'
        }
    }
}

const goBack = () => {
    router.push('/')
};
</script>

<style scoped>
.signUp-container {
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
