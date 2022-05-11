<template>
  <div>game over {{ route.params.state }}</div>
  <audio :autoplay="true" :loop="true" id="audios" ref="audios">
    <source :src="music" type="audio/mp3" />
  </audio>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { audioAutoPlay } from "@/utils/audio-auto-play";
import { SONG_ACCOMPANY } from "@/config";
const music = ref(SONG_ACCOMPANY);
const audios = ref();
const route = useRoute();
onMounted(() => {
  audioAutoPlay(audios);
});
</script>

<style scoped></style>
