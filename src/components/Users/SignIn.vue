<template>
  <v-container>
    <v-layout class="mt-10">
      <v-flex sm6 offset-sm3>
        <v-card>
          <v-layout v-if="error">
            <v-flex xs12 offse-sm3>
              <app-alert @dismissed="onDismissed" style="width:100%" :text="error.message"></app-alert>
            </v-flex>
          </v-layout>
          <v-card-text>
            <v-container>
              <form @submit.prevent="OnSingIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!-- password -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row class="mt-3">
                  <v-flex>
                    <v-btn type="submit" color="primary" :disabled="loading">
                      Sign-IN
                      <span v-if="loading">
                        <v-progress-circular indeterminate color="green"></v-progress-circular>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    OnSingIn() {
      this.$store.dispatch("onUserSignIn", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
