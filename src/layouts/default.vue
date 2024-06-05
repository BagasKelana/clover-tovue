<template>
  <v-card>
    <SideBar :openBar="openBar" />

    <v-layout>
      <v-main>
        <v-responsive
          class="fill-height mx-auto"
          min-height="100dvh"
          max-width="900"
        >
          <nav v-if="$vuetify.display.mobile" class="d-flex justify-end pa-4">
            <v-btn @click="handleOpenBar" size="small" icon="mdi-menu"></v-btn>
          </nav>
          <DeleteModal />
          <EditModal />
          <router-view />
        </v-responsive>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const openBar = ref(false);

const handleOpenBar = () => {
  openBar.value = !openBar.value;
};
</script>

<style scoped></style>
