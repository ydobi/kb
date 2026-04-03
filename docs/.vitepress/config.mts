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
          collapsed: false,
          items: [
            { text: '概述', link: '/ai-coding/' }
          ]
        },
        {
          text: 'AI 编辑器/IDE',
          collapsed: false,
          items: [
            { text: 'Cursor', link: '/ai-coding/ai-editors/cursor' },
            { text: 'Copilot', link: '/ai-coding/ai-editors/copilot' },
            { text: 'Claude Code', link: '/ai-coding/ai-editors/claude-code' }
          ]
        },
        {
          text: 'Prompt 技巧',
          collapsed: false,
          items: [
            { text: '概述', link: '/ai-coding/prompt-skills/' }
          ]
        },
        {
          text: 'AI 辅助工作流',
          collapsed: false,
          items: [
            { text: '概述', link: '/ai-coding/ai-workflow/' },
            {
              text: '2026 渐进式 Spec 实战指南',
              link: '/ai-coding/ai-workflow/2026渐进式Spec实战指南-逸驹'
            },
            {
              text: 'Harness 与 SDD 还有意义吗',
              link: '/ai-coding/ai-workflow/Harness与SDD还有意义吗-何艺萍'
            },
            {
              text: '胶水编程：业务出码实践（天猫）',
              link: '/ai-coding/ai-workflow/胶水编程业务出码实践-天猫珈文'
            }
          ]
        },
        {
          text: 'AI 开发框架',
          collapsed: false,
          items: [
            { text: '概述', link: '/ai-coding/ai-frameworks/' }
          ]
        }
      ],
      '/frontend/': [
        {
          text: '前端开发',
          collapsed: false,
          items: [
            { text: '概述', link: '/frontend/' }
          ]
        },
        {
          text: '框架',
          collapsed: false,
          items: [
            { text: 'React', link: '/frontend/frameworks/react' },
            { text: 'Vue', link: '/frontend/frameworks/vue' }
          ]
        },
        {
          text: '语言基础',
          collapsed: false,
          items: [
            { text: 'TypeScript', link: '/frontend/languages/typescript' }
          ]
        },
        {
          text: '构建工具',
          collapsed: false,
          items: [
            { text: '概述', link: '/frontend/build-tools/' }
          ]
        },
        {
          text: '工程化实践',
          collapsed: false,
          items: [
            { text: '概述', link: '/frontend/engineering/' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具',
          collapsed: false,
          items: [
            { text: '概述', link: '/tools/' }
          ]
        },
        {
          text: '编辑器',
          collapsed: false,
          items: [
            { text: 'VS Code', link: '/tools/editors/vscode' }
          ]
        },
        {
          text: '调试工具',
          collapsed: false,
          items: [
            { text: '概述', link: '/tools/debugging/' }
          ]
        },
        {
          text: '版本控制',
          collapsed: false,
          items: [
            { text: '概述', link: '/tools/version-control/' }
          ]
        },
        {
          text: '效率提升',
          collapsed: false,
          items: [
            { text: '概述', link: '/tools/productivity/' }
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