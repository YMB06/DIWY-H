<template>
  <div class="barista-landing">

    <!-- Hero fijo mientras se hace scroll -->
    <div class="sticky-scene">
      <canvas ref="canvasEl" class="lottie-canvas"></canvas>

      <!-- Tarjetas informativas coordinadas con el scroll -->
      <div
        v-for="card in visibleCards"
        :key="card.id"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        :leave="{ opacity: 0, y: -20, transition: { duration: 300 } }"
        :style="card.style"
        class="info-card"
      >
        <span class="card-icon">{{ card.icon }}</span>
        <div>
          <div class="card-label">{{ card.label }}</div>
          <div class="card-value">{{ card.value }}</div>
        </div>
      </div>

      <!-- Indicador de progreso -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ height: progress * 100 + '%' }"></div>
      </div>

      <div class="scroll-hint" :style="{ opacity: progress < 0.05 ? 1 : 0 }">
        <span>Scroll para preparar tu café</span>
        <span class="arrow">↓</span>
      </div>
    </div>

    <!-- Espacio de scroll (altura = zona de animación) -->
    <div class="scroll-space"></div>

    <!-- Sección final -->
    <div class="final-section">
      <div
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 700 } }"
        class="final-content"
      >
        <h2>☕ Tu café está listo</h2>
        <p>Elaborado con granos de origen único, tostado artesanal y preparado a la temperatura perfecta.</p>
        <button class="cta-btn">Descubrir nuestra selección</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { DotLottie } from '@lottiefiles/dotlottie-web'

const canvasEl = ref<HTMLCanvasElement>()
let lottie: DotLottie | null = null
let totalFrames = 0

// Scroll tracking
const scrollY = ref(0)
const docHeight = ref(1)

function onScroll() {
  scrollY.value = window.scrollY
  docHeight.value = document.documentElement.scrollHeight - window.innerHeight
}

// progress: 0 → 1 basado en la zona de scroll de la sticky scene
// La sticky scene ocupa 100vh, el scroll-space añade 300vh de recorrido
const progress = computed(() => Math.min(1, Math.max(0, scrollY.value / (docHeight.value * 0.75))))

// Sincronizar frame de Lottie con el scroll
let lastFrame = -1
function syncLottie() {
  if (!lottie || totalFrames === 0) return
  const frame = Math.round(progress.value * (totalFrames - 1))
  if (frame !== lastFrame) {
    lottie.setFrame(frame)
    lastFrame = frame
  }
  requestAnimationFrame(syncLottie)
}

// Tarjetas: aparecen según el progreso del scroll
const cards = [
  {
    id: 'temp',
    icon: '🌡️',
    label: 'Temperatura',
    value: '92 °C',
    from: 0.15,
    to: 0.45,
    style: { top: '20%', left: '5%' },
  },
  {
    id: 'grind',
    icon: '⚙️',
    label: 'Molienda',
    value: 'Media-fina',
    from: 0.3,
    to: 0.6,
    style: { top: '35%', right: '5%' },
  },
  {
    id: 'time',
    icon: '⏱️',
    label: 'Tiempo de extracción',
    value: '27 segundos',
    from: 0.5,
    to: 0.8,
    style: { top: '55%', left: '5%' },
  },
  {
    id: 'origin',
    icon: '🌍',
    label: 'Origen',
    value: 'Etiopía Yirgacheffe',
    from: 0.65,
    to: 0.95,
    style: { top: '65%', right: '5%' },
  },
]

const visibleCards = computed(() =>
  cards.filter(c => progress.value >= c.from && progress.value <= c.to),
)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  lottie = new DotLottie({
    canvas: canvasEl.value!,
    src: '/Hot Smiling Coffee _ Good Morning.json',
    autoplay: false,
    loop: false,
  })

  lottie.addEventListener('load', () => {
    totalFrames = lottie!.totalFrames
    lottie!.setFrame(0)
    syncLottie()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  lottie?.destroy()
})
</script>

<style scoped>
.barista-landing {
  background: #1a0a00;
  color: white;
  font-family: 'Georgia', serif;
}

/* La escena ocupa toda la pantalla y se queda fija mientras se scrollea */
.sticky-scene {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lottie-canvas {
  width: 480px;
  height: 480px;
  max-width: 90vw;
  max-height: 90vw;
}

/* Espacio que genera el recorrido de scroll */
.scroll-space {
  height: 300vh;
}

/* Tarjetas flotantes */
.info-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 200, 100, 0.25);
  border-radius: 14px;
  padding: 0.85rem 1.2rem;
  min-width: 190px;
  pointer-events: none;
}

.card-icon { font-size: 1.6rem; }
.card-label { font-size: 0.75rem; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.05em; }
.card-value { font-size: 1.05rem; font-weight: 700; color: #f6c87a; }

/* Barra de progreso lateral */
.progress-bar {
  position: absolute;
  right: 1.5rem;
  top: 10%;
  height: 80%;
  width: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.progress-fill {
  width: 100%;
  background: linear-gradient(to bottom, #f6c87a, #c0392b);
  border-radius: 2px;
  transition: height 0.1s linear;
}

/* Hint de scroll */
.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  transition: opacity 0.4s;
  font-size: 0.9rem;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.arrow {
  font-size: 1.4rem;
  animation: bounce 1.2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* Sección final */
.final-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, #3b1a00 0%, #1a0a00 70%);
  padding: 4rem 2rem;
}

.final-content {
  text-align: center;
  max-width: 560px;
}

.final-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #f6c87a;
}

.final-content p {
  font-size: 1.2rem;
  line-height: 1.8;
  opacity: 0.85;
  margin-bottom: 2rem;
}

.cta-btn {
  background: linear-gradient(135deg, #c0392b, #e67e22);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(192, 57, 43, 0.5);
}
</style>
