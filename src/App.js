import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    return [
      ...state,
      { ...action.payload, id: state.length ? state[state.length - 1].id + 1 : 1 },
    ];
  }

  return state;
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, [])

  const addTask = (obj) => {
    dispatch({
      type: 'ADD_TASK',
      payload: obj,
    })
  }

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
              <Item key={obj.id} text={obj.text} isChecked={obj.checked} />  
            )
          }) }
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
