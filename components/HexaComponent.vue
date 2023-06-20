<script setup lang="ts"></script>

<template>
  <div class="h-32vh w-full hexacon overflow-hidden">
    <div v-for="hexaRow of 5" class="inline-flex overflow-hidden ms--50px [&:nth-child(even)]:ms-1px not-first-of-type:mt--32px">
      <div v-for="hexagon of 26" class="bg-#111 h-110px m-1px w-100px transition-duration-2s hexagon relative hover:bg-[#0f0]" />
    </div>
  </div>
</template>

<style scoped>
.hexacon {
  animation: animate 4s linear infinite;
}
@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.hexagon:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.02);
}

.hexagon:hover {
  transition: 0s;
}
</style>
