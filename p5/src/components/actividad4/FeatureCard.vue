<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

interface Props {
  icon: string
  title: string
  description: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
})

const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // La animación la gestiona el componente padre (LandingPage)
})
</script>

<template>
  <div ref="cardRef" class="feature-card">
    <div class="card-icon">{{ icon }}</div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.feature-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 4em;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.card-title {
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 15px;
  color: #fff;
}

.card-description {
  font-size: 1em;
  line-height: 1.6;
  opacity: 0.9;
}
</style>
