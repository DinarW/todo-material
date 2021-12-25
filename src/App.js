import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paper, Divider, Button, List } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import Filter from './components/Filter';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

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

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField />
        <Divider />
        <Filter />
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
