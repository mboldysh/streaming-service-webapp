import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import SoundCloudAudio from 'soundcloud-audio';
import { Icons } from 'react-soundplayer/components';

class NextButton extends Component {
  shouldComponentUpdate() {
    return false;
  }

  handleClick = e => {
    const { onNextClick } = this.props;

    onNextClick();
  }

  render() {
    const { className, style } = this.props;
    const classNames = ClassNames(
      'sb-soundplayer-btn sb-soundplayer-next-btn',
      className
    );

    return (
      <button
        type="button"
        className={classNames}
        style={style}
        onClick={this.handleClick}
      >
        <Icons.NextIconSVG />
      </button>
    );
  }
}

NextButton.propTypes = {
  className: PropTypes.string,
  onNextClick: PropTypes.func.isRequired,
  soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio),
};

export default NextButton;
