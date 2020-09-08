const { fetchRepoList } = require('./request');
const inquirer = require('inquirer');
const { wrapLoading } = require('./util');

class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName;
    this.target = targetDir;
  }
  async fetchRepo() {
    // 需要失败后重新拉取
    let repos = await wrapLoading(
      fetchRepoList,
      'waiting for fetching template...'
    );
    if (!repos) return;

    repos = repos.map((item) => item.name);
    console.log(repos.length);
    let { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'please choose a template to create project',
    });
    console.log(repo);
  }
  fetchTag() {}
  download() {}
  async create() {
    // 采用远程拉取的方式 github
    // 1. 先去拉取当前组织下的模板
    let repo = await this.fetchRepo();
    // 2. 通过模板找到版本号
    let tag = await this.fetchTag(repo);
    // 3. 下载
    let downloadUrl = await this.download(repo, tag);
    // 4. 编译模板
  }
}

module.exports = {
  Creator,
};
