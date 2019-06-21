import { connect } from "react-redux";
import StargazerList from "../components/StargazerList";
import { loadMoreStargazer } from "../store/repo.slice";

const mapStateToProps = (state, props) => {
  return {
    repo_id: props.repo_id,
    repo_name: props.repo_name,
    stargazers_count: props.stargazers_count,
    loading: state.repos.loading,
    stargazers: state.repos.stargazers,
    username: state.repos.username
  };
};

const mapDispatchToProps = dispatch => {
  return { onLoadMore: (username, reponame) => dispatch(loadMoreStargazer(username, reponame)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StargazerList);
