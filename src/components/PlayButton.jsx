import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import SoundCloudAudio from 'soundcloud-audio';
import { Icons } from 'react-soundplayer/components';

class PlayButton extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { playing, seeking } = this.props;

        return (
            playing !== nextProps.playing || seeking !== nextProps.seeking
        );
    }

    handleClick = e => {
        const { playing, play, pause, trackTitle } = this.props;

        if (!playing) {
            play(trackTitle);
        } else {
            pause();
        }

    }

    render() {
        const { playing, seekingIcon, seeking, className, style } = this.props;

        let iconNode;

        if (seeking && seekingIcon) {
            iconNode = React.cloneElement(seekingIcon);
        } else if (playing) {
            iconNode = <Icons.PauseIconSVG />;
        } else {
            iconNode = <Icons.PlayIconSVG />;
        }

        const classNames = ClassNames('sb-soundplayer-btn sb-soundplayer-play-btn', className);

        return (
            <button type="button" className={classNames} style={style} onClick={this.handleClick}>
                {iconNode}
            </button >
        );
    }
}

PlayButton.propTypes = {
    className: PropTypes.string,
    seeking: PropTypes.bool,
    playing: PropTypes.bool,
    onTogglePlay: PropTypes.func,
    seekingIcon: PropTypes.node,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    trackTitle: PropTypes.string.isRequired,
    soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio)
};

PlayButton.defaultProps = {
    playing: false,
    seeking: false
};

export default PlayButton;