<template>
  <q-layout>
    <!-- Barra de navegación o drawer (opcional) -->
    <q-header>
      <!-- Aquí puedes colocar un header, si lo deseas -->
    </q-header>

    <!-- Contenedor para la página -->
    <q-page-container>
      <!-- Tu página de login -->
      <q-page class="flex flex-center">
        <q-card class="my-card" bordered>
          <div class="header-login">
            <p>INVENTARIO</p>
          </div>

          <div class="img-login">
            <img src="https://img.freepik.com/iconos-gratis/carrito-compras_318-839174.jpg" alt="" class="logo">
          </div>

          <h6>Iniciar Sesión</h6>

          <div class="login-form" :class="{'fade-in': showForm}">
            <q-card-section class="q-pa-none">
              <div class="q-gutter-md">
                <q-input
                  outlined
                  v-model="email"
                  label="Email"
                  type="email"
                  dense
                  autofocus
                  :rules="[val => val && val.length > 0 || 'El email es obligatorio']"
                />
                <q-input
                  outlined
                  v-model="password"
                  label="Contraseña"
                  type="password"
                  dense
                  :rules="[val => val && val.length > 0 || 'La contraseña es obligatoria']"
                  :error="passwordError !== ''"
                  :error-message="passwordError"
                />
              </div>
            </q-card-section>
            <q-card-actions id="buttom">
              <q-btn @click="login" label="Iniciar Sesión" />
            </q-card-actions> 
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { postData } from '../services/apiClient.js';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/useAuth.js';

const Store = useAuthStore();

const email = ref('');
const password = ref('');
const passwordError = ref('');  
const router = useRouter();
const showForm = ref(false);

onMounted(() => {
  showForm.value = true;
});

const login = async () => {
  try {
    const response = await postData('/usuarios/login', { email: email.value, contraseña: password.value });
    const token = response.token;
    console.log(response);

    if (token) {
      Store.setToken(response.token);
      router.replace("/home");
    } else {
      console.log('Respuesta sin token:', response);
    }
  } catch (error) {
    console.log(error);

    if (error.response && error.response.data.error === 'Contraseña incorrecta') {
      passwordError.value = 'La contraseña es incorrecta';  
    } else {
      console.log('Error al iniciar sesión:', error.response?.data?.error || error.message);
      passwordError.value = '';
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.q-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.my-card {
  width: 400px;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 30px auto;
}

.header-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: blue;
  font-size: 40px;
  color: white;
  border-radius: 12px 12px 0 0;
  font-weight: 500;
}

.login-form {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.login-form.fade-in {
  opacity: 1;
}

.img-login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
}

h6 {
  margin: 3px 50px;
  text-align: center;
}

.q-input {
  border-radius: 8px;
  padding: 20px 40px 0px;
}

.q-btn {
  border-radius: 8px;
  display: flex;
  margin: 30px 30px 10px;
  background-color: blue;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

#buttom {
  display: flex;
  justify-content: center;
}

.q-card-actions {
  padding: 10px 0;
  margin: 40px;
}
</style>
