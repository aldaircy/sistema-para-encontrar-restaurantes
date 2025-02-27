const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes);

// Datos ficticios de restaurantes
const restaurants = [
  { id: 1, name: 'Restaurante A', address: 'Calle Falsa 123', typeOfFood: 'Mexicana', lat: 10.444033, lon: -75.272929 },
  { id: 2, name: 'Restaurante B', address: 'Av. Reforma 456', typeOfFood: 'Italiana', lat: 10.405952, lon: -75.500850 },
  { id: 3, name: 'Restaurante C', address: 'Calle 5 789', typeOfFood: 'Comida rápida', lat: 10.412553, lon: -75.442364 },
];

// Función para calcular la distancia entre dos puntos geográficos (en km)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en km
  return distance;
}

//Definir ruta GET para obtener restaurantes cercanos
app.get('/api/restaurants', (req, res) => {
  const { lat, lon, query } = req.query;

  // Filtrar restaurantes cercanos según la búsqueda
  const nearbyRestaurants = restaurants.filter((restaurant) => {
    const distance = calculateDistance(lat, lon, restaurant.lat, restaurant.lon);
    return (
      distance <= 10 && // Filtramos por una distancia máxima de 10 km
      (restaurant.name.toLowerCase().includes(query.toLowerCase()) || restaurant.typeOfFood.toLowerCase().includes(query.toLowerCase()))
    );
  });

  res.json({ restaurants: nearbyRestaurants.map(restaurant => ({
    name: restaurant.name,
    address: restaurant.address,
    typeOfFood: restaurant.typeOfFood
    }))
  });

});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});