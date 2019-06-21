import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";

import GithubUserSearch from "./containers/GithubUserSearch";
import GithubRepoList from "./containers/GithubRepoList";

const store = createStore();

const App = () => (
  <div>
    <GithubUserSearch />
    <GithubRepoList />
  </div>
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
