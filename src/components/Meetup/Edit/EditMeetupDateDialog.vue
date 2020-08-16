<template>
  <v-dialog
    v-model="showPicker"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on" style="margin-left:1rem " class="mt-1">
        <h4>Edit Date</h4>
      </v-btn>
    </template>
    <v-date-picker v-model="selectedDate">
      <template>
        <v-btn class="blue--text darken-1" text @click.native="showPicker = false">Close</v-btn>
        <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
      </template>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      showPicker: false,
      selectedDate: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.selectedDate).getUTCDate();
      const newMonth = new Date(this.selectedDate).getUTCMonth();
      const newYear = new Date(this.selectedDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
    }
  }
};
</script>

<style></style>
