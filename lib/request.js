const axios = require('axios');

axios.interceptors.response.use((res) => {
  return res.data;
});

async function fetchRepoList() {
  return axios.get('https://api.github.com/orgs/zhu-cli/repos');
}

module.exports = {
  fetchRepoList,
};
