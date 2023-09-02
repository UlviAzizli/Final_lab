<template>
  <div class="auth-container">
    <div class="form-container">
      <h1>{{ formType === "login" ? "Login" : "Sign Up" }}</h1>
      <form @submit.prevent="formType === 'login' ? login : signUp">
        <div class="input-container">
          <label for="email">
            <font-awesome-icon icon="fa-solid fa-envelope" bounce />Email:
          </label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-container">
          <label for="password">
            <font-awesome-icon icon="fa-solid fa-lock" bounce />Password:</label
          >
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" @click="login">
          {{ formType === "login" ? "Login" : "Sign Up" }}
        </button>
      </form>
      <p>
        {{
          formType === "login"
            ? "Don't have an account? "
            : "Already have an account? "
        }}
        <a @click="toggleForm">
          {{ formType === "login" ? "Sign Up" : "Login" }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const formType = ref("login");
    const userStore = useUserStore();
    const router = useRouter();

    const changePath = () => {
      router.push({ path: "/list" });
    };

    const login = async () => {
      try {
        await userStore.signIn(email.value, password.value);
        if (userStore.authenticationStatus === true) {
          changePath();
          console.log(userStore.authenticationStatus);
        }
      } catch (error) {
        console.error("Sign-in error:", error);
      }
    };

    const signUp = async () => {
      await userStore.createNewUser(email.value, password.value);
      if (userStore.authenticationStatus === true) {
        changePath();
        console.log(userStore.authenticationStatus);
      }
    };

    const toggleForm = () => {
      formType.value = formType.value === "login" ? "signup" : "login";
    };

    return {
      email,
      password,
      formType,
      login,
      signUp,
      toggleForm,
    };
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  background-image: linear-gradient(to bottom right, #ff5722, #2196f3);
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.input-container {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
