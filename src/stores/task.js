import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select();

    if (error) console.log("Error: ", error);
    else tasks.value = data;
  };

  const createTask = async (userId, taskName) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .insert({ user_id: userId, title: taskName });

      if (error) {
        console.error("Error creating task: ", error);
        return null;
      }

      fetchTasks();
    } catch (error) {
      console.error("Error creating task: ", error);
      return null;
    }
  };

  const deleteTask = async (taskId) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.error("Error deleting task: ", error);
    } else {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
    }
  };

  const updateTask = async (taskId, taskName) => {
    const { error } = await supabase
      .from("tasks")
      .update({ title: taskName })
      .eq("id", taskId);
    if (error) {
      console.error("Error updating task: ", error);
    } else {
      const taskToUpdate = tasks.value.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate: title = taskName;
      }
    }
  };

  return { tasks, fetchTasks, createTask, deleteTask, updateTask };
});
