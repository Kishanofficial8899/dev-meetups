<template>
  <v-container class="mt-1">
    <v-layout row wrap v-if="loading">
      <div class="loader">
        <v-flex>
          <v-progress-circular value="true" :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        </v-flex>
      </div>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card style="padding:1rem">
          <v-card-text>
            <v-card-title>
              <h4 class="primary--text">{{ meetup.title }}</h4>
              <template v-if="isUserIsCreator">
                <v-spacer></v-spacer>
                <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
              </template>
            </v-card-title>
          </v-card-text>
          <v-img height="350px" :src="meetup.imageUrl"></v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <app-edit-meetup-date-dialog :meetup="meetup" v-if="isUserIsCreator"></app-edit-meetup-date-dialog>
            <app-edit-meetup-time-dialog :meetup="meetup" v-if="isUserIsCreator"></app-edit-meetup-time-dialog>
            <div class="mt-3">{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup-dialog
              :meetupid="meetup"
              v-if="isAuthenticated && !isUserIsCreator"
            ></app-register-meetup-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    isUserIsCreator() {
      if (!this.isAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    }
  }
};
</script>

<style scoped>
.loader {
  text-align: center !important;
  margin-top: 2rem;
}
</style>
