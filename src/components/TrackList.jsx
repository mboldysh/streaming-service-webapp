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

const TrackList = ({ tracks, classes }) => {
  const trackItems = tracks.map(track => (
    <TrackItem key={track.name} trackName={track.name} />
  ));
  return <List classes={{ root: classes.root }}>{trackItems}</List>;
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  classes: PropTypes.shape({
    margin: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(TrackList);
