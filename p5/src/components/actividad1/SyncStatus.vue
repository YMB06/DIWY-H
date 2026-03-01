<script setup lang="ts">
import { ref } from 'vue'

const isSyncing = ref<boolean>(false)

const startSync = () => {
  isSyncing.value = true
  setTimeout(() => {
    isSyncing.value = false
  }, 3000)
}
</script>

<template>
  <div class="sync-container">
    <h3>Estado de Sincronización</h3>
    <div class="sync-content">
      <div class="icon-refresh" :class="{ 'syncing': isSyncing }">
        🔄
      </div>
      <button @click="startSync" :disabled="isSyncing">
        {{ isSyncing ? 'Sincronizando...' : 'Sincronizar' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.sync-container {
  padding: 20px;
}

.sync-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-refresh {
  font-size: 3em;
}

.icon-refresh.syncing {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
