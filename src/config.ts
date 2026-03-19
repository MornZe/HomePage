export interface SiteConfig {
  /** 网站标题 */
  title: string
  /** 名字（显示在页面中央） */
  name: {
    firstName: string
    lastName: string
  }
  /** 座右铭 */
  motto: string
  /** 头像路径（相对于 public 目录） */
  avatar: string
  /** 背景图片 URL */
  backgroundImage: string
  /** 技术栈列表 */
  techStack: string[]
  /** 正在学习的技术 */
  learning: string
  /** 社交链接 */
  social: {
    github?: string
    email?: string
    twitter?: string
    linkedin?: string
  }
  /** 页脚版权名称 */
  copyright: string
}

export const config: SiteConfig = {
  title: 'MornZe | Home',
  name: {
    firstName: 'Morn',
    lastName: 'Ze'
  },
  motto: 'I write code in a language some declared dead. It pays my bills. We both win.',
  avatar: '/images/avatar.jpg',
  backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
  techStack: ['PHP', 'Vue.js', 'MySQL', 'TypeScript'],
  learning: 'Hyperf & Nuxt.js',
  social: {
    github: 'https://github.com/MornZe',
    email: 'mailto:hello@mornze.dev'
  },
  copyright: 'MornZe'
}
