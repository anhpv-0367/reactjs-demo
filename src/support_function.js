import axios from "axios";
import { store } from "./store";
import { setLoading } from "./actions/";
import { setPaginateFlag } from "./actions/";
import { setRepos } from "./actions";

export const hideLoader = () => {
  store.dispatch(setLoading(false));
};
export const showLoader = () => {
  store.dispatch(setLoading(true));
};

export const fetchAPI = params => {
  return axios
    .get(
      `https://api.github.com/users/` +
        params.user_name +
        `/repos?` +
        `page=` +
        params.page +
        `&per_page=` +
        params.size
    )
    .then(res => {
      const repos = res.data;
      return repos;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const callApi = () => {
  fetchAPI(store.getState()).then(repos => {
    showLoader();
    if (repos !== undefined && repos.length > 0) {
      store.dispatch(setPaginateFlag(true));
    }
    if (repos === undefined || repos.length === 0 || repos.length < 0) {
      store.dispatch(setPaginateFlag(false));
    }
    store.dispatch(setRepos(repos));
    hideLoader();
  });
};
