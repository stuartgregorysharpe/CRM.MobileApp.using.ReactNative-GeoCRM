import { combineReducers } from 'redux';

import auth from './auth.reducer';
import selection from './selection.reducer';
import rep from './rep.reducer';
import location from './location.reducer';
import pipeline from './pipeline.reducer';
import notification from './notification.reducer';
import sales from './sales.reducer';
import feed from './feed.reducer';
export default combineReducers({
  notification,
  auth,
  selection,
  rep,
  location,
  pipeline,
  sales,
  feed
});
