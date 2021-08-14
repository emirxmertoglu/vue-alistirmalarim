<template>
  <img :src="imagePath" class="backdrop-image" />
</template>

<script>
export default {
  props: {
    imageName: {
      type: String,
      required: true,
    },
  },
  computed: {
    imagePath() {
      return `https://image.tmdb.org/t/p/w1280${this.imageName}`;
    },
  },
};
</script>

<style>
.backdrop-image {
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(30px);
  transform: scale(1.1);
}
</style>