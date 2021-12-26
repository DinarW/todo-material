import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/tasks';

import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const dispatch = useDispatch();

  const clickAddTask = () => {
    dispatch(addTask(inputValue, isChecked));
    setInputValue('');
    setIsChecked(false);
  };

  return (
    <div className="field">
      <Checkbox
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue} 
        placeholder="Введите текст задачи..."
        variant="standard" 
        fullWidth
      />
      <Button onClick={clickAddTask} >
        <AddIcon />
      </Button>
    </div>
  );
};
