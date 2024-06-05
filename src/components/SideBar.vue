<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="mobile ? true : false"
    :permanent="!mobile ? true : false"
    :expand-on-hover="!mobile ? true : false"
    :rail="!mobile ? rail : false"
    variant="elevated"
    :theme="darkMode ? 'light' : 'dark'"
  >
    <v-list-item class="pa-3">
      <template v-slot:prepend>
        <div class="d-flex align-center ga-6">
          <v-icon size="x-large" icon="mdi-clover"></v-icon>
          <div class="text-center font-weight-bold text-subtitle-1">TOVUE</div>
        </div>
      </template>
      <template v-slot:append>
        <v-btn
          v-if="!mobile"
          @click.stop="rail = !rail"
          :icon="rail ? 'mdi-lock-open' : 'mdi-lock'"
          variant="text"
        />
      </template>
    </v-list-item>

    <v-divider :thickness="1" />

    <v-list class="mt-2" nav>
      <v-list-item v-for="item in navItems" v-bind="item" :key="item.title" />
    </v-list>

    <template v-slot:append>
      <v-list-item
        :title="darkMode ? 'Dark Mode' : 'Light Mode'"
        class="py-4 px-1.5"
        nav
      >
        <template v-slot:prepend>
          <v-btn
            class="mr-4"
            @click.stop="toggleTheme"
            :icon="darkMode ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'"
            variant="tonal"
            size="small"
          />
        </template>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, defineProps, watch, watchEffect } from "vue";
import { useTheme, useDisplay } from "vuetify";
import { navItems } from "../assets/nav-assets/nav-assets";

const props = defineProps(["openBar"]);
const { mobile } = useDisplay();
const { global } = useTheme();

const drawer = ref(true);
const rail = ref(true);
const darkMode = ref(global.name.value === "dark");

function toggleTheme() {
  global.name.value = global.name.value === "dark" ? "light" : "dark";
  darkMode.value = global.name.value === "dark";
  localStorage.setItem("theme", global.name.value);
}

watch(
  () => props.openBar,
  () => {
    drawer.value = !drawer.value;
  }
);

watchEffect(() => {
  console.log(mobile.value);
  if (mobile.value) {
    drawer.value = false;
  } else {
    drawer.value = true;
  }
});
</script>

<style scoped>
.halo {
  z-index: 100;
}
</style>
