<template>
  <div>
    <nav>
      <template v-if="isAuthenticated">
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <a @click="handleLogout">Logout</a>
      </template>
      <template v-else>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>
    </nav>
  </div>
  <main>
    <RouterView />
  </main>
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
