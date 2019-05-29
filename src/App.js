import React, { Component } from "react";
import axios from "axios";

const Loader = () => <div>Loading...</div>;

const fetchAPI = params => {
  return axios
    .get(
      `https://api.github.com/users/` +
        params.user_name +
        `/repos?` +
        `page=` +
        params.page +
        `&per_page=` +
        params.size
    )
    .then(res => {
      const repos = res.data;
      return repos;
    })
    .catch(function(error) {
      console.log(error);
    });
};

class NameInput extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const user_name = this.props.user_name;
    return <input type="text" value={user_name} onChange={this.handleChange} />;
  }
}

class NextPage extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const page = parseInt(this.props.page, 10) + 1;
    return (
      <button value={page} onClick={this.handleChange}>
        Next Page
      </button>
    );
  }
}

class PreviousPage extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const page = parseInt(this.props.page, 10) - 1;
    return (
      <button value={page} onClick={this.handleChange}>
        Previous Page
      </button>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      user_name: "",
      result: "",
      repos: [],
      size: 5,
      page: 1,
      paginate_flag: true,
      loading: false
    };
  }

  hideLoader = () => {
    this.setState({ loading: false });
  };

  showLoader = () => {
    this.setState({ loading: true });
  };

  handleChangeName = e => {
    this.setState({ user_name: e.target.value });
  };

  callApi = () => {
    this.showLoader();
    fetchAPI(this.state).then(repos => {
      if (repos !== undefined && repos.length > 0) {
        this.setState({ paginate_flag: true });
      }
      if (repos === undefined || repos.length === 0 || repos.length < 0) {
        this.setState({ paginate_flag: false });
      }
      this.setState({
        repos
      });
      this.hideLoader();
    });
  };

  handleUserNameChange = user_name => {
    this.setState({ user_name });
  };

  handleNextPageChange = page => {
    if (this.state.paginate_flag) {
      this.setState({ page }, () => {
        this.callApi();
      });
    }
  };

  handlePreviousPageChange = page => {
    if (page >= 1) {
      this.setState(
        {
          page: page
        },
        () => {
          this.callApi();
        }
      );
    }
  };

  render() {
    const { page, size } = this.state;

    return (
      <div className="App">
        <NameInput
          user_name={this.state.user_name}
          onChange={this.handleUserNameChange}
        />
        <button onClick={() => this.callApi()}> Click me</button>
        <div>page: {page} | size: {size}</div>
        {this.state.loading ? <Loader /> : null}
        <br />
        <br />
        <PreviousPage page={page} onChange={this.handlePreviousPageChange} />
        <NextPage page={page} onChange={this.handleNextPageChange} />
        {this.state.repos && (
          <ul>
            {this.state.repos.map((repo, index) => (
              <li key={index}>{repo.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
