import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/auth.slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;