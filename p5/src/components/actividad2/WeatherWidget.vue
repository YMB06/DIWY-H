<script setup lang="ts">
import { ref } from 'vue'
import sunIcon from '@/assets/icons8-sun.svg'
import cloudsIcon from '@/assets/clouds-svgrepo-com.svg'

type WeatherMode = 'sunny' | 'windy' | 'stormy'

const weatherMode = ref<WeatherMode>('sunny')
const isWindy = ref<boolean>(false)
</script>

<template>
  <div class="weather-container">
    <h3>Widget del Tiempo</h3>
    <div class="weather-controls">
      <button @click="weatherMode = 'sunny'; isWindy = false" :class="{ active: weatherMode === 'sunny' }">☀️ Soleado</button>
      <button @click="weatherMode = 'windy'; isWindy = true" :class="{ active: weatherMode === 'windy' }">💨 Ventoso</button>
      <button @click="weatherMode = 'stormy'; isWindy = true" :class="{ active: weatherMode === 'stormy' }">⛈️ Tormenta</button>
    </div>
    
    <div class="weather-display">
      <!-- Sol con rayos animados -->
      <svg 
        v-show="weatherMode === 'sunny'"
        class="sun-svg" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 48 48" 
        width="200px" 
        height="200px"
      >
        <g class="sun-rays">
          <rect x="11" y="11" fill="#FF9800" width="26" height="26"/>
          <rect 
            x="11.272" 
            y="11.272" 
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.9411 24)" 
            fill="#FF9800" 
            width="25.456" 
            height="25.456"
          />
        </g>
        <path 
          class="sun-circle"
          fill="#FFEB3B" 
          d="M13,24c0,6.077,4.923,11,11,11c6.076,0,11-4.923,11-11s-4.924-11-11-11C17.923,13,13,17.923,13,24"
        />
      </svg>

      <!-- Nubes con animación -->
      <svg 
        v-show="weatherMode === 'windy'"
        class="clouds-svg cloud-back"
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        width="180px"
        height="180px"
      >
        <path 
          opacity="0.5" 
          d="M22 12.3529C22 9.88113 20.393 7.78024 18.1551 7.01498M6.28571 18C3.91878 18 2 16.1038 2 13.7647C2 11.4256 3.91878 9.52941 6.28571 9.52941C6.56983 9.52941 6.8475 9.55673 7.11616 9.60887M14.381 7.02721C14.9767 6.81911 15.6178 6.70588 16.2857 6.70588C16.9404 6.70588 17.5693 6.81468 18.1551 7.01498M7.11616 9.60887C6.88706 8.9978 6.7619 8.33687 6.7619 7.64706C6.7619 4.52827 9.32028 2 12.4762 2C15.4159 2 17.8371 4.19371 18.1551 7.01498M7.11616 9.60887C7.68059 9.71839 8.20528 9.9374 8.66667 10.2426" 
          stroke="#94a3b8" 
          stroke-width="1.5" 
          stroke-linecap="round"
        />
      </svg>

      <svg 
        v-show="weatherMode === 'windy' || weatherMode === 'stormy'"
        class="clouds-svg cloud-front"
        :class="{ 'agitated': isWindy, 'dark': weatherMode === 'stormy' }"
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        width="220px"
        height="220px"
      >
        <path 
          d="M17.0476 15.142C17.4349 15.0119 17.8516 14.9412 18.2857 14.9412C18.7113 14.9412 19.1201 15.0092 19.5008 15.1344M12.3255 16.7555C12.1509 16.723 11.9704 16.7059 11.7857 16.7059C10.2472 16.7059 9 17.891 9 19.3529C9 20.8149 10.2472 22 11.7857 22H18.2857C20.3371 22 22 20.4198 22 18.4706C22 16.9257 20.9554 15.6126 19.5008 15.1344M12.3255 16.7555C12.1766 16.3736 12.0952 15.9605 12.0952 15.5294C12.0952 13.5802 13.7582 12 15.8095 12C17.7203 12 19.2941 13.3711 19.5008 15.1344M12.3255 16.7555C12.6924 16.824 13.0334 16.9609 13.3333 17.1516" 
          stroke="#e2e8f0" 
          stroke-width="1.5" 
          stroke-linecap="round"
        />
      </svg>
    </div>
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

.weather-controls button.active {
  background-color: #1565C0;
  font-weight: bold;
}

.weather-display {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun-svg {
  position: absolute;
  z-index: 1;
  transition: opacity 0.5s ease;
}

.sun-svg.hidden {
  opacity: 0;
}

.sun-rays {
  transform-origin: center;
  animation: rotate-sun 10s linear infinite;
}

@keyframes rotate-sun {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.sun-circle {
  transform-origin: center;
  animation: pulse-sun 3s ease-in-out infinite;
}

@keyframes pulse-sun {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.clouds-svg {
  position: absolute;
  transition: all 0.3s ease;
}

.cloud-back {
  z-index: 2;
  top: 20%;
  left: 10%;
  animation: drift-slow 6s ease-in-out infinite alternate;
}

.cloud-front {
  z-index: 3;
  top: 40%;
  left: 20%;
  animation: drift 4s ease-in-out infinite alternate;
}

.cloud-front.dark {
  filter: brightness(0.5);
}

.cloud-front.agitated {
  animation: drift-fast 1.5s ease-in-out infinite alternate;
}

.cloud-back.agitated {
  animation: drift-fast-back 2s ease-in-out infinite alternate;
}

@keyframes drift {
  from {
    transform: translateX(-8px);
  }
  to {
    transform: translateX(8px);
  }
}

@keyframes drift-slow {
  from {
    transform: translateX(-5px);
  }
  to {
    transform: translateX(5px);
  }
}

@keyframes drift-fast {
  from {
    transform: translateX(-15px);
  }
  to {
    transform: translateX(15px);
  }
}

@keyframes drift-fast-back {
  from {
    transform: translateX(-12px);
  }
  to {
    transform: translateX(12px);
  }
}
</style>
