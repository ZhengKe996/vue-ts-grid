<template>
  <div class="box">
    <el-row>
      <el-col :span="24">
        <img class="logo" :src="logo" alt="" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="title" data-attr="快来拼一拼">快来踩一踩</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="buttons" @click="go()">
        <KButton :text="'开始游戏'"></KButton>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElRow, ElCol, ElMessage } from "element-plus";
import KButton from "@/component/KButton";
import { logo } from "@/config";

const router = useRouter();
onMounted(() => {
  ElMessage({
    message: "前方会播放音乐 请控制好设备音量",
    center: true,
    type: "warning",
    duration: 5000,
  });
});
const go = () => {
  setTimeout(() => {
    router.push("/game");
  }, 1000);
};
</script>
<style scoped lang="less">
.box {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/main-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  overflow: hidden;

  .logo {
    width: 10rem;
    height: 3rem;
    padding: 1rem;
    position: fixed;
    top: 0;
    right: 0;
  }

  .title {
    text-align: center;
    font: bold 3em Consolas, Monaco, monospace;
    border-right: 0.1em solid;
    width: 75vw;
    margin: 2em 1em;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3s steps(26, end),
      cursor-blink 0.3s step-end infinite alternate;
  }
  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes cursor-blink {
    50% {
      border-color: transparent;
    }
  }
}
.buttons {
  margin: 10rem auto 0;
}
</style>
