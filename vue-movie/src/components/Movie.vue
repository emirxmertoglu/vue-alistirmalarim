<template>
  <div class="card">
    <router-link :to="movieDetailsPath">
      <img class="card-img-top" :src="posterPath" :alt="movie.original_title" />
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ movie.title }}</h5>
      <p class="card-text">{{ movie.overview | truncateText }}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">{{ movie.vote_average.toFixed(1) }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posterPath() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
    movieDetailsPath() {
      return `/movie/${this.movie.id}`;
    },
  },
  filters: {
    truncateText(text) {
      return text.slice(0, 497) + "...";
    },
  },
};
</script>

<style>
.card {
  min-width: 250px;
  margin-bottom: 30px;
}

.card img {
  width: 100%;
  min-height: 516px;
  max-height: 516px;
}

.card-body {
  flex: 1;
  padding: 15px;
}
</style>