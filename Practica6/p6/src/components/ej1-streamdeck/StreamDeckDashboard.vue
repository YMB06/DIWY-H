<template>
  <div class="dashboard">
    <header class="dash-header">
      <h1>🎮 StreamDeck Dashboard</h1>
      <div class="status-bar">
        <span :class="['badge', caps.webgl ? 'ok' : 'fail']">WebGL {{ caps.webgl ? '✓' : '✗' }}</span>
        <span :class="['badge', caps.codec ? 'ok' : 'fail']">Codec {{ caps.codec ? '✓' : '✗' }}</span>
        <span v-if="caps.battery !== null" class="badge ok">Batería ✓</span>
        <span v-if="caps.connection !== null" class="badge ok">Red ✓</span>
      </div>
    </header>

    <p class="hint">💡 Arrastra los módulos para reorganizarlos</p>
    <p v-if="!caps.webgl" class="warn">⚠️ WebGL no detectado — el módulo Vista 3D está deshabilitado</p>

    <div ref="swapyContainer" class="grid">
      <div
        v-for="mod in modules"
        :key="mod.id"
        :data-swapy-slot="mod.id"
        class="slot"
      >
        <div
          :data-swapy-item="mod.id"
          :class="['module', mod.disabled ? 'disabled' : '']"
          :data-swapy-no-drag="mod.disabled ? '' : undefined"
        >
          <div class="mod-icon">{{ mod.icon }}</div>
          <div class="mod-title">{{ mod.title }}</div>
          <div class="mod-desc">{{ mod.disabled ? '🚫 No disponible (sin WebGL)' : mod.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { createSwapy } from 'swapy'
import type { Capabilities } from './SystemCheck.vue'

const props = defineProps<{ caps: Capabilities }>()

const swapyContainer = ref<HTMLElement>()
let swapy: ReturnType<typeof createSwapy> | null = null

const modules = ref([
  { id: 'chat',    icon: '💬', title: 'Chat en Vivo',   desc: 'Mensajes del chat en tiempo real' },
  { id: 'alerts',  icon: '🔔', title: 'Alertas',        desc: 'Nuevos seguidores y donaciones' },
  { id: 'camera',  icon: '📷', title: 'Cámara',         desc: 'Vista previa de la webcam' },
  { id: 'audio',   icon: '🎵', title: 'Audio Mixer',    desc: 'Control de volumen y fuentes' },
  { id: 'stats',   icon: '📊', title: 'Estadísticas',   desc: 'Viewers, bitrate, FPS' },
  { id: 'view3d',  icon: '🌐', title: 'Vista 3D',       desc: 'Overlay 3D WebGL', disabled: !props.caps.webgl },
])

onMounted(() => {
  if (!swapyContainer.value) return
  swapy = createSwapy(swapyContainer.value, { animation: 'dynamic' })
})

onUnmounted(() => {
  swapy?.destroy()
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  padding: 2rem;
  color: white;
}

.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

h1 { font-size: 1.8rem; }

.status-bar { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.badge {
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}
.badge.ok { background: rgba(104, 211, 145, 0.2); color: #68d391; border: 1px solid #68d391; }
.badge.fail { background: rgba(252, 129, 129, 0.2); color: #fc8181; border: 1px solid #fc8181; }

.hint { opacity: 0.6; font-size: 0.9rem; margin-bottom: 0.25rem; }
.warn { color: #f6ad55; font-size: 0.9rem; margin-bottom: 1rem; }

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.slot { min-height: 160px; }

.module {
  height: 100%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;
  user-select: none;
}

.module:hover:not(.disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-color: rgba(99, 179, 237, 0.5);
}

.module.disabled {
  opacity: 0.35;
  cursor: not-allowed;
  filter: grayscale(1);
}

.mod-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
.mod-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.4rem; }
.mod-desc { font-size: 0.85rem; opacity: 0.7; }

@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
