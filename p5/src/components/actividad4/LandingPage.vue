<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import FeatureCard from './FeatureCard.vue'

const heroRef = ref<HTMLElement | null>(null)
const featuresRef = ref<HTMLElement | null>(null)

const features = [
  {
    icon: '💡',
    title: 'Control de Iluminación',
    description: 'Ajusta la intensidad y color de tus luces desde cualquier lugar',
  },
  {
    icon: '🔒',
    title: 'Seguridad Avanzada',
    description: 'Monitoreo 24/7 con alertas en tiempo real y cámaras inteligentes',
  },
  {
    icon: '🌡️',
    title: 'Climatización Inteligente',
    description: 'Control automático de temperatura para máximo confort y ahorro',
  },
  {
    icon: '⚡',
    title: 'Eficiencia Energética',
    description: 'Reduce tu consumo hasta un 40% con gestión inteligente',
  },
  {
    icon: '🎵',
    title: 'Audio Multiroom',
    description: 'Música sincronizada en todas las habitaciones de tu hogar',
  },
  {
    icon: '📱',
    title: 'Control Remoto',
    description: 'Gestiona tu hogar desde tu smartphone estés donde estés',
  },
]

onMounted(() => {
  gsap.from(heroRef.value, {
    duration: 1.2,
    y: -50,
    opacity: 0,
    ease: 'power3.out',
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.feature-card')
          gsap.from(cards, {
            duration: 1,
            y: 50,
            rotation: 5,
            opacity: 0,
            ease: 'back.out(1.7)',
            stagger: 0.2,
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  if (featuresRef.value) observer.observe(featuresRef.value)
})
</script>

<template>
  <div class="landing-page">
    <section ref="heroRef" class="hero-section">
      <h1 class="hero-title">🏠 Smart Home</h1>
      <p class="hero-subtitle">El futuro de tu hogar, hoy</p>
      <p class="hero-description">
        Transforma tu casa en un hogar inteligente con tecnología de vanguardia
      </p>
    </section>

    <section class="features-section">
      <h2 class="section-title">Funcionalidades</h2>
      <div ref="featuresRef" class="features-grid">
        <FeatureCard
          v-for="(feature, index) in features"
          :key="index"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </section>

    <section class="cta-section">
      <h2>¿Listo para el cambio?</h2>
      <button class="cta-button">Solicitar Demo</button>
    </section>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
}

.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  color: white;
}

.hero-title {
  font-size: 4em;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 2em;
  margin-bottom: 20px;
  color: #e0e0e0;
}

.hero-description {
  font-size: 1.2em;
  max-width: 600px;
  color: #b0b0b0;
}

.features-section {
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5em;
  text-align: center;
  color: white;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.cta-section {
  padding: 100px 20px;
  text-align: center;
  color: white;
}

.cta-section h2 {
  font-size: 2.5em;
  margin-bottom: 30px;
}

.cta-button {
  padding: 18px 50px;
  font-size: 1.2em;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}
</style>
