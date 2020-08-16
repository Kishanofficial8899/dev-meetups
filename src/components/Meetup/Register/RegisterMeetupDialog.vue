<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="info lighten-1" v-if="userIdRegisted" @click="onUnregister">Unregister</v-btn>
        <v-btn color="primary lighten-1" dark v-on="on" v-else>Register</v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex>
              <v-card-title v-if="userIdRegisted">Unregister From Meetip??</v-card-title>
              <v-card-title v-else>Register for Meetup?</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout mt-1 info--text>
            <v-flex>You Can Always Change Your decision lator on.</v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">Close</v-btn>
          <v-btn color="success" text @click="onAgree">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["meetupid"],
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    userIdRegisted() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupid.id;
        }) >= 0
      );
    }
  },
  methods: {
    onUnregister() {
      console.log(this.meetupid.id);
      this.$store.dispatch("unregisterUserFromMeetup", this.meetupid.id);
    },
    onAgree() {
      this.$store.dispatch("registerUserForMeetup", this.meetupid.id);
    }
  }
};
</script>

<style>
</style>