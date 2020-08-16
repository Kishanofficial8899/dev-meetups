<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 sm6 class="text-center">
        <v-btn to="/meetups" class="additional" elevation="1">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs6 sm6 class="text-center">
        <v-btn to="/meetup/new" class="additional" elevation="1">Oraganize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="loader" xs12>
        <v-progress-circular
          value="true"
          v-if="loading"
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex>
        <v-card style="padding:1rem">
          <v-carousel style="cursor:pointer">
            <v-carousel-item
              v-for="meetup in meetups"
              :key="meetup.id"
              :src="meetup.imageUrl"
              exact
              @click="onLoadMeetup(meetup.id)"
            >
              <div class="title">{{ meetup.title }}</div>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      <v-flex class="text-center">
        <h3>Join Our Awsome meetups!</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 45%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 1.5rem 1rem;
}
.loader {
  text-align: center;
  margin-top: 2rem;
}
</style>
