<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const currentEmail = ref("");
const currentPassword = ref("");

const changePath = () => {
  router.push({ path: "/list" });
};

const SignInUser = async () => {
  await userStore.signIn(currentEmail.value, currentPassword.value);
  if (userStore.authenticationStatus === true) {
    changePath();
    console.log(userStore.authenticationStatus);
  }
};

const CreateUser = async () => {
  await userStore.createNewUser(email.value, password.value);
  if (userStore.authenticationStatus === true) {
    changePath();
    console.log(userStore.authenticationStatus);
  }
};
</script>

<template>
  <h1>Todo list</h1>

  <h2 v-if="userStore.user">current user: {{ userStore.user.user.email }}</h2>

  <input placeholder="write your email" v-model="email" />
  <input placeholder="write your password" v-model="password" />
  <button @click="CreateUser(email, password)">create new user</button>
  <button @click="SignInUser">sign in</button>
  <br />
  <br />
  <button @click="userStore.signOut">sign out</button>
  <br />
  <br />
</template>

<style></style>
