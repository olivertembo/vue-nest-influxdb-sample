<template>
  <div class="register">
    <form @submit.prevent="handleSubmit">
    <div class="input-element">
      <label for="first-name">First Name:</label>
      <input
        type="text"
        id="first-name"
        v-model="firstName"
        required
      />
    </div>
    <div class="input-element">
      <label for="last-name">Last Name:</label>
      <input
        type="text"
        id="last-name"
        v-model="lastName"
        required
      />
    </div>
    <div class="input-element">
      <label for="username">username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        required
      />
    </div>
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref<string>('');
    const firstName = ref<string>('');
    const lastName = ref<string>('');
    const username = ref<string>('');
    const password = ref<string>('');
    const status = ref<string>('');

    const handleSubmit = async () => {
      if (!email.value || !password.value) {
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/auth/register', {          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            password: password.value,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          if (data.token) {
            localStorage.setItem('token', data.token);
            store.dispatch('setAuthData', { token: data.token, user: data.user });
    
            router.push({ name: 'dashboard' });
          }
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
      firstName,
      lastName,
      username,
      password,
      status,
      handleSubmit,
    };
  },
};
</script>

<style>
.register {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (min-width: 1024px) {
  .register {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
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
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
