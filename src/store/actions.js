import * as types from "./mutation-types";
import animals from "./animals";
import animalsTypes from "./types";

// Fake API call
export const getAnimals = async ({ commit }) => {
  const data = await animals;
  commit(types.ANIMALS, data);
};

// Fake API call
export const getTypes = async ({ commit }) => {
  const data = await animalsTypes;
  commit(types.TYPES, data);
};

export const setCurrentType = ({ commit }, type) => {
  commit(types.SET_CURRENT_TYPE, type);
};

export const setShowForm = ({ commit }, data) => {
  commit(types.SET_SHOW_FORM, data);
};

export const setShowTypeForm = ({ commit }, data) => {
  commit(types.SET_SHOW_TYPE_FORM, data);
};

// eslint-disable-next-line
export const addAnimal = ({ commit }, data) => {
  commit(types.ADD_ANIMAL, data);
};
// eslint-disable-next-line
export const addType = ({ commit }, data) => {
  commit(types.ADD_TYPE, data);
};

export const deleteAnimal = ({ commit }, data) => {
  commit(types.DELETE_ANIMAL, data);
};
