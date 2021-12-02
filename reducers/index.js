import { combineReducers } from 'redux';

import selection from './selection.reducer';
import crm from './crm.reducer';

export default combineReducers({
  selection,
  crm
});
