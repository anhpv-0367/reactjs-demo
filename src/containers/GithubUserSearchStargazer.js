import { connect } from "react-redux";
import UsernameSearchForm from "../components/UsernameSearchForm";
import { loadStargazerForUser } from "../store/repo.slice";

export default connect(
  null,
  dispatch => ({
    onSearch: (username, reponame) =>
      dispatch(loadStargazerForUser(username, reponame))
  })
)(UsernameSearchForm);
