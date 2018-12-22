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
import ArrowDonwnward from '@material-ui/icons/ArrowDownward';
import PauseIcon from '@material-ui/icons/Pause';

const TrackItem = ({
  trackName,
  deleteTrack,
  currentTrackName,
  isPlaying,
  pause,
  play,
  download,
}) => (
  <ListItem divider>
    <ListItemIcon>
      {trackName === currentTrackName && isPlaying ? (
        <IconButton onClick={pause}>
          <PauseIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => play(trackName)}>
          <PlayArrowIcon />
        </IconButton>
      )}
    </ListItemIcon>
    <ListItemText primary={trackName} />
    <IconButton onClick={() => download(trackName)}>
      <ArrowDonwnward />
    </IconButton>
    <IconButton onClick={() => deleteTrack(trackName)}>
      <DeleteIcon />
    </IconButton>
  </ListItem>
);

TrackItem.propTypes = {
  trackName: PropTypes.string.isRequired,
  currentTrackName: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  deleteTrack: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
};

export default TrackItem;
