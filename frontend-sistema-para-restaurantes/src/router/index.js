import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '../components/WelcomePage.vue';
import SignUpForm from '../components/SignUpForm.vue';
import SignInForm from '../components/SignInForm.vue';
import DashboardPage from '../components/DashboardPage.vue';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomePage,
  },
  {
    path: '/register',
    name: 'register',
    component: SignUpForm,
  },
  {
    path: '/login',
    name: 'login',
    component: SignInForm,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Controlar el acceso a las rutas protegidas
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    // Si intentas acceder al dashboard sin estar autenticado, redirigimos a login
    next('/login');
  } else {
    next();  // De lo contrario, permitimos el acceso
  }
});

export default router;
