const ora = require('ora');

function sleep(n) {
  return new Promise((resolve, reject) => setTimeout(resolve, n));
}
async function wrapLoading(fn, message) {
  const spinner = ora(message);
  spinner.start(); //开启加载
  try {
    let repos = await fn();
    spinner.succeed(); // 成功结束加载
    return repos;
  } catch (e) {
    // console.log(e);
    // 失败重新拉取
    spinner.fail('request failed, refetch...');
    await sleep(1000); // 隔1s后再尝试
    return wrapLoading(fn, message);
  }
}

module.exports = {
  sleep,
  wrapLoading,
};
