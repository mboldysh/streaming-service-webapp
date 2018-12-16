import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import soundCloudAudio from '../soundCloudAudio';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(soundCloudAudio)))
);

export default store;
