<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const amplitude = ref(50)
const frequency = ref(0.02)
let offset = 0
let animationId: number | null = null
let cachedGradient: CanvasGradient | null = null

const createGradient = (ctx: CanvasRenderingContext2D, width: number) => {
  if (!cachedGradient) {
    cachedGradient = ctx.createLinearGradient(0, 0, width, 0)
    cachedGradient.addColorStop(0, '#00ff00')
    cachedGradient.addColorStop(0.5, '#00ffff')
    cachedGradient.addColorStop(1, '#00ff00')
  }
  return cachedGradient
}

const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height)
  
  const gradient = createGradient(ctx, width)
  
  ctx.beginPath()
  ctx.lineWidth = 3
  ctx.strokeStyle = gradient
  
  // Reducido a 300 puntos (cada 2px) para mejor rendimiento
  for (let x = 0; x < width; x += 2) {
    const y = height / 2 + Math.sin(x * frequency.value + offset) * amplitude.value
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  
  ctx.stroke()
  offset -= 0.1
  animationId = requestAnimationFrame(() => draw(ctx, width, height))
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  canvas.width = 600
  canvas.height = 300
  
  const ctx = canvas.getContext('2d')
  if (ctx) draw(ctx, canvas.width, canvas.height)
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  cachedGradient = null
})
</script>

<template>
  <div class="energy-container">
    <h3>Monitor de Consumo Energético (Optimizado)</h3>
    <canvas ref="canvasRef" class="energy-canvas"></canvas>
    <div class="controls">
      <div class="control-group">
        <label>Intensidad: {{ amplitude }}</label>
        <input 
          type="range" 
          min="10" 
          max="100" 
          v-model.number="amplitude"
        />
      </div>
      <div class="control-group">
        <label>Frecuencia: {{ (frequency * 100).toFixed(1) }}</label>
        <input 
          type="range" 
          min="0.01" 
          max="0.05" 
          step="0.001"
          v-model.number="frequency"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.energy-container {
  padding: 20px;
  background-color: #0a0a0a;
  border-radius: 10px;
}

.energy-container h3 {
  color: #00ff00;
  text-align: center;
}

.energy-canvas {
  display: block;
  margin: 20px auto;
  background-color: #000;
  border: 2px solid #00ff00;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  will-change: contents;
}

.controls {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-top: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-group label {
  color: #00ff00;
  font-family: monospace;
  font-size: 0.9em;
}

.control-group input[type="range"] {
  width: 200px;
}
</style>
