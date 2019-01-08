import { combineReducers } from 'redux';
import issues from './issues';

const allReducers = combineReducers({
  issues,
});
// NOTE: there will currently be only one reducer for issue's actions
export default allReducers;
