<template>
  <div id="emojiDialog">
    <el-dialog
      title=""
      v-model="emoji"
      width="360px"
      :before-close="close"
      :modal="false"
      :show-close="false"
      class="emojiDialog"
      :append-to-body="false"
      top="22vh"
    >
      <el-card class="box-card">
        <div
          class="wwxface"
          :class="`wwxface${i}`"
          style="width: 38px; height: 38px"
          v-for="(item, i) in emojiList"
          :key="i"
          :title="item"
          @click="emojiClick(item, i)"
        ></div>
        <div class="bar"></div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../store/index";

const props = defineProps({
  emojiVisible: Boolean,
});
const emit = defineEmits(["emojiVisibleClose"]);
const store = useStore();
const emojiList: any = ref([]);
const emoji = computed(() => {
  return props.emojiVisible;
});

onMounted(() => {
  console.log(props.emojiVisible, 56666);
  let valueArr: any = [];
  let KeyArr: any = [];
  emojiList.value = KeyArr;
  console.log(valueArr, KeyArr);
});

const close = () => {
  emit("emojiVisibleClose", false);
};

const emojiClick = (item: any, i: any) => {
  store.setCurrentEmoji({
    value: item,
    id: i,
  });
  store.setIsDisplay(true);
  close();
};
</script>

<style lang="scss" scoped>
.el-card {
  box-shadow: unset;
  border: none;
  position: relative;
  padding-top: 20px;
  padding-bottom: 70px;
  box-sizing: border-box;
  border-radius: 10px;

  :deep(.el-card__body) {
    display: grid;
    grid-template-columns: repeat(7, 40px);
    grid-column-gap: 0;
    grid-row-gap: 0;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 15px 20px;
    height: 212px;
    box-sizing: border-box;
    overflow-y: scroll;

    .wwxface {
      border-radius: 5px;

      &:hover {
        background-color: rgb(240, 239, 239);
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 55px;
      border-top: 1px #f2f2f2 solid;
      border-radius: 0 0 10px 10px;
    }
  }
}
</style>
