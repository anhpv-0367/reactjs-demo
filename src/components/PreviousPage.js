import React, { Component } from "react";
import { store } from "../store";
import { setPage } from "../actions/";
import { callApi } from "../support_function";

class PreviousPage extends Component {
  handleChange = e => {
    const page = e.target.value;
    if (page >= 1) {
      store.dispatch(setPage(page));
      callApi();
    }
  };

  render() {
    const page = parseInt(store.getState().page, 10) - 1;
    return (
      <button value={page} onClick={this.handleChange}>
        Previous Page
      </button>
    );
  }
}

export default PreviousPage;
