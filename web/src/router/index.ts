import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.state.token !== null;

  console.log('requiresAuth', requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (!requiresAuth && isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
})

export default router
