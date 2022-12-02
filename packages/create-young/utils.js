import chalk from 'chalk';
import commandLineUsage from 'command-line-usage';
import prompts from 'prompts';
import download from 'download-git-repo';
import ora from 'ora';
import { readFile } from 'fs/promises';
import { helpSections, optionDefinitions, promptsOptions } from './config.js';

// 获取帮助信息
export const getHelpInfo = () => {
  console.log(chalk.green(commandLineUsage(helpSections)));
};

//获取版本号信息
export const getVersionInfo = async () => {
  const json = JSON.parse(await readFile(new URL('./package.json', import.meta.url)));
  console.log(chalk.green(`v${json.version}`));
};

//下载模板
const gitClone = (remote, name, option) => {
  const loadingOra = ora('正在下载模板...').start();
  return new Promise((resolve, reject) => {
    download(remote, name, option, err => {
      if (err) {
        loadingOra.fail();
        console.log('err', chalk.red(err));
        reject(err);
        return;
      }
      loadingOra.succeed(chalk.green('success'));
      console.log(`Done. Now run:\r\n`);
      console.log(chalk.green(`cd ${name}`));
      console.log(chalk.blue('npm install'));
      console.log('npm run dev\r\n');
      resolve();
    });
  });
};

//创建模板
export const createTemplate = async () => {
  const res = await prompts(promptsOptions);
  if (!(res.name && res.template)) return;
  gitClone(`direct:https://gitee.com/xiang0515/npm-bundle-template.git#esbuild`, res.name, {
    clone: true,
  });
};
