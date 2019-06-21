import { createSlice } from "redux-starter-kit";
import repoService from "../services/repo.service";

const slice = createSlice({
  slice: "repo",
  initialState: {
    repos: [],
    loading: false,
    username: null,
    total: 0,
    page: 0
  },
  reducers: {
    loadRepoStart: (state, action) => ({
      ...state,
      loading: true,
      username: action.payload.username,
      page: action.payload.page
    }),
    setTotal: (state, action) => ({
      ...state,
      total: action.payload
    }),
    loadRepoSuccess: (state, action) => ({
      ...state,
      loading: false,
      repos:
        action.payload.page === 1
          ? [...action.payload.repos]
          : [...state.repos, ...action.payload.repos]
    })
  }
});

export const loadRepoForUser = username => async dispatch => {
  dispatch(
    slice.actions.loadRepoStart({
      username,
      page: 1
    })
  );
  const userInfo = await repoService.getUserInfo(username);
  dispatch(slice.actions.setTotal(userInfo.public_repos));
  const repos = await repoService.getRepos(username, 1);
  dispatch(slice.actions.loadRepoSuccess({ repos, page: 1 }));
};

export const loadMore = () => async (dispatch, getState) => {
  const { username, page } = getState().repos;

  const nextPage = page + 1;

  dispatch(
    slice.actions.loadRepoStart({
      username,
      page: nextPage
    })
  );

  const repos = await repoService.getRepos(username, nextPage);
  dispatch(
    slice.actions.loadRepoSuccess({
      repos,
      page: nextPage
    })
  );
};

export default slice;
