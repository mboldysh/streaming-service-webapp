import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import TrackList from '../components/TrackList';
import SoundPlayer from '../components/SoundPlayer';
import * as TracksActions from '../actions/trackList';
import * as PlayerActions from '../actions/player';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 1200,
  },
});

class Home extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchTrackList();
  }

  componentDidUpdate(prevProps) {
    const { actions, tracks } = this.props;
    if (prevProps.tracks.length === 0 && tracks.length > 0) {
      actions.onPlay(tracks[0].name);
    }
  }

  render() {
    const { actions, player, tracks, currentTrack, classes } = this.props;
    return (
      <div>
        <Header />
        {currentTrack && (
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <div className={classes.root}>
                <TrackList
                  tracks={tracks}
                  deleteTrack={actions.deleteObject}
                  currentTrackName={currentTrack.name}
                  isPlaying={player.isPlaying}
                  togglePlayer={actions.togglePlayer}
                  pause={actions.pause}
                  play={actions.play}
                />
              </div>
            </Grid>
            <SoundPlayer
              streamUrl={currentTrack.url}
              trackTitle={currentTrack.name}
              playing={player.isPlaying}
              seeking={player.isLoading}
              onTogglePlay={actions.togglePlayer}
              nextTrack={actions.nextTrack}
              previousTrack={actions.previousTrack}
              onStopTrack={actions.onAudioEnded}
              preloadType="auto"
            />
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    fetchTrackList: PropTypes.func,
    onPlay: PropTypes.func,
  }).isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentTrack: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    currentTrack: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  }).isRequired,
  classes: PropTypes.shape({
    width: PropTypes.string,
    maxWidth: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  tracks: state.trackList.tracks,
  currentTrack: state.player.currentTrack || null,
  // state.trackList.tracks.find(
  //   track => track.name === state.player.currentTrack
  // ) || null,
  player: state.player,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...TracksActions, ...PlayerActions }, dispatch),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
