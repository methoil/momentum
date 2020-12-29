import React from 'react';
import { useState } from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { removeHabitRequest } from '../redux/actions/habit-actions';

interface IProps {
  name: string;
  _id: string;
}

const RemoveHabitConfirmationDialog: React.FC<IProps> = ({ name, _id }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onClose = () => setOpen(false);
  const onConfirm = () => {
    dispatch(removeHabitRequest(_id));
    onClose();
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <HighlightOffIcon></HighlightOffIcon>
      </IconButton>

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{`Remove Habit`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Are you sure you permanently want to remove ${name}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onClose}>Nevermind...</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RemoveHabitConfirmationDialog;