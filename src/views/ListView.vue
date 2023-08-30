<script setup>
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();
</script>

<template>
  <div>List View</div>

  <button @click="taskStore.fetchTasks()">Fetch tasks</button>
  <ul>
    <li v-for="task in taskStore.tasks">
      {{ task.title }} - {{ task.is_complete }}
    </li>
  </ul>
</template>

<style></style>
