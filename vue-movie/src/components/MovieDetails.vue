<template></template>

<script>
export default {
  created() {
    const movieId = this.$route.params.id;
    console.log(movieId);
    this.$store.dispatch("fetchMovieDetails", movieId).then(() => {
      console.log("data fetched");
    });
  },
};
</script>

<style>
</style>