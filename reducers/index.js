import { combineReducers } from 'redux';

import auth from './auth.reducer';
import selection from './selection.reducer';
import rep from './rep.reducer';
import location from './location.reducer';
import pipeline from './pipeline.reducer';

export default combineReducers({
  auth,
  selection,
  rep,
  location,
  pipeline
});
