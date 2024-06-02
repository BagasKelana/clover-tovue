<template>
  <v-card
    theme="dark"
    class="ma-4"
    rounded="lg"
    variant="tonal"
    :color="isDone ? '#00E676' : props.color"
  >
    <v-card-item>
      <v-card-title class="text-body-2 d-flex align-center">
        <v-icon icon="mdi-calendar" start></v-icon>

        <span class="text-medium-emphasis font-weight-bold">
          {{ props.date }} - {{ props.time }}
        </span>

        <v-spacer></v-spacer>
        <!--  -->
        <v-icon
          v-show="props.important"
          size="large"
          icon="mdi-star-check"
        ></v-icon>
      </v-card-title>
      <!-- title -->
      <div class="py-2">
        <div class="text-h6">{{ props.title }}</div>
        <!-- description -->
        <div class="font-weight-light text-medium-emphasis">
          {{ props.description }}
        </div>
      </div>
    </v-card-item>

    <v-divider></v-divider>

    <div class="pa-4 d-flex align-center">
      <!-- category or place iteration -->

      <v-chip-group>
        <v-chip
          variant="tonal"
          v-for="{ id, category_name, color, icon } in props.place"
          :prepend-icon="icon"
          :color="color"
          :key="id"
        >
          {{ category_name }}
        </v-chip>
      </v-chip-group>

      <v-spacer></v-spacer>
      <!-- menu toggle (edit, delete, etc) -->
      <v-btn icon="mdi-dots-horizontal" variant="text"></v-btn>
      <!-- done btn -->
      <v-btn class="text-none" prepend-icon="mdi-check" variant="text" border>
        Done
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

import { defineProps } from "vue";

// Define the props with validation
const props = defineProps({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: String, default: "" },
  time: { type: String, default: "" },
  place: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every(
        (item) =>
          typeof item.id === "string" &&
          typeof item.category_name === "string" &&
          ["home", "work", "personal", "health/fitness", "education"].includes(
            item.category_name
          ) &&
          typeof item.icon === "string" &&
          typeof item.color === "string"
      );
    },
  },
  color: { type: String, default: "" },
  isDone: { type: Boolean, default: false },
  isOverdue: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped></style>
