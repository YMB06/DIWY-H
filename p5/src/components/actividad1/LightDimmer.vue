<script setup lang="ts">
import { ref } from 'vue'

const intensity = ref<number>(50)
</script>

<template>
  <div class="dimmer-container">
    <h3>Regulador de Intensidad</h3>
    <div class="dimmer-controls">
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model.number="intensity"
        class="slider"
      />
      <div 
        class="bulb-icon"
        :style="{
          transform: `scale(${0.5 + intensity / 100})`,
          filter: `drop-shadow(0 0 ${intensity / 5}px rgba(255, 215, 0, ${intensity / 100}))`
        }"
      >
        💡
      </div>
    </div>
    <p>Intensidad: {{ intensity }}%</p>
  </div>
</template>

<style scoped>
.dimmer-container {
  padding: 20px;
}

.dimmer-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.slider {
  flex: 1;
  height: 8px;
}

.bulb-icon {
  font-size: 3em;
  transition: transform 0.3s ease, filter 0.3s ease;
}
</style>
