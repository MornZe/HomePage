# HomePage

基于 Vue＆Sass 开发的个人主页，以极简设计语言营造私密、静谧的浏览体验，让每一次打开都是优雅的回归。

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 生产构建
pnpm run build
```

## 配置

编辑 [`src/config.ts`](src/config.ts) 文件来定制你的主页信息：

```typescript
export const config: SiteConfig = {
  title: 'MornZe | Home',
  name: { firstName: 'Morn', lastName: 'Ze' },
  motto: 'I write code...',
  avatar: '/images/avatar.jpg',
  backgroundImage: 'https://...',
  techStack: ['PHP', 'Vue.js', 'MySQL', 'TypeScript'],
  learning: 'Hyperf & Nuxt.js',
  social: { github: '...', email: '...' },
  copyright: 'MornZe'
}
```

## 目录结构

```
HomePage/
├── public/images/avatar.jpg   # 头像图片
├── src/
│   ├── components/HomePage.vue
│   ├── styles/                # Sass 样式
│   ├── config.ts              # 配置文件
│   └── ...
└── ...
```

## License

MIT
