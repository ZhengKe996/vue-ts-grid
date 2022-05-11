import type { Ref } from "vue";

export function audioAutoPlay(audio: Ref<any>) {
  const play = function () {
    // @ts-ignore
    audio.value.play();
    document.removeEventListener("touchstart", play, false);
  };

  // @ts-ignore
  audio.value.play();
  document.addEventListener(
    "WeixinJSBridgeReady",
    function () {
      play();
    },
    false
  );
  document.addEventListener(
    "YixinJSBridgeReady",
    function () {
      play();
    },
    false
  );
  document.addEventListener("touchstart", play, false);
}
