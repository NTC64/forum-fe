<template>
  <a-card title="Cập nhật tài khoản" style="width: 100%">
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
      <a-form-item
        :name="['user', 'age']"
        label="Age"
        :rules="[{ type: 'number', min: 0, max: 99 }]"
      >
        <a-input-number v-model:value="formState.user.age" />
      </a-form-item>
      <a-form-item :name="['user', 'website']" label="Website">
        <a-input v-model:value="formState.user.website" />
      </a-form-item>
      <a-form-item :name="['user', 'introduction']" label="Introduction">
        <a-textarea v-model:value="formState.user.introduction" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, reactive } from "vue";
// import {}
const route = useRoute();
const router = useRouter();
const urlApi = import.meta.env.VITE_URL_API;
const urlTest = import.meta.env.VITE_URL_TEST;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const users = ref([]);
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const formState = reactive({
  user: {
    name: "",
    age: undefined,
    email: "",
    website: "",
    introduction: "",
  },
});
const getUserEdit = (userId) => {
  axios
    .get("http://127.0.0.1:5173/user.json")
    .then((response) => {
      users.value = response.data.find((user) => user.id === userId);
      console.log(users.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

const userId = route.params.id;
getUserEdit(userId);

const onFinish = (values) => {
  console.log(formState);
  console.log("Success:", values);
};
</script>
