const initialState = {
  filterBy: 'all',
};

const filterReducer = (state = initialState, action) => {
  if (action.type === 'SET_FILTER') {
    return {
      ...state,
      filterBy: action.payload,
    };
  }

  return state;
};

export default filterReducer;
