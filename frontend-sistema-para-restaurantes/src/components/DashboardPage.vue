<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Bienvenido, {{ user.email }}</h1>
      <div class="dropdown">
        <button class="dropdown-button">Mi Perfil</button>
        <div class="dropdown-content">
            <button @click="showHistory" class="menu-option">Historial de búsquedas</button>
            <button @click="logout" class="menu-option">Cerrar sesión</button>
        </div>
      </div>
    </div>

    <div class="search-container">
      <h2>Buscar restaurantes cercanos</h2>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Escribe el nombre o tipo de restaurante"
      />
      <button @click="searchRestaurants" class="search-button">Buscar</button>
    </div>

    <div v-if="restaurants.length > 0" class="restaurants-list">
      <h3>Restaurantes cercanos:</h3>
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          <p>Nombre: {{ restaurant.name }}</p>
          <p>Direccion: {{ restaurant.address }}</p>
          <p>Tipo de comida: {{ restaurant.typeOfFood }} </p>
        </li>
      </ul>
    </div>

    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <search-history v-if="showingHistory" :history="searchHistory" @clear-history="clearHistory" @close-history="closeHistory" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import SearchHistory from './SearchHistory.vue'

const router = useRouter()

const searchQuery = ref('')
const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
const restaurants = ref([])
const errorMessage = ref('')
const currentLocation = ref(null)
const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory')) || [])
const showingHistory = ref(false)

onMounted(() => {
    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation.value = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
                searchRestaurants()
            },
            (error) => {
                console.error(error);
                errorMessage.value = 'No se pudo obtener la ubicación.'
            }
        )
    } else {
        errorMessage.value = 'Geolocalización no soportada en este navegador.'
    }
})

const searchRestaurants = async () => {
    if (!currentLocation.value || !searchQuery.value.trim()) return

    try {
        // Simulación de la llamada a una API para buscar restaurantes cercanos
        const response = await axios.get('http://localhost:5000/api/restaurants', {
            params: {
                lat: currentLocation.value.lat,
                lon: currentLocation.value.lon,
                query: searchQuery.value,
            },
        });

        restaurants.value = response.data.restaurants;

        if (restaurants.value.length === 0) {
          errorMessage.value = 'No se encontraron restaurantes cercanos.';
        }

        addToSearchHistory(searchQuery.value);
    } catch (error) {
        console.error('Error completo:', error);
        errorMessage.value = 'Hubo un error al buscar los restaurantes.';
    }
}

const addToSearchHistory = (query) => {
    if (searchHistory.value.indexOf(query) === -1) {
        searchHistory.value.push(query)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
    }
}

const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
}

const showHistory = () => {
    showingHistory.value = !showingHistory.value
}

const clearHistory = () => {
    searchHistory.value = [];
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value)); 
}

const closeHistory = () => {
    showingHistory.value = false;
}
</script>

<style scoped>
.dashboard-container {
    padding: 50px 20px 20px;
    max-width: 900px;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 50px;
}

.search-container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 10px;
    margin-top: 20px;
}

.search-button {
    font-size: 20px;
    padding: 10px 15px;
    background-color: #1FB7E4;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.search-button:hover {
    background-color: #1c9cc2;
}

input {
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.restaurants-list {
    margin-top: 30px;
}

.restaurants-list ul {
    list-style-type: none;
}

.restaurants-list li {
    background-color: #f7f7f7;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
    color: red;
    margin-top: 20px;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-button {
    font-size: 20px;
    padding: 15px;
    background-color: #1FB7E4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.dropdown-button:hover {
    background-color: #1c9cc2;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 5px;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown-content button {
    padding: 10px;
    width: 100%;
    text-align: left;
    background-color: #f9f9f9;
    border: none;
    cursor: pointer;
}

.dropdown-content button:hover {
    background-color: #ddd;
}

.dropdown-content .menu-option {
    width: 100%;
    padding: 10px 20px;
    background-color: #f1f1f1;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.dropdown-content .menu-option:hover {
    background-color: #ddd;
}

.dropdown-content .menu-option {
    color: #1FB7E4; 
}

.dropdown-content .menu-option:hover {
    color: white; 
    background-color: #1FB7E4;
}
</style>
