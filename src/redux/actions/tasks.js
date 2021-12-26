export const addTask = (text, checked) => ({
  type: 'ADD_TASK',
  payload: {
    text,
    checked,
  }
});

export const fetchTasks = () => async (dispatch) => {
  const response = await fetch('https://61ba2ba348df2f0017e5a968.mockapi.io/tasks');
  if (response.ok) {
    const data = await response.json();
    dispatch({
      type: 'SET_TASKS',
      payload: data,
    });
  }
};

export const removeTask = (id) => ({
  type: 'DELETE_TASK',
  payload: id,
});

export const toggleCompleted = (id) => ({
  type: 'TOGGLE_TASK',
  payload: id,
});

export const completeAll = () => ({
  type: 'CHECKED_ALL',
});

export const clearAll = () => ({
  type: 'DELETE_ALL',
});

export const editTask = (newTask) => ({
  type: 'EDIT_TASK',
  payload: newTask,
});
