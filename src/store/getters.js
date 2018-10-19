export const mapedAndCountedAnimals = state => {
  return state.types.map(t => {
    return {
      count: state.animals.reduce(
        (a, c) => (c.typeRef === t.type ? a + 1 : a),
        0
      ),
      type: t
    };
  });
};

export const filteredAnimals = state => {
  return state.animals.filter(i => i.typeRef === state.currentType.type);
};
