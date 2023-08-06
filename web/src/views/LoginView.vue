<template>
  <div class="home">
    <form @submit.prevent="handleSubmit">
    <div class="input-element">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
      />
    </div>
    <div class="input-element">
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
      />
    </div>
    <div><span>{{ status }}</span></div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'HomeView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref<string>('');
    const password = ref<string>('');
    const status = ref<string>('');

    const handleSubmit = async () => {
      if (!email.value || !password.value) {
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/auth/login', {          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          if (data.access_token) {
            localStorage.setItem('token', data.access_token);
            store.dispatch('setAuthData', { token: data.access_token, user: data.user });
            router.push({ name: 'dashboard' });
          }
          status.value = 'success';
        } else {
          if (data.message) {
            status.value = data.message;
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      email,
      password,
      status,
      handleSubmit,
    };
  },
};
</script>

<style>
.home {
  min-height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D3D3D3;
  padding: 30px;
  border-radius: 5px;
}
.input-element {
  display: flex;
  flex-direction: column;
}
input {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}
button {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  background-color: #eee;
  cursor: pointer;
  width: 100%;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
