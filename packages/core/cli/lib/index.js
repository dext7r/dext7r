'use strict'

const pkg = require('../package.json')
const log = require('npmlog')
const init = require('@dext7r/init')
const semver = require('semver')
const colors = require('colors/safe')
const rootCheck = require('root-check')
const userHome = require('user-home')
const path = require('path')
const pathExists = require('path-exists').sync
const commander = require('commander')
const dotenv = require('dotenv')
const constant = require('./const')

module.exports = core

const program = new commander.Command()

async function core(argv) {
  try {
    await prepare()
    registerCommand()
  } catch (e) {
    log.error(e.message)
  }
}

function checkPkgVersion() {
  log.addLevel('success', 2000, { fg: 'green' })
  log.success('dext7r', pkg.version)
}

function checkNodeVersion() {
  // 1.获取当前Node版本号
  const currentNodeVersion = process.version
  // 2.比对最低版本号
  const lowestNodeVersion = constant.LOWEST_NODE_VERSION

  if (!semver.gte(currentNodeVersion, lowestNodeVersion)) {
    throw new Error(
      colors.red(`dext7r 需要安装 v${lowestNodeVersion}以上版本的 Node.js`)
    )
  }
}

function checkRoot() {
  rootCheck()
}

function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在'))
  }
}

function createDefaultConfig() {
  const linkConfig = {
    home: userHome,
  }

  if (process.env.LINK_HOME_PATH) {
    linkConfig['Dext7r'] = path.join(userHome, process.env.LINK_HOME_PATH)
  } else {
    linkConfig['Dext7r'] = path.join(userHome, constant.DEFAULT_LINK_HOME_PATH)
  }

  process.env.LINK_HOME_PATH = linkConfig.Dext7r
}

function checkEnv() {
  const envPath = path.resolve(userHome, '.env')
  if (pathExists(envPath)) {
    dotenv.config({
      path: envPath,
    })
  }

  createDefaultConfig()
}

function registerCommand(argv) {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)

  program
    // .command('init [projectName]')
    .command('init [projectName]')
    .option('-y, --yes', '是否跳过自定义直接下载', false)
    .action(init)

  program.on('option:debug', () => {
    const { debug } = program._optionValues || {}
    if (debug) {
      process.env.LINK_LOG_LEVEL = 'verbose'
    } else {
      process.env.LINK_LOG_LEVEL = 'info'
    }
    log.level = process.env.LINK_LOG_LEVEL

    log.verbose('debug', debug)
  })

  program.on('option:targetPath', () => {
    const { targetPath } = program._optionValues || {}
    process.env.LINK_TARGET_PATH = targetPath
  })

  program.on('command:*', (commands) => {
    const availabelCommands = program.commands.map((command) => command.name())
    console.log(colors.red(`not found command: ${commands[0]}`))
    if (availabelCommands.length > 0) {
      console.log(
        colors.green(`availabel command: ${availabelCommands.join(',')}`)
      )
    }
  })

  program.parse(argv)
}

async function prepare() {
  checkPkgVersion()
  checkNodeVersion()
  checkRoot()
  checkUserHome()
  checkEnv()
}
