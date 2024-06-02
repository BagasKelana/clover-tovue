<template>
  <v-app>
    <v-navigation-drawer
    
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      variant="elevated"
      theme="dark"
    >
      <v-list-item class="pa-3" nav>
        <template v-slot:prepend>
          <div class="d-flex align-center ga-6">
            <v-icon size="x-large" icon="mdi-clover"></v-icon>
            <div class="text-center font-weight-bold text-subtitle-1">
              TOVUE
            </div>
          </div>
        </template>
        <template v-slot:append>
          <v-btn
            @click.stop="rail = !rail"
            icon="mdi-chevron-left"
            variant="text"
          />
        </template>
      </v-list-item>

      <v-divider :thickness="1"></v-divider>

      <v-list class="mt-2" nav>
        <v-list-item
          prepend-icon="mdi-format-list-bulleted"
          title="All Task"
          value="myfiles"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-star"
          title="Important"
          value="starred"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-calendar-today"
          title="Today"
          value="starred"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-calendar-alert"
          title="Overdue"
          value="shared"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item class="py-4 px-1.5" nav>
          <template v-slot:prepend>
            <v-btn
              class="mr-2"
              @click.stop="toggleTheme"
              :icon="
                darkMode ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'
              "
              variant="tonal"
              size="small"
            />
          </template>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const drawer = ref(true);
const rail = ref(false);

const { global } = useTheme();

console.log(global.name.value);
const darkMode = ref(global.name.value === "dark");

function toggleTheme() {
  global.name.value = global.name.value === "dark" ? "light" : "dark";
  darkMode.value = global.name.value === "dark";
  localStorage.setItem("theme", global.name.value);
}
</script>

<style scoped></style>
