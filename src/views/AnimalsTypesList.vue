<template>
  <v-fade-transition hide-on-leave>
    <v-content>
      <v-container>
        <v-layout row>
          <v-flex xs12 sm6 md6 lg4 offset-sm3 offset-md3 offset-lg4>
            <v-card>
              <v-card-title
                primary-title
                class="title-wrapper"
              >
                <div style="width:100%;">{{ topheader }}</div>
                <div class="title">
                  {{ header }}
                </div>
              </v-card-title>
              <v-list two-line subheader>
                <template v-for="(item, index) in mapedAndCountedAnimals">
                  <v-list-tile
                    :key="item.type.type + index"
                  >

                    <v-list-tile-content @click="navigate(item.type)">
                      <v-tooltip bottom>
                        <v-list-tile-title slot="activator">
                          {{ item.type.type | upperCaseFirstLetter }}{{item.type.plural ? item.type.plural : 's'}}
                        </v-list-tile-title>
                        <span>{{ item.type.cry }}</span>
                      </v-tooltip>
                      <v-list-tile-sub-title>
                        Total: {{ item.count}}, Diet: {{item.type.diet}}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action @click="addAnimal(item.type)">
                      <v-icon>add_circle_outline</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
              <v-card-text>
                <add-animal />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  flat
                  @click="showAddType()"
                >
                  Add a new anymal type
                </v-btn>
              </v-card-actions>
              <v-card-text>
                <add-type/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-fade-transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddAnimal from "./AddAnimal.vue";
import AddType from "./AddType.vue";
export default {
  name: "animals-types-list",
  components: {
    AddAnimal,
    AddType
  },

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
      topheader: "What a Zoo!",
      header: "List of animals types"
    };
  },

  computed: {
    ...mapGetters(["mapedAndCountedAnimals"])
  },

  methods: {
    ...mapActions([
      "getAnimals",
      "getTypes",
      "setCurrentType",
      "setShowTypeForm",
      "setShowForm"
    ]),

    addAnimal(v) {
      this.setCurrentType(v);
      this.setShowForm(true);
    },

    navigate(type) {
      this.setCurrentType(type);
      this.$router.push({ path: `/details/${type.type}` });
    },

    showAddType() {
      this.setShowTypeForm(true);
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.v-list__tile__content:hover,
.v-list__tile__action:hover {
  cursor: pointer;
}
</style>
