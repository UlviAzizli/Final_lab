import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref } from "vue";

const authenticationStatus = ref(false);

export const useUserStore = defineStore("userStore", () => {
  const user = ref();

  const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) console.log("Error: ", error);
    else {
      "Data: ", console.log(data);
      user.value = data;
      authenticationStatus.value = true;
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) console.log("Error: ", error);
    else {
      "Data: ", console.log(data);
      user.value = data;
      authenticationStatus.value = true;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      console.log("logout has been successful");
    }
    authenticationStatus.value = false;
  };

  return {
    user,
    createNewUser,
    signIn,
    signOut,
    authenticationStatus,
  };
});
