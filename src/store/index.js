import { configureStore } from "redux-starter-kit";
import { combineReducers } from "redux";

import repoSlice from "./repo.slice";

const rootReducer = combineReducers({
  repos: repoSlice.reducer
});

export default () =>
  configureStore({
    reducer: rootReducer
  });
