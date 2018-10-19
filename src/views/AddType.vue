<template>
  <v-form v-if="showTypeForm" ref="typeform" v-model="valid" lazy-validation>
    <v-text-field
      v-model="type"
      :rules="typeRules"
      :counter="10"
      label="Type Name"
      required
    />
    <v-text-field
      v-model="diet"
      :rules="dietRules"
      label="Diet"
      required
    />

    <v-text-field
      v-model="cry"
      :rules="cryRules"
      label="Cry"
      required
    />

    <v-text-field
      v-model="ability"
      :rules="abilityRules"
      label="Ability"
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
  name: "add-type",

  data() {
    return {
      valid: true,
      type: "",
      typeRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 2) || "Name must be at least 2 characters"
      ],
      diet: null,
      dietRules: [v => !!v || "the diet is required"],
      cry: "",
      cryRules: [
        v => !!v || "A cry is required",
        v => (v && v.length >= 5) || "The cry must be at least 5 characters"
      ],
      ability: "",
      abilityRules: [
        v => !!v || "An ability is required",
        v =>
          (v && v.length >= 3) || "The ability must be at least 3 characters",
        v =>
          this.types.filter(t => t.ability === v).length === 0 ||
          "The ability must be unique."
      ]
    };
  },

  computed: {
    ...mapState(["currentType", "showTypeForm", "types"])
  },

  methods: {
    ...mapActions(["setCurrentType", "setShowTypeForm", "addType"]),

    submit() {
      if (this.$refs.typeform.validate()) {
        this.addType({
          diet: this.diet,
          type: this.type,
          cry: this.cry,
          ability: this.ability
        });
        this.setShowTypeForm(false);
        this.$refs.typeform.reset();
      }
    },

    cancel() {
      this.setShowTypeForm(false);
      this.$refs.typeform.reset();
    }
  }
};
</script>
