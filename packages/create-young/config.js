import fs from 'fs';

//配置命令参数
export const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'version', alias: 'v', type: Boolean },
];

// 帮助提示内容
export const helpSections = [
  {
    header: 'create-kitty',
    content: '一个快速生成组件库搭建环境的脚手架',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'version',
        typeLabel: '{underline boolean}',
        description: '版本号',
      },
    ],
  },
];

//创建模板时的选项
export const promptsOptions = [
  {
    type: 'text', //单选
    name: 'name',
    message: 'project-name',
    validate(val) {
      if (!val) return '模板名称不能为空！';
      if (fs.existsSync(val)) return '项目名已存在';
      if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) return '模板名称包含非法字符，请重新输入';
      return true;
    },
  },

  {
    type: 'select', //单选
    name: 'template',
    message: 'select a framework',
    choices: [
      { title: 'esbuild', value: 1 },
      { title: 'rollup', value: 2 },
    ],
  },
];
