<template>
  <div>
    <h1 class="text-display-1 pa-4">All Task</h1>
    <div class="mx-4 mt-4 mb-10 d-flex flex-column">
      <v-text-field
        placeholder="Search task here..."
        v-model="searchTodo"
        rounded
        variant="outlined"
      >
        <v-icon class="mr-2" icon="mdi-magnify"></v-icon
      ></v-text-field>

      <div class="d-flex ga-4 justify-space-between align-center">
        <v-chip-group v-model="filterTodo">
          <v-chip
            :size="mobile ? 'small' : 'default'"
            v-for="category in todoCategories"
            :value="category.value"
            :key="category.value"
            :text="category.value"
            :prepend-icon="category.icon"
            :color="category.color"
            variant="elevated"
          ></v-chip>
        </v-chip-group>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              :size="mobile ? 'small' : 'default'"
              rounded
              color="primary"
              variant="flat"
              v-bind="props"
            >
              Sort By
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="sortTodo = item.title"
              v-for="item in sortItems"
              :key="item.title"
              :active="
                item.title === sortTodo ||
                (item.title === 'Default' && sortTodo === '')
                  ? true
                  : false
              "
              color="primary"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>

  <template v-if="errorMessage">
    <div class="mx-4">{{ errorMessage }}</div>
  </template>
  <template v-else-if="searchFilterItems?.length">
    <TodoCard v-for="itam in searchFilterItems" v-bind="itam" :key="itam.id" />
  </template>
  <template v-else>
    <div
      class="d-flex flex-column justify-center align-center text-center mx-4"
      v-if="!items?.length"
    >
      <h2>You don't have any tasks yet</h2>
      <p>Click on the + button to add one</p>

      <div>
        <v-img :width="400" src="/no-task.png"> </v-img>
      </div>
    </div>
    <TodoCard v-for="itam in items" v-bind="itam" :key="itam.id" />
  </template>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useTodoStore } from "../stores/useTodoStore";

const { mobile } = useDisplay();

import { todoCategories } from "../assets/input-todo-assets/input-todo-assets";
import { useDisplay } from "vuetify";
import { filterByCategory, searchBySlug, sortTodos } from "../helpers/helpers";
const { loadTodos, getTodos } = useTodoStore();

onMounted(() => {
  loadTodos();
  items.value = getTodos();
});

const sortItems = [{ title: "Default" }, { title: "Name" }, { title: "Date" }];

const items = ref(null);
const searchFilterItems = ref(null);

const searchTodo = ref("");
const filterTodo = ref("");
const sortTodo = ref("");
const errorMessage = ref(null);

watchEffect(() => {
  function searchFilterSort(data, searchQuery, categoryFilter, sortCriteria) {
    let result = data;

    if (searchQuery) {
      result = searchBySlug(result, searchQuery);
    }

    if (categoryFilter) {
      result = filterByCategory(result, categoryFilter);
    }

    if (sortCriteria) {
      result = sortTodos(result, sortCriteria);
    }

    if (result.length && result.length > 0) {
      return result;
    } else {
      throw new Error("No tasks found, Try searching with different keywords.");
    }
  }

  if (sortTodo.value === "Default") {
    sortTodo.value = "";
  }

  if (
    items.value?.length &&
    items.value?.length > 0 &&
    (searchTodo.value || filterTodo.value || sortTodo.value)
  ) {
    try {
      errorMessage.value = "";
      searchFilterItems.value = searchFilterSort(
        items.value,
        searchTodo.value,
        filterTodo.value,
        sortTodo.value
      );
    } catch (err) {
      console.log("[SEARCH_ERROR]", err.message);
      errorMessage.value =
        err.message || "Unpredicted error occurred, please reload the pages";
    }
  } else {
    searchFilterItems.value = searchFilterItems;
    errorMessage.value = null;
  }
});
</script>
