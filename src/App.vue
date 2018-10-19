<template>
  <v-app :dark="dark">
    <v-btn flat @click="toggleStyle()">Toggle Style</v-btn>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      dark: false
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["getAnimals", "getTypes"]),

    fetchData() {
      this.getAnimals(), this.getTypes();
    },

    toggleStyle() {
      this.dark = !this.dark;
    }
  }
};
</script>
