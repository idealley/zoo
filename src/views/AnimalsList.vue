<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-card>     
        <v-card-title
          primary-title
          class="title-wrapper"
        >
          <div class="title">
            {{ currentType.type | upperCaseFirstLetter }}{{currentType.plural ? currentType.plural : 's'}}
          </div>
        </v-card-title>
        <v-card-text/>
        <v-list two-line subheader>
          <template v-for="(item, index) in filteredAnimals">
            <v-list-tile
              :key="item.name + index"
            >
              <v-list-tile-content>
                <v-tooltip bottom>
                  <v-list-tile-title slot="activator">
                    {{ item.name }}
                  </v-list-tile-title>
                  <span>Cry: {{ currentType.cry }} {{item.cry }}</span>
                </v-tooltip>
                <v-list-tile-sub-title>
                  Age: {{ item.age}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action @click="removeAnimal(item.name)">
                <v-icon color="error">delete</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
        <v-card-text>
          <add-animal />
        </v-card-text>
        <v-fab-transition>
          <v-btn
            color="pink"
            dark
            absolute
            bottom
            right
            fab
            @click="add"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-card-actions>
          <v-btn color="info" @click="back">Back to list</v-btn>
        </v-card-actions>
      </v-card>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AddAnimal from "./AddAnimal.vue";
export default {
  name: "animals-list",
  components: { AddAnimal },
  filters: {
    upperCase(value) {
      return typeof value === "string" ? value.toUpperCase() : value;
    },

    upperCaseFirstLetter(value) {
      return typeof value === "string"
        ? value.replace(/^\w/, c => c.toUpperCase())
        : value;
    }
  },

  data() {
    return {
      slug: "",
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 2) || "Name must be at least 2 characters"
      ],
      age: null,
      ageRules: [
        v => !!v || "Age is required",
        v => !isNaN(parseInt(v)) || "Age must be a number"
      ]
    };
  },

  computed: {
    ...mapGetters(["filteredAnimals"]),
    ...mapState(["currentType", "showForm", "types"])
  },

  created() {
    this.slug = this.$router.history.current.params.slug;
    this.checkPath();
  },

  methods: {
    ...mapActions([
      "setCurrentType",
      "setShowForm",
      "addAnimal",
      "deleteAnimal"
    ]),

    add() {
      this.setShowForm(true);
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.addAnimal({
          age: this.age,
          name: this.name,
          typeRef: this.currentType
        });
        this.setShowForm(false);
        this.$refs.form.reset();
      }
    },

    back() {
      this.$router.push({ name: "home" });
    },

    removeAnimal(v) {
      this.deleteAnimal(v);
    },

    checkPath() {
      if (!this.currentType.type) {
        const type = this.types.filter(i => {
          return i.type === this.slug;
        })[0];
        this.setCurrentType(type);
      }
    }
  }
};
</script>

<style scoped>
.v-list__tile__action:hover {
  cursor: pointer;
}
</style>
