import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/',

  locales: {
    '/': {
      lang: 'en-US',
      title: 'dext7r',
      description: 'dext7r',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'dext7r',
      description: 'dext7r',
    },
  },

  theme,

  shouldPrefetch: false,
})
