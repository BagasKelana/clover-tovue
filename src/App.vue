<template>
  <v-app>
    <v-main>
      <router-view />
      <v-btn
        class="floating-btn"
        color="primary"
        icon="mdi-plus"
        large
        href="/add"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
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

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
  width: 56px;
  height: 56px;
}

@media (max-width: 600px) {
  .floating-btn {
    bottom: 8px;
    right: 8px;
    width: 48px;
    height: 48px;
  }
}
</style>
