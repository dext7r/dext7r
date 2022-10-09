module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    // airbnb => eslint-config-airbnb-base eslint eslint-plugin-import
    'airbnb',
    // airbnb 默认未开启 React hooks
    'airbnb/hooks',
    // 'airbnb-base', //如果不需要React时使用，例如Vue
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['html', 'react', '@typescript-eslint', 'react-hooks', 'import'],
  ignorePatterns: ['.prettierrc.js', '.stylelintrc.js', 'node_modules/', 'build/', 'dist/'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // 检查依赖项的声明
    'react-hooks/exhaustive-deps': 'warn',
    // 检查 Hook 的规则, 禁止在循环，条件或嵌套函数中使用
    'react-hooks/rules-of-hooks': 'error',
    // 限制包含jsx代码的文件扩展名
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
    'react/jsx-props-no-spreading': [0],
    'react/prop-types': [0],
    // 防止闭包组件内存泄漏
    'react/no-unstable-nested-components': [1],
    // hooks命名错误警告: 正确示例: useMyhook; 错误示例: getMyhook
    'react-hooks/rules-of-hooks': [1],
    // 使用JSX时防止丢失React
    'react/react-in-jsx-scope': 1,
    // 组件中强制要求解构赋值: 关闭
    'react/destructuring-assignment': 0,
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    // 不强制扩展名
    'import/extensions': [0],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/no-unresolved': [
      2,
      {
        /* @ 是设置的路径别名 */
        ignore: ['^(@|.)/'],
      },
    ],
    // 不对ts中的any类型进行校验
    '@typescript-eslint/no-explicit-any': [0],
    // 文件规范
    // 文件不能超过500行，不包括空行和注释
    'max-lines': [1, { max: 500, skipBlankLines: true, skipComments: true }],
    // 单行代码最大长度限制为120个字符
    'max-len': [1, 120],
    // 代码块的最大深度限制为4层
    'max-depth': [1, { max: 4 }],
    // 禁止单个文件出现多个class类
    'max-classes-per-file': [2, 1],
    // 禁止使用空函数
    'no-empty-function': 1,
    '@typescript-eslint/no-empty-function': [0],
    // 禁止重复模块导入
    'no-duplicate-imports': 2,
    // 禁止声明未使用的变量
    'no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': [0],
    // 禁止使用var来声明变量
    'no-var': 2,
    // 要求使用 const 声明那些声明后不再被修改的变量, 未修改的变量不能使用let声明
    'prefer-const': 2,
    // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字; 例如：import {useMemo as useMemo} from 'react';
    'no-useless-rename': 2,
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 禁止在访问属性时，属性前面有空格；例如：target .name
    'no-whitespace-before-property': 2,
    // 强制行注释的位置在代码的上方，禁止在代码末尾写注释
    // 'line-comment-position': [1, { position: 'above' }],
    // 禁止注释和代码写在同一行，注释需要单独一行
    'no-inline-comments': 1,
    // 强制使用解构而不是通过成员表达式访问属性: const array = [1, 2, 3]; const [foo] = array;
    'prefer-destructuring': [1, { object: true, array: false }],
    // 使用全等和非全等（ === 和 !==），禁止使用相等和不相等（== 和 !=）
    eqeqeq: 2,
    // 要求使用模板字面量而非字符串连接: 正确例子：c = `${a}-${b}`;  错误例子：c = a + '-' + b;
    'prefer-template': 2,
    // 强制使用驼峰式写法命名约定: 正确例子：const aB = 1;  错误例子：const a_b = 1;
    camelcase: 2,
    // 强制使用一致单引号；正确例子：const str = ''; 错误例子：const str = "";
    quotes: [2, 'single'],
    // 强制在 JSX 属性中使用一致的单引号 (jsx-quotes); 例：<div className='app' />
    'jsx-quotes': [2, 'prefer-single'],
    // 强制在对象字面量的属性中 健的后面不需要空格，值前面需要一个空格；const obj = { a: 1 }
    'key-spacing': [2, { afterColon: true, beforeColon: false }],
    // 强制使用一致的缩进风格
    indent: [2, 2],
    // 强制使用一致的分号
    semi: [2, 'always'],
    // 代码块中开括号前和闭括号后有空格: 正确例如：function foo() { return true; } 错误例子：function foo() {return true;}
    'block-spacing': 1,
    // 大括号风格要求: 强制 one true brace style
    /* 例子:
      function fn() {
      } 
    */
    'brace-style': [2, '1tbs'],
    // 强制生成器函数 *号跟function之间没有空格，*号后面有一个空格
    'generator-star-spacing': 1,
    // 强制箭头函数的箭头前后使用1个空格
    'arrow-spacing': 1,
    // 不允许 扩展运算符 跟 表达式 之间有空格. 正确例子：{ ...obj } 错误例子：{ ... obj }
    'rest-spread-spacing': 2,
    // 模板字符串使用 ${ 和 } 的表达式不允许有空格: 正确例子：`${1}` 错误例子：`${ 1 }`
    'template-curly-spacing': 2,
    // 禁止出现多行空行, 最多允许一个空行
    'no-multiple-empty-lines': [2, { max: 1 }],
    // 类成员之间必须有一个空行
    'lines-between-class-members': 2,
    // 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
    'comma-dangle': [2, 'always-multiline'],
    // 只允许在 for 循环的最后一个表达式中使用 ++ 和 --
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    // 不限制使用特定的语法
    'no-restricted-syntax': [0],
    // 取值规范
    'no-unsafe-optional-chaining': 'off',
    // 允许使用console.log
    'no-console': 'off',
    // 允许 使用嵌套三元表达式
    'no-nested-ternary': 'off',
    // 关闭【强制所有锚(a标签)都是有效的可导航元素。 href 赋值: javascript:; javascript:void(0); 是不被允许的】
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/ban-types': 'off',
    // 允许 不必要的代码片段
    'react/jsx-no-useless-fragment': 'off',
    // react组件 循环是否必须使用key属性
    'react/jsx-key': 'off',
    // 关闭 强制默认参数放在最后面
    'default-param-last': 'off',
    // 允许function在定义之前使用它们, 类和变量不允许在定义前使用他们
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    // 可以使用箭头函数来定义函数式组件
    'react/function-component-definition': [0],
    // 标识符下划线开头或结尾
    'no-underscore-dangle': [1],
    // 禁止出现未使用的表达式和 xx && xx()
    'no-unused-expressions': [1],
    // 指定返回的值
    'consistent-return': [1],
    // 禁止对`function`的参数进行重新赋值
    'no-param-reassign': [1],
    // 不允许同名变量
    'no-shadow': 2,
    // 禁止多余的`return;` 语句
    'no-useless-return': 1,
    // 禁止循环中使用`await`
    'no-await-in-loop': 1,
  },
  globals: {
    document: true,
    localStorage: true,
    window: true,
    expect: true,
    test: true,
  },
};
