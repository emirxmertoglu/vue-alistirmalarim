<template>
  <div id="app">
    <search @SearchRequested="handleSearch"></search>
    <p v-if="isLoading">Gifs are loading...</p>
    <preview :gifs="gifs"></preview>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Preview from "./components/Preview.vue";

export default {
  name: "app",
  components: { Search, Preview },
  data() {
    return {
      gifs: [],
      isLoading: true,
    };
  },
  methods: {
    doQuery(url) {
      this.gifs = [];
      this.isLoading = true;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.gifs = res.data;
          this.isLoading = false;
        });
    },
    handleSearch(query) {
      const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=jNUCaJ81jvWFaRRb3R614mzwVKz3OGSU&q=${query}&limit=25&rating=r`;
      this.doQuery(searchUrl);
    },
  },
  created() {
    const trendingUrl =
      "https://api.giphy.com/v1/gifs/trending?api_key=jNUCaJ81jvWFaRRb3R614mzwVKz3OGSU&limit=25&rating=r";
    this.doQuery(trendingUrl);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  font-size: 20px;
  color: crimson;
}
</style>
