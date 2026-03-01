<script setup lang="ts">
import { ref } from 'vue'

const isPatrolling = ref<boolean>(false)

const startPatrol = () => {
  isPatrolling.value = true
  setTimeout(() => {
    isPatrolling.value = false
  }, 4000)
}
</script>

<template>
  <div class="security-container">
    <h3>Notificación de Seguridad</h3>
    <div class="patrol-area">
      <div class="drone-icon" :class="{ 'patrolling': isPatrolling }">
        🚁
      </div>
      <button @click="startPatrol" :disabled="isPatrolling">
        Test Alarma
      </button>
    </div>
  </div>
</template>

<style scoped>
.security-container {
  padding: 20px;
  position: relative;
}

.patrol-area {
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drone-icon {
  font-size: 2em;
  position: absolute;
  top: 50%;
  left: 10%;
}

.drone-icon.patrolling {
  offset-path: path('M 50 100 Q 150 50, 250 100 T 450 100');
  animation: patrol 4s ease-in-out forwards;
}

@keyframes patrol {
  from {
    offset-distance: 0%;
  }
  to {
    offset-distance: 100%;
  }
}

button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #da190b;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
