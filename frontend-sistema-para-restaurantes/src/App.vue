<template>
  <div id="app">
    <router-view></router-view>  <!-- Aquí se renderizan las vistas basadas en las rutas -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
/* Estilos globales opcionales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
