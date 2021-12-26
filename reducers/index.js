import { combineReducers } from 'redux';

import auth from './auth.reducer';
import selection from './selection.reducer';
import rep from './rep.reducer';
import location from './location.reducer';

export default combineReducers({
  auth,
  selection,
  rep,
  location
});
