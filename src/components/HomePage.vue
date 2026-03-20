<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { config } from '../config'

declare const __BUILD_INFO__: {
  branch: string
  commitSha: string
}

const isTyping = ref(true)
const mottoText = ref('')
const bgX = ref(0)
const bgY = ref(0)

const buildInfo = __BUILD_INFO__

// 打字机效果
const typeWriter = () => {
  const text = config.motto
  let i = 0

  const type = () => {
    if (i < text.length) {
      mottoText.value += text.charAt(i)
      i++
      setTimeout(type, 45)
    } else {
      isTyping.value = false
    }
  }

  setTimeout(type, 600)
}

// 平滑视差效果
let targetX = 0
let targetY = 0

const handleMouseMove = (e: MouseEvent) => {
  targetX = (window.innerWidth / 2 - e.clientX) / 40
  targetY = (window.innerHeight / 2 - e.clientY) / 40
}

const animateBG = () => {
  bgX.value += (targetX - bgX.value) * 0.08
  bgY.value += (targetY - bgY.value) * 0.08
  requestAnimationFrame(animateBG)
}

onMounted(() => {
  typeWriter()
  window.addEventListener('mousemove', handleMouseMove)
  animateBG()
})
</script>

<template>
  <div class="home-page">
    <!-- 背景 -->
    <div
      class="bg-layer"
      :style="{
        backgroundImage: `url(${config.backgroundImage})`,
        transform: `scale(1.08) translate(${bgX}px, ${bgY}px)`
      }"
    />
    <div class="overlay" />

    <!-- 主内容 -->
    <div class="main-container">
      <!-- 头像 -->
      <div class="avatar-wrap fade-in">
        <div class="avatar">
          <img :src="config.avatar" :alt="config.name.firstName + config.name.lastName" />
        </div>
        <div class="status-dot" />
      </div>

      <!-- 名字 -->
      <h1 class="name fade-in delay-1">
        {{ config.name.firstName }}<span>{{ config.name.lastName }}</span>
      </h1>

      <!-- 座右铭 -->
      <p class="motto fade-in delay-2" :class="{ cursor: isTyping }">
        {{ mottoText }}
      </p>

      <!-- 博客链接 -->
      <div v-if="config.blog" class="blog-wrap fade-in delay-3">
        <a :href="config.blog.url" target="_blank" rel="noopener noreferrer" class="blog-link">
          → {{ config.blog.label }}
        </a>
      </div>

      <!-- 技术栈 -->
      <div class="tech-section fade-in delay-3">
        <div class="tech-label">Tech Stack</div>
        <div class="tech-list">
          <span v-for="tech in config.techStack" :key="tech">
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- 学习中 -->
      <div class="learning-section fade-in delay-3">
        <div class="learning-text">learning {{ config.learning }}</div>
      </div>

      <!-- 状态行 -->
      <div v-if="config.statusLine" class="status-line fade-in delay-4">
        {{ config.statusLine }}
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer fade-in delay-4">
      <div class="footer-content">
        <a v-if="config.social.github" :href="config.social.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span v-if="config.social.github" class="footer-divider">/</span>
        <a v-if="config.social.email" :href="config.social.email">Email</a>
        <span v-if="config.social.email" class="footer-divider">/</span>
        <span>&copy; <span class="year">{{ new Date().getFullYear() }}</span> {{ config.copyright }}</span>
        <template v-if="config.showBuildInfo">
          <span class="footer-divider">/</span>
          <span class="build-info">
            <span class="build-id">{{ buildInfo.commitSha }}@{{ buildInfo.branch }}</span>
          </span>
        </template>
      </div>
      <div class="vercel-link">
        <span>本站由</span>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="vercel-logo">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0L16 14H0L8 0Z" fill="currentColor"/>
          </svg>
          <span>Vercel</span>
        </a>
        <span>强力赞助驱动</span>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.home-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-size: cover;
  background-position: center;
  will-change: transform;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
}

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px 80px;
}

.avatar-wrap {
  position: relative;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.status-dot {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 14px;
  height: 14px;
  background: #10b981;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.5);
}

.name {
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s ease;

  &:hover {
    transform: translateY(-2px);
  }

  span {
    color: rgba(255, 255, 255, 0.5);
  }
}

.motto {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-style: italic;
  text-align: center;
  max-width: 480px;
  margin-bottom: 1.2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  &.cursor::after {
    content: '|';
    animation: blink 1.2s step-start infinite;
    color: rgba(255, 255, 255, 0.4);
  }
}

.blog-wrap {
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.blog-link {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: translateX(4px);
  }
}

.tech-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.tech-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.tech-list {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);

  span {
    margin: 0 0.3rem;

    &:not(:last-child)::after {
      content: '·';
      margin-left: 0.6rem;
      color: rgba(255, 255, 255, 0.3);
    }
  }
}

.learning-section {
  text-align: center;
  margin-bottom: 2rem;
}

.learning-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);

  &::before {
    content: '//';
    margin-right: 0.5rem;
    color: rgba(255, 255, 255, 0.3);
  }
}

.status-line {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.08em;
  text-align: center;
  margin-top: -0.5rem;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  text-align: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
}

.footer-content {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    margin: 0 0.5rem;
    transition: color 0.2s ease;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.footer-divider {
  margin: 0 0.5rem;
  color: rgba(255, 255, 255, 0.2);
}

.build-info {
  display: inline-flex;
  align-items: center;
}

.build-id {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  font-family: monospace;
}

.vercel-link {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  .vercel-logo {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.2s ease;

    svg {
      width: 14px;
      height: 14px;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.95);

      svg {
        transform: scale(1.1);
      }
    }
  }
}

// 动画
.fade-in {
  animation: fadeIn 0.8s ease forwards;
  opacity: 0;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes blink {
  50% { opacity: 0; }
}
</style>
