<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex class="loader">
        <v-progress-circular value="true" :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 sm10 md8 offset-sm-1 offset-md-2>
        <v-card class="info mb-2" v-for="meetup in meetups" :key="meetup.id">
          <v-container>
            <v-layout>
              <v-flex xs5 sm3 md3 l3>
                <v-img height="150px" :src="meetup.imageUrl"></v-img>
              </v-flex>

              <v-flex xs7 sm9 md9 lg9 class="ml-5">
                <v-card-title class="primary-title">
                  <div>
                    <h4 style="color:#fff" mb-0>{{ meetup.title }}</h4>
                    <div>{{ meetup.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn elevation="0" color="primary" :to="'/meetups/' + meetup.id">
                    <v-icon>mdi-eye</v-icon>View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
