import { createStore } from 'redux';
 
const filtered = ['all', 'active', 'complited'];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...action.payload, id: state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 1 }
        ]
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => 
          task.id === action.payload ? { ...task, checked: !task.checked } : task
        ),
      }
    case 'DELETE_ALL':
      return {
        ...state,
        tasks: [],
      };
    case 'CHECKED_ALL':
      const countCheckedTasks = state.tasks.reduce((counter, obj) => 
        obj.checked ? counter + 1 : counter
      ,0);
      const isAllChecked = countCheckedTasks === state.tasks.length;
      return {
        ...state,
        tasks: state.tasks.map((task) => ({ ...task, checked: !isAllChecked })),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filterBy: filtered[action.payload],
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    default:
      return state;
  };
};

const store = createStore(reducer, {
  filterBy: 'all',
  tasks: [],
});

export default store;
