<script setup lang="ts">
import { ref } from 'vue'

type WeatherMode = 'sunny' | 'windy' | 'stormy'

const weatherMode = ref<WeatherMode>('sunny')
const isWindy = ref<boolean>(true)
</script>

<template>
  <div class="weather-container">
    <h3>Widget del Tiempo</h3>
    <div class="weather-controls">
      <button @click="weatherMode = 'sunny'; isWindy = false">☀️ Soleado</button>
      <button @click="weatherMode = 'windy'; isWindy = true">💨 Ventoso</button>
      <button @click="weatherMode = 'stormy'; isWindy = true">⛈️ Tormenta</button>
    </div>
    
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="weather-svg">
      <!-- Rayos del sol -->
      <g class="sun-rays">
        <line x1="100" y1="20" x2="100" y2="40" stroke="#FFD700" stroke-width="3" />
        <line x1="100" y1="160" x2="100" y2="180" stroke="#FFD700" stroke-width="3" />
        <line x1="20" y1="100" x2="40" y2="100" stroke="#FFD700" stroke-width="3" />
        <line x1="160" y1="100" x2="180" y2="100" stroke="#FFD700" stroke-width="3" />
        <line x1="40" y1="40" x2="55" y2="55" stroke="#FFD700" stroke-width="3" />
        <line x1="145" y1="145" x2="160" y2="160" stroke="#FFD700" stroke-width="3" />
        <line x1="145" y1="55" x2="160" y2="40" stroke="#FFD700" stroke-width="3" />
        <line x1="40" y1="160" x2="55" y2="145" stroke="#FFD700" stroke-width="3" />
      </g>
      
      <!-- Sol -->
      <circle cx="100" cy="100" r="30" fill="gold" class="sun-circle" />
      
      <!-- Nube trasera -->
      <path 
        id="cloud-back" 
        d="M 60 120 Q 50 110, 60 100 Q 70 90, 85 95 Q 95 85, 110 95 Q 120 90, 130 100 Q 140 110, 130 120 Z" 
        fill="#d3d3d3" 
        class="cloud-back"
      />
      
      <!-- Nube frontal -->
      <path 
        id="cloud-front" 
        :class="{ 'agitated': isWindy }" 
        d="M 80 140 Q 70 130, 80 120 Q 90 110, 105 115 Q 115 105, 130 115 Q 140 110, 150 120 Q 160 130, 150 140 Z" 
        fill="white" 
        class="cloud-front"
      />
    </svg>
  </div>
</template>

<style scoped>
.weather-container {
  padding: 20px;
  text-align: center;
}

.weather-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.weather-controls button {
  padding: 8px 16px;
  border: none;
  background-color: #2196F3;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.weather-controls button:hover {
  background-color: #0b7dda;
}

.weather-svg {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.sun-rays {
  animation: rotate-sun 10s linear infinite;
  transform-origin: center;
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: rotate-sun 10s linear infinite, draw-rays 2s ease-out forwards;
}

@keyframes rotate-sun {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes draw-rays {
  to {
    stroke-dashoffset: 0;
  }
}

.sun-circle {
  transform-origin: center;
}

.cloud-back {
  animation: drift-slow 5s ease-in-out infinite alternate;
}

.cloud-front {
  animation: drift 4s ease-in-out infinite alternate;
}

.cloud-front.agitated {
  animation: drift-fast 2s ease-in-out infinite alternate;
}

@keyframes drift {
  from {
    transform: translateX(-5px);
  }
  to {
    transform: translateX(5px);
  }
}

@keyframes drift-slow {
  from {
    transform: translateX(-3px);
  }
  to {
    transform: translateX(3px);
  }
}

@keyframes drift-fast {
  from {
    transform: translateX(-10px);
  }
  to {
    transform: translateX(10px);
  }
}
</style>
