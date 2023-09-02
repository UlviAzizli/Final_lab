<template>
  <div class="container">
    <div v-if="toggleTrue" class="form-container">
      <div>
        <div>
          <div>
            <h1>Sign In</h1>
            <p>Sign in to your account</p>
          </div>

          <div>
            <form>
              <div>
                <label for="email">Email Address</label>
                <input
                  v-model="currentEmail"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <div>
                  <label for="password">Password</label>
                  <a href="#!">Forgot password?</a>
                </div>
                <input
                  v-model="currentPassword"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div>
                <button @click="handleSignIn" type="button">Sign In</button>
              </div>
              <p>
                Don't have an account yet?
                <a @click="toggleSignOption">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="form-container">
      <div>
        <div>
          <div>
            <h1>Create Your Account</h1>
            <p>Create an account and start using Todo app</p>
          </div>
          <div>
            <form>
              <div>
                <label for="email">Email Address</label>
                <input
                  type="email"
                  v-model="newEmail"
                  name="email"
                  placeholder="user@email.com"
                />
              </div>
              <div>
                <div>
                  <label for="password">Password</label>
                </div>
                <input
                  type="password"
                  v-model="newPassword"
                  name="password"
                  placeholder="Your Password"
                />
              </div>
              <div>
                <button @click="handleCreateUser" type="button">Sign Up</button>
              </div>
              <p>
                You have an account?
                <a @click="toggleSignOption">Sign In</a>!
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const userStore = useUserStore();
    const newEmail = ref("");
    const newPassword = ref("");

    const currentEmail = ref("");
    const currentPassword = ref("");
    const router = useRouter();

    onMounted(() => {
      userStore.resetAuthenticationStatus();
    });

    const changeView = () => {
      router.push({ path: "/list" });
    };

    const handleSignIn = async () => {
      await userStore.signIn(currentEmail.value, currentPassword.value);
      if (userStore.authenticationStatus === true) {
        changeView();
        console.log(userStore.authenticationStatus);
      }
    };
    const handleCreateUser = async () => {
      await userStore.createNewUser(newEmail.value, newPassword.value);
      if (userStore.authenticationStatus === true) {
        changeView();
        console.log(userStore.authenticationStatus);
      }
    };
    let toggleTrue = ref(true);
    function toggleSignOption() {
      if (toggleTrue.value === true) {
        return (toggleTrue.value = false);
      } else {
        return (toggleTrue.value = true);
      }
    }

    return {
      newEmail,
      newPassword,
      currentEmail,
      currentPassword,
      handleSignIn,
      handleCreateUser,
      toggleSignOption,
      toggleTrue,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  background-image: linear-gradient(to bottom right, #ff5722, #2196f3);
  background-size: cover;
  background-position: center;
  flex-direction: column;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.form-container h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.form-container p {
  font-size: 1rem;
  color: #007bff;
}

.form-container form {
  margin-top: 20px;
}

.form-container label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.875rem;
  color: #000;
  text-align: left;
}

.form-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.form-container button {
  width: 100%;
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-container button:hover {
  background-color: #0056b3;
}

.form-container a {
  font-size: 0.875rem;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.form-container a:hover {
  text-decoration: underline;
}

.toggle-button {
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.toggle-button:hover {
  background-color: #0056b3;
}
</style>
