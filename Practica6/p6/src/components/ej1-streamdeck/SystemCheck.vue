<template>
  <div class="system-check">
    <div class="check-card">
      <h1>🛠️ StreamDeck UI</h1>
      <p class="subtitle">Verificando compatibilidad del sistema...</p>

      <div class="checks">
        <div v-for="check in checks" :key="check.id" class="check-item">
          <span class="check-icon">
            <span v-if="check.status === 'pending'">⏳</span>
            <span v-else-if="check.status === 'ok'">✅</span>
            <span v-else>❌</span>
          </span>
          <span class="check-label">{{ check.label }}</span>
          <span class="check-detail" :class="check.status">{{ check.detail }}</span>
        </div>
      </div>

      <v-btn
        class="enter-btn"
        color="primary"
        size="large"
        :disabled="!allDone || hasCriticalError"
        @click="$emit('enter', capabilities)"
      >
        {{ hasCriticalError ? '❌ Sistema no compatible' : allDone ? '🚀 Entrar al Dashboard' : '⏳ Verificando...' }}
      </v-btn>

      <p v-if="hasCriticalError" class="error-msg">
        Tu sistema no cumple los requisitos mínimos.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

export interface Capabilities {
  webgl: boolean
  codec: boolean
  battery: boolean | null
  connection: boolean | null
}

defineEmits<{ enter: [caps: Capabilities] }>()

interface Check {
  id: string
  label: string
  status: 'pending' | 'ok' | 'fail'
  detail: string
}

const checks = ref<Check[]>([
  { id: 'webgl', label: 'Soporte WebGL', status: 'pending', detail: 'Comprobando...' },
  { id: 'codec', label: 'Codec Opus / H.265', status: 'pending', detail: 'Comprobando...' },
  { id: 'battery', label: 'Estado de batería', status: 'pending', detail: 'Comprobando...' },
  { id: 'connection', label: 'Tipo de conexión', status: 'pending', detail: 'Comprobando...' },
])

const capabilities = ref<Capabilities>({ webgl: false, codec: false, battery: null, connection: null })

const allDone = computed(() => checks.value.every(c => c.status !== 'pending'))
const hasCriticalError = computed(() => {
  const webgl = checks.value.find(c => c.id === 'webgl')
  const codec = checks.value.find(c => c.id === 'codec')
  return webgl?.status === 'fail' || codec?.status === 'fail'
})

function setCheck(id: string, ok: boolean, detail: string) {
  const c = checks.value.find(c => c.id === id)!
  c.status = ok ? 'ok' : 'fail'
  c.detail = detail
}

function checkWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const ok = !!gl
    capabilities.value.webgl = ok
    setCheck('webgl', ok, ok ? 'WebGL disponible' : 'No soportado')
  } catch {
    capabilities.value.webgl = false
    setCheck('webgl', false, 'Error al detectar')
  }
}

async function checkCodec() {
  const audio = document.createElement('audio')
  const opusOk = audio.canPlayType('audio/ogg; codecs=opus') !== ''
  const video = document.createElement('video')
  const h265Ok =
    video.canPlayType('video/mp4; codecs="hvc1"') !== '' ||
    video.canPlayType('video/mp4; codecs="hev1"') !== ''

  const ok = opusOk || h265Ok
  let detail = 'No soportado'
  if (opusOk && h265Ok) detail = 'Opus ✓  H.265 ✓'
  else if (opusOk) detail = 'Opus ✓  H.265 ✗'
  else if (h265Ok) detail = 'Opus ✗  H.265 ✓'

  capabilities.value.codec = ok
  setCheck('codec', ok, detail)
}

async function checkBattery() {
  if ('getBattery' in navigator) {
    try {
      const battery = await (navigator as any).getBattery()
      const pct = Math.round(battery.level * 100)
      capabilities.value.battery = true
      setCheck('battery', true, `${pct}% ${battery.charging ? '🔌 cargando' : '🔋'}`)
      return
    } catch { /* fall through */ }
  }
  capabilities.value.battery = null
  setCheck('battery', true, 'No disponible (opcional)')
}

function checkConnection() {
  const nav = navigator as any
  if (nav.connection) {
    const { effectiveType, downlink } = nav.connection
    capabilities.value.connection = true
    setCheck('connection', true, `${effectiveType} · ${downlink} Mbps`)
  } else {
    capabilities.value.connection = null
    setCheck('connection', true, 'No disponible (opcional)')
  }
}

onMounted(async () => {
  await new Promise(r => setTimeout(r, 400))
  checkWebGL()
  await new Promise(r => setTimeout(r, 300))
  await checkCodec()
  await new Promise(r => setTimeout(r, 300))
  await checkBattery()
  await new Promise(r => setTimeout(r, 200))
  checkConnection()
})
</script>

<style scoped>
.system-check {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
}

.check-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  width: 480px;
  text-align: center;
  color: white;
}

h1 { font-size: 2.2rem; margin-bottom: 0.5rem; }
.subtitle { opacity: 0.7; margin-bottom: 2rem; }

.checks {
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 10px;
}

.check-label { flex: 1; font-weight: 600; }
.check-detail { font-size: 0.85rem; opacity: 0.8; }
.check-detail.fail { color: #fc8181; opacity: 1; }
.check-detail.ok { color: #68d391; opacity: 1; }

.enter-btn { width: 100%; margin-bottom: 1rem; }
.error-msg { color: #fc8181; font-size: 0.9rem; }
</style>
