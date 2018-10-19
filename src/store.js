import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./store/actions";
import * as mutations from "./store/mutations";
import * as getters from "./store/getters";

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  state: {
    animals: [],
    types: [],
    currentType: {},
    showForm: false,
    showTypeForm: false
  },
  mutations: mutations.default
});
