<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { config } from '../config'

const isTyping = ref(true)
const mottoText = ref('')
const bgX = ref(0)
const bgY = ref(0)

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

// 视差效果
const handleMouseMove = (e: MouseEvent) => {
  bgX.value = (window.innerWidth - e.pageX * 2) / 100
  bgY.value = (window.innerHeight - e.pageY * 2) / 100
}

onMounted(() => {
  typeWriter()
  window.addEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="home-page">
    <!-- 背景 -->
    <div 
      class="bg-layer" 
      :style="{ 
        backgroundImage: `url(${config.backgroundImage})`,
        transform: `scale(1.05) translate(${bgX}px, ${bgY}px)`
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
        <div class="learning-text">// learning {{ config.learning }}</div>
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
  transition: transform 0.1s ease-out;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.4);
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
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  &.cursor::after {
    content: '|';
    animation: blink 1.2s step-start infinite;
    color: rgba(255, 255, 255, 0.4);
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
  font-weight: 400;

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
  margin-bottom: 3rem;
}

.learning-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
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
