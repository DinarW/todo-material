import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        { ...action.payload, id: state.length ? state[state.length - 1].id + 1 : 1 },
      ];
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((task) => {
        if (task.id === action.payload) {
          return { ...task, checked: !task.checked };
        }
        return task;
      });
    case 'DELETE_ALL':
      return [];
    case 'CHECKED_ALL':
      const checkedTasks = state.filter((obj) => obj.checked);  // самая простая реализация, но по оптимизации, как я понимаю, не очень
      const isAllChecked = checkedTasks.length === state.length;// можно было бы ввести два флага, каждый бы следил какой чекед у добавляемой задачи
      return state.map((task) => ({ ...task, checked: !isAllChecked })); // но наверное тут это неуместно :/
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, [])

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
    dispatch({
      type: 'DELETE_ALL',
    });
  }

  const checkedAllTasks = () => {
    dispatch({
      type: 'CHECKED_ALL',
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
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          { state.map((obj) => {
            return (
              <Item 
                key={obj.id}
                task={obj}
                onClickCheckbox={() => toggleComplete(obj.id)}
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
