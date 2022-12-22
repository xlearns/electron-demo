<template>
  <div id="monitor">
    <div class="title drag"></div>
    hello world
  </div>
</template>

<script setup lang="ts">
import { getChatList } from "../api/api";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";

const router = useRouter();
const store = useStore();
</script>

<style lang="scss" scoped>
#monitor {
  width: 100%;
  height: 100%;
  .title {
    height: 40px;
    background: red;
  }
  .drag {
    -webkit-app-region: drag;
  }
}
</style>
