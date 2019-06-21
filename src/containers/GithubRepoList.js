import { connect } from "react-redux";
import RepoList from "../components/RepoList";
import { loadMore } from "../store/repo.slice";

export default connect(
  state => ({
    loading: state.repos.loading,
    total: state.repos.total,
    repos: state.repos.repos,
    username: state.repos.username
  }),
  dispatch => ({
    onLoadMore: () => dispatch(loadMore())
  })
)(RepoList);
