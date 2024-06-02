<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useTheme } from "vuetify";
const { global } = useTheme();

onMounted(() => {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    global.name.value = savedTheme;
  }
});
</script>
