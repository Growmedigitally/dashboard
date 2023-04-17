import { combineReducers } from 'redux';
import { alert } from '@reducer/alert';
import { user } from '@reducer/user';

const rootReducer = combineReducers({
  alert,
  user,
});

export default rootReducer;
