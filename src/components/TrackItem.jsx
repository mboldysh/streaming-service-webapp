import React from 'react';
import PropTypes from 'prop-types';
import { ListItemIcon, ListItem, ListItemText } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

const TrackItem = ({ trackName }) => (
  <ListItem divider>
    <ListItemIcon>
      <SendIcon />
    </ListItemIcon>
    <ListItemText primary={trackName} />
    <DeleteIcon />
  </ListItem>
);

TrackItem.propTypes = {
  trackName: PropTypes.string.isRequired,
};

export default TrackItem;
