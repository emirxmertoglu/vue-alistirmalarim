<template>
  <div>
    <router-link :to="profileLink">Back to user</router-link>
    <div v-for="post in posts" :key="post.id">
      <h4>{{ post.title }}</h4>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPosts",
  data() {
    return {
      posts: {},
    };
  },
  computed: {
    profileLink() {
      return `/user/${this.$route.params.userID}`;
    },
  },
  created() {
    fetch(
      `https://jsonplaceholder.typicode.com/users/${this.$route.params.userID}/posts`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.posts = data;
      });
  },
};
</script>

<style>
</style>