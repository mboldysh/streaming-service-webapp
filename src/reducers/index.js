import { combineReducers } from 'redux';

import trackList from './trackList';
import player from './player';
import user from './user';
import load from './load';
import notification from './notification';

export default combineReducers({ trackList, player, user, load, notification });
