import React from 'react';
import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import SoundCloudAudio from 'soundcloud-audio';
import TrackItem from './TrackItem';
import withPlayer from '../hocs/withPlayer';

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
  togglePlayer,
  pause,
  play,
  download,
  soundCloudAudio,
}) => {
  const trackItems = tracks.map(track => (
    <TrackItem
      key={track.name}
      trackName={track.name}
      currentTrackName={currentTrackName}
      isPlaying={isPlaying}
      deleteTrack={deleteTrack}
      togglePlayer={togglePlayer}
      pause={pause}
      play={play}
      download={download}
      soundCloudAudio={soundCloudAudio}
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
  togglePlayer: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio).isRequired,
  classes: PropTypes.shape({
    margin: PropTypes.string,
  }).isRequired,
};

export default compose(
  withStyles(styles),
  withPlayer
)(TrackList);
