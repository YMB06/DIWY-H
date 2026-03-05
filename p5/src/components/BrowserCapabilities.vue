<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface BrowserCapabilities {
  hardwareAcceleration: boolean
  intersectionObserver: boolean
  requestAnimationFrame: boolean
  webGL: boolean
  es6Support: boolean
}

const capabilities = ref<BrowserCapabilities>({
  hardwareAcceleration: false,
  intersectionObserver: false,
  requestAnimationFrame: false,
  webGL: false,
  es6Support: false,
})

const showWarning = ref(false)

const checkCapabilities = () => {
  // Check WebGL (indica hardware acceleration)
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  capabilities.value.webGL = !!gl
  capabilities.value.hardwareAcceleration = !!gl

  // Check IntersectionObserver
  capabilities.value.intersectionObserver = 'IntersectionObserver' in window

  // Check requestAnimationFrame
  capabilities.value.requestAnimationFrame = 'requestAnimationFrame' in window

  // Check ES6 support
  try {
    eval('const test = () => {}')
    capabilities.value.es6Support = true
  } catch {
    capabilities.value.es6Support = false
  }

  // Mostrar advertencia si falta algo crítico
  showWarning.value = !capabilities.value.hardwareAcceleration || 
                       !capabilities.value.intersectionObserver ||
                       !capabilities.value.requestAnimationFrame
}

onMounted(() => {
  checkCapabilities()
})
</script>

<template>
  <div v-if="showWarning" class="browser-warning">
    <div class="warning-header">
      <span class="warning-icon">⚠️</span>
      <h3>Requisitos del Sistema</h3>
    </div>
    
    <p class="warning-message">
      Para una experiencia óptima, tu navegador debe cumplir con los siguientes requisitos:
    </p>

    <ul class="capabilities-list">
      <li :class="{ 'supported': capabilities.hardwareAcceleration, 'unsupported': !capabilities.hardwareAcceleration }">
        <span class="status-icon">{{ capabilities.hardwareAcceleration ? '✅' : '❌' }}</span>
        Aceleración por Hardware (WebGL)
      </li>
      <li :class="{ 'supported': capabilities.intersectionObserver, 'unsupported': !capabilities.intersectionObserver }">
        <span class="status-icon">{{ capabilities.intersectionObserver ? '✅' : '❌' }}</span>
        Intersection Observer API
      </li>
      <li :class="{ 'supported': capabilities.requestAnimationFrame, 'unsupported': !capabilities.requestAnimationFrame }">
        <span class="status-icon">{{ capabilities.requestAnimationFrame ? '✅' : '❌' }}</span>
        Request Animation Frame
      </li>
      <li :class="{ 'supported': capabilities.es6Support, 'unsupported': !capabilities.es6Support }">
        <span class="status-icon">{{ capabilities.es6Support ? '✅' : '❌' }}</span>
        Soporte ES6+
      </li>
    </ul>

    <div v-if="!capabilities.hardwareAcceleration" class="solution">
      <strong>💡 Solución:</strong>
      <p>Activa la aceleración por hardware en: <code>chrome://settings/system</code></p>
    </div>

    <p class="warning-footer">
      Algunas funcionalidades pueden ser lentas o no funcionar correctamente.
    </p>
  </div>
</template>

<style scoped>
.browser-warning {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.warning-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.warning-icon {
  font-size: 2em;
}

.warning-header h3 {
  margin: 0;
  font-size: 1.5em;
}

.warning-message {
  margin-bottom: 15px;
  line-height: 1.6;
}

.capabilities-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.capabilities-list li {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.capabilities-list li.supported {
  background-color: rgba(255, 255, 255, 0.1);
}

.capabilities-list li.unsupported {
  background-color: rgba(0, 0, 0, 0.2);
  font-weight: bold;
}

.status-icon {
  font-size: 1.2em;
}

.solution {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
}

.solution code {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 8px;
  border-radius: 3px;
  font-family: monospace;
}

.warning-footer {
  margin-top: 15px;
  font-size: 0.9em;
  opacity: 0.9;
}
</style>
