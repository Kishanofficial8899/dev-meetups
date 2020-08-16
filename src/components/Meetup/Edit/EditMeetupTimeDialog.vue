<template>
  <v-dialog
    v-model="showPicker"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }" style="margin:2rem">
      <v-btn color="primary" style="margin-left:1rem " class="mt-1" dark v-on="on">
        <h4>Edit Time</h4>
      </v-btn>
    </template>
    <v-time-picker v-model="editableTime" format="24hr">
      <template>
        <v-btn class="blue--text darken-1" text @click.native="showPicker = false">Close</v-btn>
        <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
      </template>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      showPicker: false,
      editableTime: null
    };
  },
  methods: {
    onSaveChanges() {
      let newDate = new Date(this.meetup.date);
      let hours = this.editableTime.match(/^(\d+)/)[1];
      let minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date);
  }
};
</script>

<style></style>
