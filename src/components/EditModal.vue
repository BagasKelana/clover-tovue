<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-pencil-outline" title="Edit Form">
      <v-card-text>
        <template v-if="dialog && initId">
          <FormTodo :isEdit="true" :todoId="initId"
        /></template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { watchEffect, ref } from "vue";
import { useEditModal } from "../stores/useModal";
const { modal, getModal, getId, todoId } = useEditModal();

const dialog = ref(modal);
const initId = ref(todoId);

watchEffect(() => {
  dialog.value = getModal();
  if (!todoId) {
    initId.value = getId();
  }
});
</script>
