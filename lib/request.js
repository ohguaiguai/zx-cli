const axios = require('axios');
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) => {
  return res.data;
});

async function fetchRepoList() {}

module.exports = {
  fetchRepoList,
};
