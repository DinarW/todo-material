const initialState = [];

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [
        ...state,
        {
          ...action.payload, id: state.length ? state[state.length - 1].id + 1 : 1,
        },
      ];
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((task) => 
          task.id === action.payload ? { ...task, checked: !task.checked } : task
        );
    case 'DELETE_ALL':
      return [];
    case 'CHECKED_ALL':
      const countCheckedTasks = state.reduce((counter, obj) => 
        obj.checked ? counter + 1 : counter
      ,0);
      const isAllChecked = countCheckedTasks === state.length;
      return state.map((task) => ({ ...task, checked: !isAllChecked }));
    case 'EDIT_TASK':
      return state.map((task) => 
          task.id === action.payload.id ? action.payload : task
        );
    default:
      return state;
  };
};

export default tasksReducer;
