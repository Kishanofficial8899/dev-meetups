<template>
  <v-container>
    <v-layout row class="mt-8 text-center">
      <v-flex>
        <h1>Create a new Meetup</h1>
      </v-flex>
    </v-layout>
    <v-layout style="padding:1.5rem">
      <v-flex>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                label="Title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mb-3>
              <v-btn class="primary" @click="onPickFile">
                Choose File
                <v-icon right>mdi-file</v-icon>
              </v-btn>
              <input
                type="file"
                style="display:none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xdws12 sm6 offset-sm3>
              <img :src="imageUrl" height="250" />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                row="5px"
                v-model="description"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h3>Choose The a Date And Time</h3>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-3">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date" full-width></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker
                v-model="time"
                format="24hr"
                class="mt-2"
                full-width=""
              ></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row class="mt-5">
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" type="submit" :disabled="!formIsValid"
                >Create Meetup</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' && this.description !== '' && this.imageUrl !== ''
      );
    },
    submitDate() {
      const date = new Date(this.date);
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetup = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submitDate,
      };
      this.$store.dispatch('createMeetup', meetup);
      this.$router.push('/meetups');
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
};
</script>
