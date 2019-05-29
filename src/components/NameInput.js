import React, { Component } from "react";
import { store } from "../store";
import { setNameInput } from "../actions/";

class NameInput extends Component {
	handleChange = e => {
		const user_name = e.target.value;
		store.dispatch(setNameInput(user_name));
	};
	
	render() {
		return <input type="text" onChange={this.handleChange} />;
	}
}

export default NameInput;