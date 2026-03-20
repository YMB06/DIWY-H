<template>
  <SystemCheck v-if="!entered" @enter="onEnter" />
  <StreamDeckDashboard v-else :caps="capabilities" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SystemCheck from '@/components/ej1-streamdeck/SystemCheck.vue'
import StreamDeckDashboard from '@/components/ej1-streamdeck/StreamDeckDashboard.vue'
import type { Capabilities } from '@/components/ej1-streamdeck/SystemCheck.vue'

const entered = ref(false)
const capabilities = ref<Capabilities>({ webgl: false, codec: false, battery: null, connection: null })

function onEnter(caps: Capabilities) {
  capabilities.value = caps
  entered.value = true
}
</script>
