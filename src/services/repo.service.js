import http from "../utils/http";

export default {
  async getUserInfo(username) {
    return await http.get(`/users/${username}`).then(res => res.data);
  },
  async getRepos(username, page) {
    return await http
      .get(`/users/${username}/repos`, {
        params: {
          page
        }
      })
      .then(res => res.data);
  },
  async getStargazers(username, reponame, page) {
    return await http
      .get(`/repos/${username}/${reponame}/stargazers`, {
        params: {
          page
        }
      })
      .then(res => res.data);
  },
  async getRepoInfo(username, reponame) {
    return await http
      .get(`/repos/${username}/${reponame}`)
      .then(res => res.data);
  },
  async nextPage(stargazers, repo_id) {
    const obj = stargazers[repo_id];
    const max_page = obj.stargazers_count / 30;
    const page = obj.page;

    if (obj === undefined && obj.page === undefined && page >= max_page) {
      return 1;
    }
    return page + 1;
  }
};
