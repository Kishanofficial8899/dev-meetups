<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" scrollable max-width="350px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" fab dark v-on="on">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Edit Meetup</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;" class="mt-4">
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  label="Title"
                  id="title"
                  v-model="editedTitle"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-textarea
                  name="description"
                  label="Description"
                  id="description"
                  v-model="editedDescription"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="onSaveChanges"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['meetup'],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === '' ||
        this.editedDescription.trim() === ''
      ) {
        return false;
      }
      this.dialog = false;
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
    },
  },
};
</script>

<style scoped></style>
