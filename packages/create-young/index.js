#! /usr/bin/env node
import commandLineArgs from 'command-line-args';
import { getHelpInfo, getVersionInfo, createTemplate } from './utils.js';
import { optionDefinitions } from './config.js';

// 运行包时获取用户输入内容
const options = commandLineArgs(optionDefinitions);

if (options.help) {
  getHelpInfo();
} else if (options.version) {
  getVersionInfo();
} else {
  createTemplate();
}
