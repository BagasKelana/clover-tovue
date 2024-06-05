<template>
  <v-card
    class="ma-4"
    rounded="lg"
    :variant="isDone ? 'elevated' : 'tonal'"
    :color="colorPallet"
  >
    <v-card-item>
      <v-card-title class="text-body-2 d-flex align-center">
        <v-icon icon="mdi-calendar" start></v-icon>

        <span class="font-weight-bold">
          {{ formatDate }} - {{ time }}
          {{ isDone ? "(Done)" : isOverdue ? "(Overdue Todo)" : "" }}
        </span>

        <v-spacer></v-spacer>

        <v-icon
          v-show="!!props.important"
          size="large"
          icon="mdi-star-check"
        ></v-icon>
      </v-card-title>

      <div class="py-2">
        <div class="text-h6">{{ props.title }}</div>

        <div class="font-weight-light">
          {{ props.description }}
        </div>
      </div>
    </v-card-item>

    <v-divider></v-divider>

    <div class="pa-4 d-flex align-center">
      <div>
        <v-chip
          class="ma-1"
          size="small"
          variant="flat"
          v-for="{ value, color, icon } in props.categories"
          :prepend-icon="icon"
          :color="color"
          :key="value"
        >
          {{ value }}
        </v-chip>
      </div>

      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props: menu }">
          <v-tooltip location="top center">
            <template v-slot:activator="{ props: tooltip }">
              <v-btn
                rounded
                icon="mdi-dots-horizontal"
                variant="text"
                v-bind="mergeProps(menu, tooltip)"
              >
              </v-btn>
            </template>
            <span>Action</span>
          </v-tooltip>
        </template>

        <v-list>
          <v-list-item
            class="text-subtitle-6"
            v-for="item in items"
            :key="item.text"
            :value="item"
            @click="item.action"
          >
            <template v-slot:prepend>
              <v-icon size="small" :icon="item.icon"></v-icon>
            </template>

            <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-card>
</template>

<script setup>
import { useDeleteModal, useEditModal } from "../stores/useModal";
import { useTodoStore } from "../stores/useTodoStore";
import { computed, mergeProps, onMounted, ref, watchEffect } from "vue";

const props = defineProps([
  "id",
  "slug",
  "title",
  "description",
  "date",
  "time",
  "categories",
  "color",
  "isDone",
  "isOverdue",
  "important",
]);

const { openModal } = useDeleteModal();
const { openModal: openEditModal } = useEditModal();
const { setIsDone, markImportantTodo } = useTodoStore();

onMounted(() => {
  let date = new Date(props.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  formatDate.value = date.toLocaleDateString("en-US", options);
});

const formatDate = ref("");

watchEffect(() => {
  let date = new Date(props.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  formatDate.value = date.toLocaleDateString("en-US", options);
});

const colorPallet = computed(() => {
  return props.isDone
    ? "#43A047"
    : props.isOverdue
    ? "#E53935"
    : props.important
    ? "primary"
    : "";
});

const handleDoneAction = () => {
  setIsDone(props.id);
};
const handleImportantAction = () => {
  markImportantTodo(props.id);
};
const handleEditAction = () => {
  openEditModal(props.id);
};
const handleDeleteAction = () => {
  openModal(props.id);
};

const items = computed(() => {
  const value = [
    {
      text: !props.isDone ? "Done" : "Undone",
      icon: !props.isDone ? "mdi-check" : "mdi-close",
      action: handleDoneAction,
    },
    { text: "Important", icon: "mdi-star", action: handleImportantAction },
    { text: "Edit", icon: "mdi-pencil-outline", action: handleEditAction },
    { text: "Delete", icon: "mdi-delete-forever", action: handleDeleteAction },
  ];
  return value;
});
</script>

<style lang="scss" scoped></style>
