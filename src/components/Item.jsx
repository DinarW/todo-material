import React from 'react';
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Item = ({ task, onDelete }) => {
  const [isCheckedItem, setIsCheckedItem] = React.useState(task.checked);

  const onClickDelete = () => {
    if (window.confirm('Уверены, что хотите удалить задачу?')) {
      onDelete(task.id);
    }
  };

  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          checked={isCheckedItem}
          onClick={() => setIsCheckedItem(!isCheckedItem)}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
        <Typography className="item-text">{task.text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={onClickDelete} >
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
