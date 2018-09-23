import { combineReducers } from 'redux';

import trackList from './trackList';
import player from './player';

export default combineReducers({ trackList, player });
