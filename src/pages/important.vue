<template>
  <h1 class="text-display-1 pa-4">Important Todo</h1>
  <TodoCard v-for="itam in importantItems" v-bind="itam" :key="itam.id" />
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useTodoStore } from "../stores/useTodoStore";
import { importantTodos } from "../helpers/helpers";

const { loadTodos, getTodos } = useTodoStore();

onMounted(() => {
  loadTodos();
  data.value = getTodos();
});

const data = ref(null);
const importantItems = ref(null);

watchEffect(() => {
  if (data?.value?.length && data.value.length > 0) {
    importantItems.value = importantTodos(data.value);
  }
});
</script>
