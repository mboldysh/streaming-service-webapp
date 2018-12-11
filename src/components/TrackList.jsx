import React from 'react';
import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TrackItem from './TrackItem';

const styles = () => ({
  root: {
    margin: '0 0 48px 0',
  },
});

const TrackList = ({
  tracks,
  classes,
  deleteTrack,
  currentTrackName,
  isPlaying,
}) => {
  const trackItems = tracks.map(track => (
    <TrackItem
      key={track.name}
      trackName={track.name}
      currentTrackName={currentTrackName}
      isPlaying={isPlaying}
      deleteTrack={deleteTrack}
    />
  ));
  return <List classes={{ root: classes.root }}>{trackItems}</List>;
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  currentTrackName: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  deleteTrack: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    margin: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(TrackList);
