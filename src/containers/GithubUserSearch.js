import { connect } from "react-redux";
import UsernameSearchForm from "../components/UsernameSearchForm";
import { loadRepoForUser } from "../store/repo.slice";

export default connect(
  null,
  dispatch => ({
    onSearch: username => dispatch(loadRepoForUser(username))
  })
)(UsernameSearchForm);
