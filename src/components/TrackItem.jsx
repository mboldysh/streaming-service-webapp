import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const TrackItem = ({ trackName, deleteTrack, currentTrackName, isPlaying }) => (
  <ListItem divider>
    <ListItemIcon>
      {trackName === currentTrackName && isPlaying ? (
        <PauseIcon />
      ) : (
        <PlayArrowIcon />
      )}
    </ListItemIcon>
    <ListItemText primary={trackName} />
    <IconButton aria-label="Delete" onClick={() => deleteTrack(trackName)}>
      <DeleteIcon />
    </IconButton>
  </ListItem>
);

TrackItem.propTypes = {
  trackName: PropTypes.string.isRequired,
  currentTrackName: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  deleteTrack: PropTypes.func.isRequired,
};

export default TrackItem;
