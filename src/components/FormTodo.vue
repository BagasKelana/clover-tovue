<template>
  <form @submit.prevent="submit">
    <v-text-field
      label="Title"
      variant="outlined"
      auto-grow
      shaped
      v-model="title.value.value"
      :counter="100"
      :error-messages="title.errorMessage.value"
    ></v-text-field>

    <v-textarea
      v-model="description.value.value"
      label="Description"
      row-height="25"
      rows="3"
      variant="outlined"
      auto-grow
      shaped
    ></v-textarea>

    <v-date-input
      v-model="date.value.value"
      :error-messages="date.errorMessage.value"
      label="Date"
      prepend-icon=""
      variant="outlined"
      auto-grow
      shaped
    ></v-date-input>

    <v-text-field
      v-model="time.value.value"
      :error-messages="time.errorMessage.value"
      :active="modal2"
      :focused="modal2"
      label="Time"
      readonly
      variant="outlined"
    >
      <v-dialog v-model="modal2" activator="parent" width="auto">
        <v-time-picker
          color="green-lighten-1"
          scrollable
          ampm-in-title
          v-if="modal2"
          v-model="time.value.value"
        ></v-time-picker>
      </v-dialog>
    </v-text-field>

    <div>
      <p class="text-subtitle-1 font-weight-light mb-2 opacity-80">
        Categories/Places <strong>*Max 3</strong>
      </p>
      <v-chip-group v-model="categories.value.value" column multiple :max="3">
        <v-chip
          v-for="{ value, color, icon } in todoCategories"
          :text="value"
          :prepend-icon="icon"
          :color="color"
          :key="value"
          variant="elevated"
          filter
        ></v-chip>
      </v-chip-group>
    </div>

    <v-checkbox
      v-model="important.value.value"
      label="Mark as important Task"
      type="checkbox"
      :value="true"
    ></v-checkbox>

    <div>
      <v-btn
        class="me-4"
        v-if="!(isEdit && todoId)"
        @click="handleReset"
        color="warning"
      >
        clear
      </v-btn>
      <v-btn class="me-4" v-else @click="handleCancel" color="warning">
        cancel
      </v-btn>

      <v-btn type="submit" color="success">
        {{ props.isEdit ? "apply changes" : "submit" }}
      </v-btn>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import { v4 as uuidv4 } from "uuid";

import { useTodoStore } from "@/stores/useTodoStore";
import {
  todoCategories,
  colorPallet,
} from "../assets/input-todo-assets/input-todo-assets";
import {
  getItemsFromArrIndex,
  randomValue,
  getDataByID,
  getIndexesFromData,
  convertTitleToSlug,
  initialCheckOverdueTodo,
} from "../helpers/helpers";
import { useEditModal } from "../stores/useModal";

const { getTodos, editTodo, addTodo } = useTodoStore();
const { closeModal } = useEditModal();

const props = defineProps(["isEdit", "todoId"]);

onMounted(() => {
  if (props?.isEdit && props?.todoId) {
    let data = getDataByID(getTodos(), props.todoId);

    initialData.value = {
      ...data,
      date: new Date(data.date),
      categories: getIndexesFromData(data.categories),
    };

    setValues({
      ...initialData.value,
    });
  }
});

const initialData = ref({
  title: "",
  description: "",
  time: "00:00",
  date: new Date(),
  categories: [],
  important: false,
});

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: {
    title(value) {
      if (value?.length >= 3) return true;
      return "title needs to be at least 3 characters.";
    },
  },
  initialValues: {
    title: initialData.value.title,
    description: initialData.value.description,
    time: initialData.value.time,
    categories: initialData.value.categories,
    important: initialData.value.important,
    date: initialData.value.date,
  },
});

const title = useField("title");
const description = useField("description");
const date = useField("date");
const time = useField("time");
const categories = useField("categories");
const important = useField("important");
const modal2 = ref(false);

const submit = handleSubmit((values) => {
  console.log(values.time, typeof values.time);
  if (props?.isEdit && props?.todoId) {
    const isOverdue = !!(
      values.date === initialData.value.date &&
      values.time === initialData.value.time
    );

    editTodo(props.todoId, {
      ...initialData.value,
      ...values,
      isOverdue: isOverdue ? values.isOverdue : initialCheckOverdueTodo(values),
      categories:
        values?.categories?.length && values?.categories?.length > 0
          ? getItemsFromArrIndex(todoCategories, values.categories)
          : values.categories,
    });
    closeModal();
    alert("success edit todo");
    return;
  }

  if (values?.categories?.length && values?.categories?.length > 0) {
    addTodo({
      id: uuidv4(),
      slug: convertTitleToSlug(values.title),
      ...values,
      categories: getItemsFromArrIndex(todoCategories, values.categories),
      color: colorPallet[randomValue(colorPallet.length)],
      isDone: false,
      isOverdue: initialCheckOverdueTodo(values),
    });
    alert("success add todo");
    return;
  }

  addTodo({
    id: uuidv4(),
    slug: convertTitleToSlug(values.title),
    ...values,
    color: colorPallet[randomValue(colorPallet.length)],
    isDone: false,
    isOverdue: initialCheckOverdueTodo(values),
  });

  alert("success add todo");
});

const handleCancel = () => {
  closeModal();
};
</script>

<style lang="scss" scoped></style>
