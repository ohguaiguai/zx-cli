const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const { Creator } = require('../lib/Creator');

module.exports = async function (projectName, options) {
  // console.log(projectName);
  const cwd = process.cwd(); // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, projectName);

  if (fs.existsSync(targetDir)) {
    // 如果开启了强制创建那么久删掉已经存在的那个文件夹
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      // 提示用户是否要覆盖
      let { action } = await inquirer.prompt([
        // 配置询问的方式
        {
          name: 'action',
          type: 'list', // 还有输入框、checkbox等
          message: 'Target directory already exists , pick an action',
          choices: [
            { name: 'Overwrite', value: 'overwrite' }, // 这里的value 会赋值给 action
            { name: 'Cancel', value: false }, // 这里的value 会赋值给 action
          ],
        },
      ]);
      // console.log(action);
      if (!action) {
        return;
      } else if (action === 'overwrite') {
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir);
      }
    }
  }

  // 创建项目
  const creator = new Creator(projectName, targetDir);
  creator.create();
};
