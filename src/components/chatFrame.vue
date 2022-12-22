<template>
  <div class="kuang">
    <div class="top">
      <div class="content">
        <ul ref="ul">
          <li v-for="(item, i) in messageList" :class="item.uuid === uuid ? 'right' : 'left'" :key="`item${i}`"
            :id="`liText${i}`">
            <span class="chatSpan">
              <img class="failSend" src="assets/icon/gantanhao.svg" alt=""
                v-show="item.uuid === uuid && item.failSend" />
              <span v-html="item.text"></span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="actionBar">
      <img class="emoji" src="../assets/icon/emoticon.svg" alt="" @click="emojiclick" />
      <emoji :emojiVisible="emojiVisible" @emojiVisibleClose="emojiVisibleClose"></emoji>
      <label for="openFile">
        <img class="file" src="../assets/icon/file.svg" alt="" />
      </label>
      <input id="openFile" type="file" style="display: none" />
      <img class="shot" src="../assets/icon/screenShot.svg" alt="" />
      <img class="video" src="../assets/icon/videoCall.svg" alt="" />
    </div>
    <chatInputVue :uuid="uuid" :clean="clean" @submit="submit" @textClean="textClean"></chatInputVue>
  </div>
</template>

<script setup lang="ts">
import chatInputVue from "../components/chatInput.vue";
import emoji from "../components/emoji.vue";
import { onMounted, ref, watch, nextTick } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useStore } from '../store/index'
// import { mapGetters, mapActions } from "vuex";

const store = useStore()
const emojiVisible: any = ref(false)
const otherId: any = ref('')
const textarea: any = ref('')
const messageList: any = ref([])
const socket: any = ref(null)
const scrollTop: any = ref(null)
const uuid: any = ref(null)
const liWidth: any = ref(null)
const clean: any = ref(false)

watch(() => store.getCleanMessage, (newVal) => {
  if (newVal) {
    messageList.value = [];
  }
})

watch(liWidth, (newVal) => {
  console.log(newVal);
})

onMounted(() => {
  uuid.value = sessionStorage.getItem("uuid");
})

onBeforeRouteUpdate((to, from, next) => {
  console.log(to);
  socket.value.close();
  // this.socket.send('连接关闭')
  console.log("连接关闭");
  otherId.value = to.params.id; //路由携带的不同参数
  init(); //在mounted调用的methods里的方法
  next();
})

const init = () => {
  socket.value = new WebSocket("ws://localhost:3010");
  // this.socket = new WebSocket('ws://188.131.164.41:3010')
  socket.value.addEventListener("open", (event: any) => {
    console.log("socket is open", event);
    socket.value.send(
      JSON.stringify({
        type: "login", // type：login表示登录 用于后端逻辑判断
        id: uuid.value,
        name: "",
        icon: "",
      })
    );
  });
  socket.value.addEventListener("message", async (event: any) => {
    await refresh(JSON.parse(event.data));
    nextTick(() => {
      const ulS = document.getElementsByTagName("ul")[0].scrollHeight;
      if (ulS > 307) {
        document.getElementsByClassName("content")[0].scrollTop = ulS;
      }
    });
  });
  window.onresize = () => {
    return (() => {
      const li = document.getElementsByTagName("ul")[0];
      liWidth.value = li.clientWidth - 40;
    })();
  };
}
init()

const submit = (value: any) => {
  console.log(socket.value);
  value.map(async (item: any) => {
    socket.value.send(JSON.stringify(item));
  });
}
const refresh = async (value: any) => {
  console.log(value);
  await show(value);
  messageList.value.push(value);
  clean.value = true;
}

