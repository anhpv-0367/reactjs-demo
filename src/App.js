import React, { Component } from "react";
import { store } from "./store";
import NameInput from "./components/NameInput";
import NextPage from "./components/NextPage";
import PreviousPage from "./components/PreviousPage";
import { callApi } from "./support_function";

const Loader = () => <div>Loading...</div>;

class App extends Component {
  render() {
    const { page, size, user_name, loading, repos } = store.getState();
    return (
      <div className="App">
        <NameInput user_name={user_name} />
        <button onClick={() => callApi()}> Click me</button>
        {loading ? <Loader /> : null}
        <div>
          page: {page} | size: {size}
        </div>
        <br />
        <br />
        <PreviousPage page={page} disabled />
        <NextPage page={page} />
        {repos && (
          <ul>
            {repos.map((repo, index) => (
              <li key={index}>{repo.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
