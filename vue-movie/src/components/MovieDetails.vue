<template>
  <section>
    <loader v-if="isLoading" />
    <section v-if="hasDetails">
      <backdrop-image :imageName="movie.backdrop_path" />
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <poster :posterName="movie.poster_path" />
          </div>
          <div class="col-sm-8 details">
            <h2>{{ movie.title }}</h2>
            <h5>{{ movie.tagline }}</h5>
            <p>{{ movie.overview }}</p>
            <div>Süre: {{ runtime }}</div>
            <div>Ortalama Puanı: {{ movie.vote_average }}</div>
            <div>Yapımcı Şirket: {{ movie.production_companies[0].name }}</div>
            <div>Yayınlanma Tarihi: {{ movie.release_date }}</div>
            <h4 class="mb-3 mt-3">Oyuncular</h4>
            <img
              v-for="person in cast"
              :key="person.id"
              :src="castAvatar(person.profile_path)"
              :alt="person.name"
              class="cast-avatar"
            />
            <h4 class="mb-3 mt-3">Fragman</h4>
            <a :href="trailer.url" target="_blank" class="trailer-link">
              <div class="play-icon" />
              <img :src="trailer.thumbnail" class="thumbnail" />
            </a>
            <a href="#" class="btn btn-success ticket-button">Bilet Al</a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Loader from "./Loader.vue";
import BackdropImage from "./BackdropImage.vue";
import Poster from "./Poster.vue";

export default {
  data() {
    return {
      isLoading: true,
      hasDetails: false,
      cast: [],
      trailer: {
        thumbnail: "",
        url: "",
      },
    };
  },
  components: {
    Loader,
    BackdropImage,
    Poster,
  },
  created() {
    this.$store.dispatch("fetchMovieDetails", this.movieId).then(() => {
      this.isLoading = false;
      this.hasDetails = true;
    });

    fetch(
      `https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=4364b771abbf71498e946dd82ab39c67&language=tr-TR`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.cast = data.cast.slice(0, 5);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=4364b771abbf71498e946dd82ab39c67&language=tr-TR`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.trailer.thumbnail = `https://i.ytimg.com/vi/${data.results[0].key}/sddefault.jpg`;
        this.trailer.url = `https://youtube.com/watch?v=${data.results[0].key}`;
      });
  },
  methods: {
    castAvatar(path) {
      return `https://image.tmdb.org/t/p/w45${path}`;
    },
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    movie() {
      return this.$store.state.movieDetails[this.movieId];
    },
    runtime() {
      const { runtime } = this.movie;
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours} sa ${minutes} dk`;
    },
  },
};
</script>

<style>
.details {
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  color: #fff;
}

.details h5 {
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
}

.cast-avatar {
  width: 45px;
  height: 45px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 7px;
}

.thumbnail {
  width: 150px;
  height: 110px;
}
.trailer-link {
  width: 150px;
  height: 110px;
  display: inline-block;
  margin-right: 20px;
  position: relative;
}
.play-icon {
  background-image: url(http://f.acet.me/LXIk.png);
  background-size: 75px 75px;
  position: absolute;
  width: 75px;
  height: 75px;
  top: 18px;
  left: 36px;
}

.ticket-button {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>