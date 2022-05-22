<template>
  <div class="box">
    <div class="popup">
      <div class="title">游戏结束</div>
      <div class="content">分数: {{ route.params.state }}</div>
      <div class="details">
        <p>
          {{ SONG_TEXT }}
        </p>
      </div>
      <div class="btn-box">
        <KButton @click="retry()" :text="'再试一次'"></KButton>
      </div>
    </div>
  </div>
  <audio :autoplay="true" :loop="true" id="audios" ref="audios">
    <source :src="music" type="audio/mp3" />
  </audio>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import KButton from "@/component/KButton";

import { audioAutoPlay } from "@/utils/audio-auto-play";
import { SONG_ACCOMPANY, SONG_TEXT } from "@/config";
const music = ref(SONG_ACCOMPANY);
const audios = ref();
const route = useRoute();
const router = useRouter();

const retry = () => {
  setTimeout(() => {
    router.push("/game");
  }, 1000);
};

onMounted(() => {
  audioAutoPlay(audios);
});
</script>

<style scoped lang="less">
.box {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/game-over-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  overflow: hidden;

  .popup {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 85vw;
    height: 75vh;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1em;
    margin: 2em;
    text-align: center;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    .btn-box {
      padding: 20rem auto 0;
    }
    .title {
      font-size: 2rem;
      margin: 0.5rem;
    }
    .content {
      font-size: 1.5rem;

      margin: 1rem;
    }
    .details {
      height: 45vh;
      overflow: hidden;
      overflow-y: scroll;
      font-size: 0.8rem;
      text-indent: 2em;
      text-align: left;
      color: #666;
      line-height: 1.5em;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      margin: 1rem;
    }
  }
}
</style>