const show = (value: any) => {
  console.log(value);
  let spanSty = [
    "display: inline-block;",
    "max-width: 94%;",
    // 'height: 100%;',
    "padding: 10px 12px;",
    "text-align: left;",
    "border-radius: 5px;",
    "box-shadow: 0 0 1px 1px rgb(238, 238, 238);",
    "word-wrap: break-word;",
    "word-break: normal;",
    "overflow: hidden;",
  ];
  let failSend = [
    "z-index: 10;",
    "position: absolute;",
    "left: 0;",
    "top: 0;",
    "bottom: 0;",
    "margin: auto;",
    "display: inline-block;",
    "height: 22px;",
    "width: 22px;",
    "border-radius: 11px;",
  ];
  if (value.uuid === uuid.value) {
    spanSty.push("background: #9eea6a;");
  } else {
    spanSty.push("background: #fff;");
  }
  if (value.nodeType === 3) {
    // if (value.failSend) {
    //   value.text = `<img
    //         class="failSend"
    //         src="${require('assets/icon/gantanhao.svg')}"
    //         alt=""
    //         style="${failSend.join().replaceAll(',', '')}"
    //       /><span style="${spanSty.join().replaceAll(',', '')}">${value.text}</span>`
    // } else {
    const str: any = spanSty.join()
    value.text = `<span style="${str.replaceAll(",", "")}">${value.text
      }</span>`;
    // }
  } else if (value.nodeType === 1) {
    if (value.failSend) {
      const failSendStr: any = spanSty.join()
      value.text = `<img
                class="failSend"
                src="../assets/icon/gantanhao.svg"
                alt=""
                style="${failSendStr.replaceAll(",", "")}"
              /><img src=${value.url} width="${value.style.width > 180 ? 180 : value.style.width
        }px;"></img>`;
    } else {
      value.text = `<img src=${value.url} width="${value.style.width > 180 ? 180 : value.style.width
        }px;"></img>`;
    }
  }
}

const textClean = (value: any) => {
  clean.value = value;
}

const emojiclick = async () => {
  emojiVisible.value = true;
}

// 保存焦点位置
const saveSelection = () => {
  console.log(window.getSelection());
  if (window.getSelection) {
    let sel: any = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    console.log(223333);
    return document.selection.createRange();
  }
  return null;
}

const emojiVisibleClose = (value: any) => {
  emojiVisible.value = value;
}
</script>

<style lang="scss" scoped>
.kuang {
  // margin: 0 auto;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // background: #ccc;
  .top {
    height: 70%;
    box-sizing: border-box;
    border-bottom: 1px solid #ececec;

    // background-color: rgb(248, 247, 245);
    .content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: #f5f5f5;

      &::-webkit-scrollbar {
        display: none;
      }

      ul {
        // display: inline-block;
        width: 100%;
        // height: 100%;
        min-height: 307px;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        padding: 0 20px;

        // background: #f5f5f5;
        li {
          // display: block;
          width: 100%;
          list-style: none;
          margin: 10px 0;
          border: none;

          // padding-left: 20px;
          // text-align: left;
          // span.spansty {
          //   display: inline-block;
          //   // width: 65%;
          //   max-width: 65%;
          //   height: 100%;
          //   padding: 10px 12px;
          //   text-align: left;
          //   background: #fff;
          //   border-radius: 5px;
          //   box-shadow: 0 0 1px 1px rgb(238, 238, 238);
          //   word-wrap: break-word;
          //   word-break: normal;
          //   overflow: hidden;
          // }
          &.left {
            text-align: left;
            // span.spansty {
            //   display: inline-block;
            //   // width: 65%;
            //   max-width: 65%;
            //   height: 100%;
            //   padding: 10px 12px;
            //   text-align: left;
            //   background: #fff;
            //   border-radius: 5px;
            //   box-shadow: 0 0 1px 1px rgb(238, 238, 238);
            //   word-wrap: break-word;
            //   word-break: normal;
            //   overflow: hidden;
            // }
          }

          &.right {
            padding-right: 20px;
            text-align: right;

            .chatSpan {
              display: inline-block;
              height: 100%;
              max-width: 65%;
              position: relative;
              padding-left: 25px;

              .failSend {
                z-index: 10;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                display: inline-block;
                height: 22px;
                width: 22px;
                border-radius: 11px;
              }

              span.chatContent {
                background: #9eea6a;
              }
            }
          }
        }
      }
    }
  }

  .actionBar {
    position: absolute;
    // background: red;
    width: 100%;
    height: 30px;

    // bottom: 128px;
    img {
      position: absolute;
      top: 5px;
      bottom: 0;
      margin: auto;
      width: 20px;
      height: 20px;
      cursor: pointer;
      user-select: none;

      &.video {
        right: 20px;
      }

      &.emoji {
        left: 25px;
      }

      &.file {
        left: 55px;
      }

      &.shot {
        left: 83px;
      }
    }

    ::v-deep.el-dialog {
      margin-left: 142px;
    }
  }
}
</style>