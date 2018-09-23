import React from 'react';
import { PlayButton, Timer } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';
import PropTypes from 'prop-types';
import 'react-soundplayer/styles/buttons.css';
import 'react-soundplayer/styles/icons.css';
import 'react-soundplayer/styles/progress.css';

const SoundPlayer = withCustomAudio(props => {
  const { trackTitle } = props;
  return (
    <div className="p1 mt1 flex flex-center bg-silver orange rounded fixed bottom-0 left-0 right-0">
      <PlayButton
        className="flex-none h4 button button-transparent button-grow rounded mr2"
        {...props}
      />
      <h2 className="h5 nowrap caps flex-auto m0">{trackTitle}</h2>
      <Timer className="h6 mr1" {...props} />
    </div>
  );
});

SoundPlayer.propTypes = {
  streamUrl: PropTypes.string.isRequired,
  trackTitle: PropTypes.string.isRequired,
  preloadType: PropTypes.string.isRequired,
};

export default SoundPlayer;
