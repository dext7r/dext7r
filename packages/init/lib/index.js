'use strict'

const download = require('download-git-repo')
const execa = require('execa')
const colors = require('colors/safe')
const ora = require('ora')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

// 默认模板
const defualtTemplateKey = 'Vue'
const templates = {
  [defualtTemplateKey]: {
    branch: 'template',
    url: 'https://github.com/vuejs/core',
    downloadUrl: 'https://github.com/vuejs/core.git',
    description: 'vue core',
  },
  React: {
    branch: 'master',
    url: 'https://github.com/facebook/react',
    downloadUrl: 'https://github.com/facebook/react.gitt',
    description: 'react ',
  },
}

const questionList = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称',
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目简介',
  },
  {
    type: 'input',
    name: 'author',
    message: '请输入作者名称',
  },
  {
    type: 'list',
    name: 'template',
    message: '选择其中一个作为项目模版',
    choices: [defualtTemplateKey, 'React'],
  },
]

module.exports = init

async function init(projectName, options) {
  if (projectName) {
    if (options.yes) {
      const initAnswers = {
        projectName,
        template: defualtTemplateKey,
      }
      await initTemplateDefault(initAnswers)
    } else {
      const answers = await prompt(questionList.slice(1))
      await initTemplateDefault({ ...answers, projectName })
    }
  } else {
    if (options.yes) {
      const answers = await prompt(questionList.slice(0, 1))
      const initAnswers = {
        ...answers,
        template: defualtTemplateKey,
      }
      await initTemplateDefault(initAnswers)
    } else {
      const answers = await prompt(questionList)
      await initTemplateDefault(answers)
    }
  }
}

async function prompt(questions) {
  return await inquirer.prompt(questions)
}

async function initTemplateDefault(customContent) {
  console.log(colors.green('即将创建新的项目', customContent))
  const { projectName = '', template = '' } = customContent
  const repository = templates[template].downloadUrl
  const branch = templates[template].branch
  try {
    await checkName(projectName)
    await downloadTemplate(repository, projectName, branch)
    await changeTemplate(customContent)

    console.log(colors.green('初始化完成，请开始coding吧！！！'))
  } catch (error) {
    console.log(colors.red(error))
  }
}

// 创建项目前校验是否已存在
function checkName(projectName) {
  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), (err, data) => {
      if (err) {
        return reject(err)
      }
      if (data.includes(projectName)) {
        return reject(new Error(`${projectName} already exists!`))
      }
      resolve()
    })
  })
}

// 下载模板
async function downloadTemplate(repository, projectName, branch) {
  const spinner = ora('download template......').start()
  try {
    // git clone -b templage http://xxx/.git projectName
    await execa(`git`, ['clone', '-b', branch, repository, projectName], {
      cwd: './',
    })
    await execa(`rm`, ['-rf', `${projectName}/.git`], { cwd: './' })
    // await execa(`npm`, ['init', '-y'], { cwd: `${projectName}/`, })
    // await execa(`mv`, [repoName, projectName], { cwd: './', })
    spinner.succeed()
  } catch (err) {
    spinner.fail()
  }
}

// 修改模板中的package.json文件
async function changeTemplate(customContent) {
  // name description author
  const { projectName = '', description = '', author = '' } = customContent
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(process.cwd(), projectName, 'package.json'),
      'utf8',
      (err, data) => {
        if (err) {
          return reject(err)
        }
        let packageContent = JSON.parse(data)
        packageContent.name = projectName
        if (author) packageContent.author = author
        if (description) packageContent.description = description
        fs.writeFile(
          path.resolve(process.cwd(), projectName, 'package.json'),
          JSON.stringify(packageContent, null, 2),
          'utf8',
          (err, data) => {
            if (err) {
              return reject(err)
            }
            resolve()
          }
        )
      }
    )
  })
}
