import { createSlice } from "redux-starter-kit";
import repoService from "../services/repo.service";

const slice = createSlice({
  slice: "repo",
  initialState: {
    repos: [],
    stargazers: [],
    loading: false,
    username: null,
    reponame: null,
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
    }),
    loadStargazerStart: (state, action) => ({
      ...state,
      loading: true,
      username: action.payload.username,
      reponame: action.payload.reponame
    }),
    loadStargazerSuccess: (state, action) => ({
      ...state,
      loading: false,
      stargazers: {
        ...state.stargazers,
        [action.payload.repoId]: {
          page: action.payload.page,
          stargazers_count: action.payload.stargazers_count,
          data:
            state.stargazers[action.payload.repoId] &&
            state.stargazers[action.payload.repoId].data !== undefined
              ? [
                  ...state.stargazers[action.payload.repoId].data,
                  ...action.payload.data
                ]
              : action.payload.data
        }
      }
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

export const loadStargazerForUser = (username, reponame) => async dispatch => {
  dispatch(
    slice.actions.loadStargazerStart({
      username,
      reponame
    })
  );
  const repoInfo = await repoService.getRepoInfo(username, reponame);
  const data = await repoService.getStargazers(username, reponame, 1);
  dispatch(
    slice.actions.loadStargazerSuccess({
      repoId: repoInfo.id,
      data: data,
      stargazers_count: repoInfo.stargazers_count,
      page: 1
    })
  );
};

export const loadMoreStargazer = (username, reponame) => async (
  dispatch,
  getState
) => {
  const { stargazers } = getState().repos;

  dispatch(
    slice.actions.loadStargazerStart({
      username,
      reponame
    })
  );

  const repoInfo = await repoService.getRepoInfo(username, reponame);
  const newPage = await repoService.nextPage(stargazers, repoInfo.id);
  const data = await repoService.getStargazers(username, reponame, newPage);

  if (newPage > 1 && data.length > 0) {
    dispatch(
      slice.actions.loadStargazerSuccess({
        repoId: repoInfo.id,
        page: newPage,
        data: data
      })
    );
  }
};

export default slice;
