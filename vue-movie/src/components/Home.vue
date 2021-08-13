<template>
  <section>
    <app-header />
    <loader v-if="isLoading" />
    <section class="container py-5">
      <div class="card-deck" v-for="group in groupedMovies">
        <movie v-for="movie in group" :key="movie.id" :movie="movie" />
      </div>
    </section>
  </section>
</template>

<script>
import AppHeader from "./AppHeader.vue";
import Loader from "./Loader.vue";
import Movie from "./Movie.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { AppHeader, Loader, Movie },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["movies", "groupedMovies"]),
  },
  created() {
    this.$store.dispatch("fetchMovies").then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style>
</style>