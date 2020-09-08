const axios = require('axios');
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) => {
  return res.data;
});

async function fetchRepoList() {
  return axios.request({
    url:
      'https://git.corp.kuaishou.com/api/v4/groups/6424/projects?per_page=100',
    headers: {
      Cookie:
        'event_filter=all; sidebar_collapsed=false; _did=web_23486978864885DF; did=web_66b53c64add44098afbdfd65957bf2f6; didv=1597899353000; clientid=3; client_key=65890b29; experimentation_subject_id=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkltWXhZekk0Tm1ReUxXUTVabVV0TkRCbFl5MWlNamxtTFdJMU56UXpNbVUxWlROaU15ST0iLCJleHAiOm51bGwsInB1ciI6ImNvb2tpZS5leHBlcmltZW50YXRpb25fc3ViamVjdF9pZCJ9fQ%3D%3D--47368be0514bd9bf90054927f094e3ca1843d558; _gitlab_session=a527d346332e84e48326f47e47a480d0',
    },
  });
}

module.exports = {
  fetchRepoList,
};
