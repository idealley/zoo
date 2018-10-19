import * as types from "./mutation-types";

export default {
  [types.ANIMALS](state, data) {
    state.animals = data;
  },

  [types.TYPES](state, data) {
    state.types = data;
  },

  [types.SET_CURRENT_TYPE](state, data) {
    state.currentType = data;
  },

  [types.SET_SHOW_FORM](state, data) {
    state.showForm = data;
  },

  [types.SET_SHOW_TYPE_FORM](state, data) {
    state.showTypeForm = data;
  },

  [types.ADD_ANIMAL](state, data) {
    state.animals.push(data);
  },

  [types.ADD_TYPE](state, data) {
    state.types.push(data);
  },

  [types.DELETE_ANIMAL](state, data) {
    state.animals = state.animals.filter(i => i.name !== data);
  }
};
