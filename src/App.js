import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

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

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    filterBy: 'all',
    tasks: [],
  });

  const addTask = (obj) => {
    dispatch({
      type: 'ADD_TASK',
      payload: obj,
    })
  }

  const deleteTask = (id) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  };

  const toggleComplete = (id) => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: id,
    });
  };

  const deleteAllTasks = () => {
    if (window.confirm('Вы уверены, что хотите удалить все задачи?')) {
      dispatch({
        type: 'DELETE_ALL',
      });
    }
  }

  const checkedAllTasks = () => {
      dispatch({
        type: 'CHECKED_ALL',
      });
  };

  const handleFilterTasks = (_, newValue) => {
    dispatch({
      type: 'SET_FILTER',
      payload: newValue,
    });
  };

  const editTaskItem = (editedItem) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: editedItem,
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField clickAddTask={addTask} />
        <Divider />
        <Tabs onChange={handleFilterTasks} value={filtered.indexOf(state.filterBy)}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          { state.tasks
          .filter((obj) => {
            switch (state.filterBy) {
              case 'active':
                return !obj.checked;
              case 'complited':
                return obj.checked;
              default:
                return true;
            }
          })
          .map((obj) => {
            return (
              <Item
                key={obj.id}
                task={obj}
                onClickCheckbox={() => toggleComplete(obj.id)}
                onClickEdit={editTaskItem}
                onDelete={deleteTask}
              />  
            )
          }) }
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={checkedAllTasks}>Отметить всё</Button>
          <Button onClick={deleteAllTasks}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
