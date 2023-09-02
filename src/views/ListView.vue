<template>
  <div class="todo-list">
    <h1>Todo List</h1>
    <div class="task-form">
      <input
        type="text"
        v-model="title"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button @click="addTask">Add</button>
    </div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div class="task-actions">
          <input
            type="text"
            v-if="task.id === editingTaskId"
            v-model="task.title"
            @keyup.enter="updateTask(task)"
          />
          <span v-else @click="startEditingTask(task)">{{ task.title }}</span>
          <button @click="deleteTask(task.id)">
            <font-awesome-icon icon="fa-duotone fa-trash-list" spin /> Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const title = ref("");
    const editingTaskId = ref(null);
    const taskStore = useTaskStore();
    const userStore = useUserStore();

    const tasks = computed(() => taskStore.tasks);

    const addTask = async () => {
      if (title.value.trim() !== "") {
        try {
          await userStore.user;

          const user = userStore.user.value;
          const userId = user ? user.id : null;

          if (userId) {
            taskStore.createTask(userId, title.value);
            title.value = "";
          } else {
            console.error("User information not available.");
          }
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    };

    const deleteTask = (taskId) => {
      taskStore.deleteTask(taskId);
    };

    const startEditingTask = (task) => {
      editingTaskId.value = task.id;
    };

    const updateTask = (task) => {
      if (task.title.trim() !== "") {
        taskStore.updateTask(task.id, task.title);
        editingTaskId.value = null;
      }
    };

    onMounted(async () => {
      await taskStore.fetchTasks();

      await userStore.fetchUser();

      const user = userStore.user.value;
      if (user) {
        console.log("User object:", user);
      } else {
        console.error("User information not available.");
      }
    });

    watch(
      () => userStore.user,
      () => {
        if (userStore.user && userStore.user.user) {
          console.log("User information available:", userStore.user.user);
        }
      }
    );

    return {
      title,
      editingTaskId,
      tasks,
      addTask,
      deleteTask,
      startEditingTask,
      updateTask,
    };
  },
};
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
  background-image: linear-gradient(to bottom right, #ff5722, #2196f3);
}

.task-form {
  display: flex;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
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
  margin-left: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.task-actions {
  display: flex;
  align-items: center;
}

button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
}

input[type="text"] {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
</style>
