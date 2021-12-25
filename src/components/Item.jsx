import React from 'react';
import { useDispatch } from 'react-redux';

import { IconButton, Checkbox, ListItem, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';

export const Item = ({ task }) => {
  const [edit, setEdit] = React.useState(true);
  const [editInputValue, setEditInputValue] = React.useState('');
  const dispatch = useDispatch();

  const onClickDelete = () => {
    if (window.confirm('Уверены, что хотите удалить задачу?')) {
      dispatch({
        type: 'DELETE_TASK',
        payload: task.id,
      });
    }
  };

  const onClickEdit = (editedItem) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: editedItem,
    });
  };

  const onClickCheckbox = () => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: task.id,
    });
  };

  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          checked={task.checked}
          onChange={onClickCheckbox}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
        { edit ?
          (<Typography className="item-text">{task.text}</Typography>) :
          (<TextField 
            onChange={(e) => setEditInputValue(e.target.value)} 
            value={editInputValue}
            className="item-text" 
            placeholder={task.text} />)
        }
        <div className="item-buttons d-flex">
          <IconButton 
            onClick={() => {
              setEdit(!edit)

              if (!editInputValue) {
                setEditInputValue(task.text);
              }

              !edit && onClickEdit({ ...task, text: editInputValue })
            }}
          >
            {edit ? 
              <EditIcon style={{ fontSize: 20 }} /> :
              <SaveIcon style={{ fontSize: 20 }} />
            }
          </IconButton>
          <IconButton onClick={onClickDelete} >
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
