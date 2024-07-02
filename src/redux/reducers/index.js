import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
  employeeDetail: employeeReducer,
});

export default rootReducer;