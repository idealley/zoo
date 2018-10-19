<template>
  <v-form v-if="showForm" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="15"
      label="Name"
      required
    />
    <v-text-field
      v-model="age"
      :rules="ageRules"
      label="Age"
      required
    />
    <v-text-field
      v-model="cry"
      :rules="cryRules"
      label="Specific cry"
      required
    />

    <v-btn
      color="success"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn
      flat
      @click="cancel"
    >
      cancel
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "add-animal",

  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 2) || "Name must be at least 2 characters",
        v => (v && v.length <= 15) || "Name must be at most 15 characters"
      ],
      age: null,
      ageRules: [
        v => !!v || "Age is required",
        v => !isNaN(parseInt(v)) || "Age must be a number"
      ],
      cry: "",
      cryRules: [
        v => !!v || "Specific cry is required",
        v => (v && v.length >= 5) || "The cry must be at least 5 characters"
      ]
    };
  },

  computed: {
    ...mapState(["currentType", "showForm"])
  },

  methods: {
    ...mapActions(["setShowForm", "addAnimal"]),

    submit() {
      if (this.$refs.form.validate()) {
        this.addAnimal({
          age: this.age,
          name: this.name,
          cry: this.cry,
          typeRef: this.currentType.type
        });
        this.setShowForm(false);
        this.$refs.form.reset();
      }
    },

    cancel() {
      this.setShowForm(false);
      this.$refs.form.reset();
    }
  }
};
</script>
