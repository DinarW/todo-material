import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from '@mui/material';
import { setFilter } from '../redux/actions/filter';

const filtered = ['all', 'active', 'complited'];

const Filter = () => {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.filter.filterBy);

  const handlerFilterTasks = (_, newValue) => {
    dispatch(setFilter(filtered[newValue]));
  };

  return (
    <Tabs onChange={handlerFilterTasks} value={filtered.indexOf(filterBy)}>
      <Tab label="Все" />
      <Tab label="Активные" />
      <Tab label="Завершённые" />
    </Tabs>
  )
}

export default Filter
