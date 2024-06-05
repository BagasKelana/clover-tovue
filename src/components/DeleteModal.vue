<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card
      prepend-icon="mdi-alert"
      text="This todo will be permanently removed from your list and cannot be recovered"
      title="Are you sure you want to delete this todo?"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="handleCloseModal"> Back </v-btn>

        <v-btn @click="handleAcceptAction"> Delete Todo </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { watchEffect, ref } from "vue";
import { useDeleteModal } from "../stores/useModal";
const { closeModal, acceptActionModal, modal, getModal } = useDeleteModal();

const dialog = ref(modal);

watchEffect(() => {
  dialog.value = getModal();
});

const handleCloseModal = () => {
  closeModal();
};

const handleAcceptAction = () => {
  acceptActionModal();
};

console.log(modal);
</script>
