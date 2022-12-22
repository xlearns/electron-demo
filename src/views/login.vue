<template>
  <div class="login">
    <div class="title">
      <div class="drag"></div>
      <el-link :underline="false" :icon="Close" @click="exit"></el-link>
    </div>
    <div class="body" style="-webkit-app-region: no-drag">
      <div class="logo" style="text-align: center; margin-top: 15px">
        <transition name="fade">
          <img
            src="../assets/logo.png"
            width="60"
            height="60"
            v-show="showLogo"
          />
        </transition>
      </div>
      <!-- <transition name="fade"> -->
      <div v-show="showForm">
        <div style="margin-top: 30px">
          <el-input v-model="user.name" placeholder="请输入账号"></el-input>
          <el-input
            v-model="user.password"
            placeholder="请输入密码"
            type="password"
            style="margin-top: 5px"
          ></el-input>
          <el-checkbox v-model="remember">下次直接登录</el-checkbox>
          <el-button type="primary" class="submit" size="mini" @click="login"
            >登 录</el-button
          >
        </div>
        <div class="option">
          <el-button type="text" size="mini">注册账号</el-button>
          <el-button type="text" size="mini">忘记密码</el-button>
          <el-button type="text" size="mini">扫码登录</el-button>
        </div>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { trayInit } from "../main/tray";
import { ipcRenderer } from "electron";
import { getlogin } from "../api/api";
import { Close } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const remember = ref<Boolean>(false);
const showLogo = ref<Boolean>(false);
const showForm = ref<Boolean>(false);
const user = reactive({
  name: "15666666666",
  password: "147258",
});

onMounted(() => {
  showLogo.value = true;
  setTimeout(() => {
    showForm.value = true;
  }, 100);
});

const exit = () => {
  ipcRenderer.send("display", false);
  // Electron.remote.app.quit()
  // Electron.ipcRenderer.send('close')
  // Electron.remote.getCurrentWindow().hide()
};

const login = async () => {
  // const res: any = await getlogin(user);
  // console.log(res, 96666);
  // sessionStorage.setItem("uuid", res.id);
  //登录成功之后需要通知主线程修改窗口大小，并且跳转到相应页面
  router.push("/list");
  ipcRenderer.send("changWindowSize", "登录成功");
};
</script>

<style scoped lang="scss">
// @import '@/assets/style/theme';
.login {
  height: 100%;

  // width: 300px;
  // max-width: 300px;
  // min-width: 300px;
  overflow: hidden;
}
.ft {
  position: fixed;
  top: 250px;
  left: 45px;
  font-size: large;
  color: #7f7f7f;
  text-align: center;
}
.body {
  display: inline-block;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  // min-width: 210px;
  height: 100%;
  user-select: none;
  // background-color: @grayBgc;
  .el-checkbox__label {
    font-size: 12px;
  }
  .el-checkbox {
    font-size: small;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    // color: @primary;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    // color: @primary;
    // background-color: @primary;
    // border-color: @primary;
  }
  .el-button.submit {
    background-color: #24db5a;
    border-color: unset;
    height: 35px;
    &:hover {
      // background-color: @primary;
      // border-color: @primary;
    }

    margin-top: 5px;
    width: 100%;
  }

  .option {
    text-align: center;

    .el-button--text {
      color: #07c160;
    }
  }

  .el-input {
    margin: 0 0 10px;

    .el-input__inner {
      outline: none;
      height: 30px;
      border: none;
      border-bottom: 1px solid#07c160;
      border-radius: 0;
    }
  }

  .el-button {
    height: 45px;
  }
}

.title {
  position: relative;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  cursor: pointer;
  .drag {
    width: calc(100% - 40px);
    height: 40px;
    -webkit-app-region: drag;
  }
  .el-link {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 18px;
    height: 18px;
    font-size: 18px;
    i.el-icon {
      width: 100%;
      height: 100%;
    }
  }

  i:hover {
    color: #07c160;
  }
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  // border-color: @primary !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
