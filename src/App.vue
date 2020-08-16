<template>
  <v-app>
    <div>
      <v-navigation-drawer v-model="sideNav" absolute left temporary>
        <v-list>
          <v-list-item link v-for="(item, index) in menuItems" :key="index" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark class="primary">
        <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor:pointer" exact>DevMeetup</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="(item, index) in menuItems" :key="index" :to="item.link" exact>
            <v-icon class="hidden-xs-only" left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn text @click="onLogOut" v-if="userAuthenticated">
            <v-icon class="hidden-xs-only" left>mdi-logout</v-icon>Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    sideNav: false
  }),
  computed: {
    menuItems() {
      let menuItems = [
        {
          icon: "mdi-face",
          title: "Sign Up",
          link: "singup"
        },

        {
          icon: "mdi-lock-open",
          title: "Sign In",
          link: "/signin"
        }
      ];
      if (this.userAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-multiple",
            title: "View Meetups",
            link: "/meetups"
          },
          {
            icon: "mdi-map-marker",
            title: "Oraganizing Meetup",
            link: "/meetup/new"
          }
          // {
          //   icon: "mdi-face-profile",
          //   title: "Profile",
          //   link: "/profile"
          // }
        ];
      }
      return menuItems;
    },
    userAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogOut() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
.v-progress-circular {
  margin: 0px 1rem;
}
.loader {
  text-align: center;
}
</style>
