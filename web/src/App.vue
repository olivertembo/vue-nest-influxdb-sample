<template>
  <div>
    <nav>
      <template v-if="isAuthenticated">
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <button @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>
    </nav>
  </div>
  <div>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const router = useRouter();
const isAuthenticated = computed(() => store.state.token !== null);

const handleLogout = async () => {
  try {
    store.dispatch('logout');
    router.push({ name: 'login' });
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>
<style scoped>
nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 3px;
}

nav a.router-link-active {
  color: #000;
}
</style>
