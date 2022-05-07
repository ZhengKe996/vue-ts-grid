<template>
  <div id="main" ref="main">
    <div id="con" ref="con"></div>
  </div>
  <audio
    :src="music"
    controls
    :autoplay="true"
    :style="'display:none;'"
  ></audio>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { creatediv, creatcell } from "./scene";
import music from "@/assets/music/music.mp3";
const router = useRouter();

const clock = ref();
const state = ref(0);
const speed = ref(6);
const flag = ref(false);

const main = ref();
const con = ref();

const createrow = () => {
  const row = creatediv("row"); // 创建div className = row
  const arr = creatcell(); // 定义div cell的类名,其中一个为cell black
  con.value.appendChild(row); // 添加row为con的子节点

  for (let i = 0; i < 4; i++) {
    row.appendChild(creatediv(arr[i])); // 添加row的子节点 cell
  }

  if (con.value.firstChild == null) {
    con.value.appendChild(row);
  } else {
    con.value.insertBefore(row, con.value.firstChild);
  }
};

//让黑块动起来
function move() {
  let top = parseInt(window.getComputedStyle(con.value, null)["top"]);

  if (speed.value + top > 0) {
    top = 0;
  } else {
    top += speed.value;
  }
  con.value.style.top = top + "px"; // 不断移动top值，使它动起来
  over();
  if (top == 0) {
    createrow();
    con.value.style.top = "-102px";
    delrow();
  }
}

// 判断游戏是否结束
function over() {
  let rows = con.value.childNodes;
  if (rows.length == 5 && rows[rows.length - 1].pass !== 1) {
    fail();
  }
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].pass1 == 1) {
      fail();
    }
  }
}

function fail() {
  clearInterval(clock.value);
  flag.value = false;
  router.push({
    name: "game-over",
    params: { state: state.value },
  });
}

function delrow() {
  if (con.value.childNodes.length == 6) {
    con.value.removeChild(con.value.lastChild);
  }
}
const init = () => {
  createrow();

  main.value.onclick = function (e: MouseEvent) {
    e = e || event;
    judge(e);
  };

  // 定时器 每30毫秒调用一次 move()
  clock.value = window.setInterval(move, 30);
};

// 判断是否点击黑块、白块
function judge(e: MouseEvent) {
  const { className, parentNode } = e.target as HTMLButtonElement;

  if (className.indexOf("black") == -1 && className.indexOf("cell") !== -1) {
    // @ts-ignore
    parentNode!.pass1 = 1; // 定义属性pass，表示此行row的白块已经被点击
  }

  if (className.indexOf("black") !== -1) {
    //点击目标元素 类名中包含 black 说明是黑块
    // @ts-ignore
    e.target!.className = "cell";
    // @ts-ignore
    e.target!.parentNode.pass = 1; // 定义属性pass，表明此行row的黑块已经被点击
    score();
  }
}

// 记分
function score() {
  state.value++;
  if (state.value % 10 == 0) {
    //当分数是10 的倍数时使用加速函数，越来越快
    speedup();
  }
}

// 加速函数
function speedup() {
  speed.value += 2;
  if (speed.value == 20) {
    console.log("666");
  }
}

onMounted(() => {
  init();
});
</script>

<style lang="less">
#main {
  width: 408px;
  height: 408px;
  background: white;
  border: 2px solid gray;
  margin: 0 auto;
  overflow: hidden;
}

#con {
  width: 100%;
  height: 400px;
  position: relative;
  // top: -408px; /*隐藏所有格子*/
  border-collapse: collapse;
}
/* 行 */
.row {
  height: 100px;
  width: 100%;
  background-color: aqua;
  display: flex;
  justify-content: space-between;
}
/* 一个块 */
.cell {
  height: 100%;
  flex: 1;
  // width: 100px;
  display: inline-block;
  border: rgb(54, 74, 129) 1px solid;
}

.black {
  background: black;
}
</style>
