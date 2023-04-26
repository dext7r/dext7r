#!/usr/bin / env node
/**
 * @author        h7ml <h7ml@qq.com>
 * @date          2023-04-27 00:05:24
 * @lastModified  2023-04-27 00:05:53
 * Copyright © www.h7ml.cn All rights reserved
 */
/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-04-27 00:05:24
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-04-27 00:05:48
 * @FilePath: \dext7r\packages\linter\bin\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by h7ml<h7ml@qq.com>, All Rights Reserved. 
 */


const fs = require('fs');
const path = require('path');
const { cp } = require('fs/promises');
const { exec } = require('child_process');

// templates
cp(path.resolve(__dirname, '../templates'), path.resolve(process.cwd()), {
  recursive: true,
});

const scripts = {
  prepare: 'husky install',
  commit: 'git add . && cz',
  lint: 'tsc --noEmit && eslint src --ext .ts,.tsx',
};

const packags = {
  husky: '7.0.4',
  '@commitlint/cli': '16.2.3',
  '@commitlint/config-conventional': '16.2.1',
  commitizen: '4.2.4',
  'cz-conventional-changelog': '3.0.0',
  prettier: '2.6.2',
  eslint: '8.2.0',
  typescript: '4.6.3',
  'lint-staged': '12.3.7',
};

function joinScripts(scriptsObj) {
  let result = '';
  for (let key in scriptsObj) {
    result += `npm set-script ${key} '${scriptsObj[key]}' && `;
  }
  return result;
}

function joinPackags(packagsObj) {
  let result = 'npm install -D -E ';
  for (let key in packagsObj) {
    result += ` ${key}@${packagsObj[key]} `;
  }
  return result;
}

const allProcess = exec(
  `${joinScripts(scripts)} ${joinPackags(packags)}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  },
);

allProcess.stdout.on('data', (data) => {
  console.log(data);
});
