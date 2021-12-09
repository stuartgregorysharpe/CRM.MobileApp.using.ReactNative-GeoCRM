import { combineReducers } from 'redux';

import selection from './selection.reducer';
import rep from './rep.reducer';

export default combineReducers({
  selection,
  rep
});
