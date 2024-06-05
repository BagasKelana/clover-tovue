<template>
  <h1 class="text-display-1 pa-4">Overdue Todo</h1>
  <TodoCard v-for="itam in overdueItems" v-bind="itam" :key="itam.id" />
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useTodoStore } from "../stores/useTodoStore";
import { filterOverdueTodos } from "../helpers/helpers";

const { loadTodos, getTodos } = useTodoStore();

onMounted(() => {
  loadTodos();

  data.value = getTodos();
});
const data = ref(null);
const overdueItems = ref(null);

watchEffect(() => {
  if (data?.value?.length && data.value.length > 0) {
    overdueItems.value = filterOverdueTodos(data.value);
  }
});
</script>
