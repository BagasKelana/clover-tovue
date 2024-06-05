<template>
  <h1 class="text-display-1 pa-4">Today Todo</h1>
  <TodoCard v-for="itam in data" v-bind="itam" :key="itam.id" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTodoStore } from "../stores/useTodoStore";
import { todayTodos } from "../helpers/helpers";

const { loadTodos, getTodos } = useTodoStore();

onMounted(() => {
  loadTodos();
  data.value = todayTodos(getTodos());
});

const data = ref(null);
</script>
