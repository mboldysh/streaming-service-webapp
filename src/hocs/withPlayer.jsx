import { withCustomAudio } from 'react-soundplayer/addons';
import { compose, withProps } from 'recompose';
import soundCloudAudio from '../soundCloudAudio';

export default compose(
  withProps({ soundCloudAudio }),
  withCustomAudio
);
