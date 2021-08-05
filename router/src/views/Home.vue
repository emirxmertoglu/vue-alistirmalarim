<template>
  <div class="home">
    <div v-for="user in users" :key="user.id">
      <user-item :user="user"></user-item>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserItem from "@/components/UserItem.vue";

export default {
  name: "Home",
  components: {
    UserItem,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        this.users = users;
      });
  },
};
</script>
