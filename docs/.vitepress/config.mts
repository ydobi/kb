import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '知识库',
  description: 'AI Coding & 前端开发知识沉淀',
  base: '/kb/',

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: '知识库' }],
    ['meta', { name: 'og:description', content: 'AI Coding & 前端开发知识沉淀' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI Coding', link: '/ai-coding/' },
      { text: '前端开发', link: '/frontend/' },
      { text: '工具', link: '/tools/' },
      { text: '最佳实践', link: '/best-practices/' }
    ],

    sidebar: {
      '/ai-coding/': [
        {
          text: 'AI Coding',
          items: [
            { text: '概述', link: '/ai-coding/' },
            { text: 'Cursor', link: '/ai-coding/cursor' },
            { text: 'Copilot', link: '/ai-coding/copilot' },
            { text: 'Claude Code', link: '/ai-coding/claude-code' }
          ]
        }
      ],
      '/frontend/': [
        {
          text: '前端开发',
          items: [
            { text: '概述', link: '/frontend/' },
            { text: 'React', link: '/frontend/react' },
            { text: 'Vue', link: '/frontend/vue' },
            { text: 'TypeScript', link: '/frontend/typescript' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具',
          items: [
            { text: '概述', link: '/tools/' },
            { text: 'VS Code', link: '/tools/vscode' }
          ]
        }
      ],
      '/best-practices/': [
        {
          text: '最佳实践',
          items: [
            { text: '概述', link: '/best-practices/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/kb' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024-present'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  }
})