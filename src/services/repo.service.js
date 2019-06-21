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
  }
};
