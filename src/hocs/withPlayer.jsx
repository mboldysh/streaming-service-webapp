import { withCustomAudio } from 'react-soundplayer/addons';
import { compose, withProps } from 'recompose';
import soundCloudAudio from '../soundCloudAudio';

// export const player = new SoundCloudAudio();

export default compose(
  withProps({ soundCloudAudio }),
  withCustomAudio
);

// const withPlayer = WrappedComponent =>
//   class WithPlayer extends React.PureComponent {
//     render() {
//       return <WrappedComponent {...this.props} soundCloudAudio={player} />;
//     }
//   };

// export default WrappedComponent =>
//   withPlayer(withCustomAudio(WrappedComponent));
