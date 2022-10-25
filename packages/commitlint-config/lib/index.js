module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        // 新功能 feature
        'feat',
        // 修复 bug
        'fix',
        // 文档注释
        'docs',
        // 代码格式(不影响代码运行的变动)
        'style',
        // 重构(既不增加新功能，也不是修复bug)
        'refactor',
        // 性能优化
        'perf',
        // 增加测试
        'test',
        // 构建过程或辅助工具的变动
        'chore',
        // 回退
        'revert',
        // 打包
        'build',
      ],
    ],
    // 提交的commit的message列表
    // subject 大小写不做校验
    'subject-case': [0, 'never'],
    // 头部信息最大长度为80个字符
    'header-max-length': [2, 'always', 80],
    // 头部信息最小长度为10个字符
    'header-min-length': [2, 'always', 5],
  },
}
