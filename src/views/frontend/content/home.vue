<template>
  <div
    class="directional pb-2"
    style="border-bottom: 1px solid rgba(0, 0, 0, 0.2)"
  >
    {{ nameCategory }}
  </div>
  <a-list size="large" style="height: 75vh; overflow: auto">
    <a-list-item class="p-0" v-for="item in data" :key="item.id">
      <div class="row" style="width: 100%">
        <div
          class="col-8 d-flex align-items-center"
          style="justify-content: space-between"
        >
          <div
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 60%;
              padding-right: 24px;
              font-size: 20px;
            "
          >
            <CommentOutlined class="me-3" />
            <router-link
              :to="{
                name: 'forum',
                params: { slug: item.slug + '.' + item.id },
              }"
            >
              {{ item.name }}
            </router-link>
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <span> Chủ đề </span>
            <!-- Hiển thị thông tin chủ đề -->
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <span> Tin nhắn </span>
            <!-- Hiển thị thông tin tin nhắn -->
          </div>
        </div>
        <div class="col-4 d-flex align-items-center">
          <a-avatar size="large" class="me-3">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <div
            class="content"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            <div class="title">sssss</div>
            <div class="date">{{ item.date }}</div>
            <div class="art">Nguyễn thành chung</div>
          </div>
        </div>
      </div>
    </a-list-item>
  </a-list>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  CommentOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import { useMenuFront } from "../../../store/useMenuFront.js";
const route = useRoute();
const router = useRouter();

const nameCategory = ref([]);

const data = ref([]);
// Lấy dữ liệu theo danh mục
const firstItemId = ref(null);

// Hàm lấy item đầu tiên từ API
const getFirstItem = async () => {
  try {
    const response = await axios.get("home/forum-list");
    const items = response.data;
    if (items.length > 0) {
      const firstItem = items[0];
      firstItemId.value = firstItem.forum_group_id; // Lưu ID của item đầu tiên
      useMenuFront().onSelectedKeys(firstItemId.value.toString());
      getNameCategory(firstItemId.value);
    }
  } catch (error) {
    console.error(error);
  }
};
const getNameCategory = async (id) => {
  await axios
    .get(`forum-group/${id}`)
    .then((response) => {
      nameCategory.value = response.data.name;
      data.value = response.data.forums;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getImg = () => {
  axios
    .get("view-image")
    .then((response) => {
      // Xử lý dữ liệu từ API nếu cần
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(getFirstItem);

getImg();
</script>
