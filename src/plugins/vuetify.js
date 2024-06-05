/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

//components
import { VDateInput } from "vuetify/labs/VDateInput";
import { VTimePicker } from "vuetify/labs/VTimePicker";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  components: {
    VTimePicker,
    VDateInput,
  },
});
