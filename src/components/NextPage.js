import React, { Component } from "react";
import { store } from "../store";
import { setPage } from "../actions/";
import { callApi } from "../support_function";

class NextPage extends Component {
  handleChange = e => {
		const paginate_flag = store.getState().paginate_flag;
    if (paginate_flag) {
      const page = e.target.value;
      store.dispatch(setPage(page));
      callApi();
    }
  };

  render() {
		const page = parseInt(store.getState().page, 10) + 1;
		const paginate_flag = store.getState().paginate_flag;
    return (
      <button value={page} onClick={this.handleChange} disabled={!paginate_flag}>
        Next Page
      </button>
    );
  }
}

export default NextPage;
