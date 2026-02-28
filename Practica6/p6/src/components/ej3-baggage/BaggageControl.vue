<template>
  <v-app>
    <v-main class="baggage-control">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 mb-4">🛫 Panel de Control de Tráfico Aéreo</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8">
            <v-card id="flights-table" class="mb-4">
              <v-card-title>Vuelos Activos</v-card-title>
              <v-data-table
                :headers="headers"
                :items="filteredFlights"
                density="compact"
                class="elevation-1"
              >
                <template v-slot:item.status="{ item }">
                  <v-chip :color="getStatusColor(item.status)" size="small">
                    {{ item.status }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card id="filters-panel" class="mb-4">
              <v-card-title>Filtros</v-card-title>
              <v-card-text>
                <v-chip-group v-model="selectedFilter" column>
                  <v-chip
                    id="filter-delayed"
                    filter
                    variant="outlined"
                    @click="filterDelayed"
                  >
                    ⏰ Vuelos Retrasados
                  </v-chip>
                  <v-chip filter variant="outlined" @click="filterOnTime">
                    ✅ A Tiempo
                  </v-chip>
                  <v-chip filter variant="outlined" @click="clearFilter">
                    🔄 Todos
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>

            <v-card id="emergency-panel">
              <v-card-title>Control de Emergencia</v-card-title>
              <v-card-text>
                <v-btn
                  id="emergency-button"
                  color="red"
                  size="x-large"
                  block
                  @click="emergencyStop"
                >
                  🚨 PARADA DE EMERGENCIA
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'

interface Flight {
  id: string
  origin: string
  destination: string
  status: string
  gate: string
}

const headers = [
  { title: 'Vuelo', key: 'id' },
  { title: 'Origen', key: 'origin' },
  { title: 'Destino', key: 'destination' },
  { title: 'Estado', key: 'status' },
  { title: 'Puerta', key: 'gate' }
]

const flights = ref<Flight[]>([
  { id: 'IB3401', origin: 'Madrid', destination: 'Barcelona', status: 'A Tiempo', gate: 'A12' },
  { id: 'VY8205', origin: 'Sevilla', destination: 'París', status: 'Retrasado', gate: 'B3' },
  { id: 'UX7890', origin: 'Valencia', destination: 'Londres', status: 'A Tiempo', gate: 'C5' },
  { id: 'FR4521', origin: 'Málaga', destination: 'Roma', status: 'Retrasado', gate: 'A8' },
  { id: 'BA2341', origin: 'Bilbao', destination: 'Berlín', status: 'A Tiempo', gate: 'B12' }
])

const selectedFilter = ref<number | undefined>(undefined)
const currentFilter = ref<string>('all')

const filteredFlights = computed(() => {
  if (currentFilter.value === 'delayed') {
    return flights.value.filter(f => f.status === 'Retrasado')
  }
  if (currentFilter.value === 'ontime') {
    return flights.value.filter(f => f.status === 'A Tiempo')
  }
  return flights.value
})

const filterDelayed = () => {
  currentFilter.value = 'delayed'
  if (tour && tour.isActive()) {
    const currentStep = tour.getCurrentStep()
    if (currentStep?.id === 'step-filter') {
      tour.next()
    }
  }
}

const filterOnTime = () => {
  currentFilter.value = 'ontime'
}

const clearFilter = () => {
  currentFilter.value = 'all'
}

const getStatusColor = (status: string) => {
  return status === 'Retrasado' ? 'orange' : 'green'
}

const emergencyStop = () => {
  alert('🚨 SISTEMA DE EMERGENCIA ACTIVADO')
}

let tour: Shepherd.Tour | null = null

onMounted(() => {
  tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: 'shepherd-theme-dark',
      scrollTo: true,
      cancelIcon: { enabled: true }
    }
  })

  tour.addStep({
    id: 'step-welcome',
    text: '¡Bienvenido al Panel de Control de Tráfico Aéreo! Este tutorial te guiará por las funciones críticas del sistema.',
    buttons: [
      {
        text: 'Comenzar',
        action: tour.next
      }
    ]
  })

  tour.addStep({
    id: 'step-table',
    text: 'Esta tabla muestra todos los vuelos activos con su estado en tiempo real.',
    attachTo: { element: '#flights-table', on: 'bottom' },
    buttons: [
      {
        text: 'Siguiente',
        action: tour.next
      }
    ]
  })

  tour.addStep({
    id: 'step-filter',
    text: '⚠️ PASO INTERACTIVO: Por favor, activa el filtro de "Vuelos Retrasados" haciendo clic en él.',
    attachTo: { element: '#filter-delayed', on: 'right' },
    buttons: []
  })

  tour.addStep({
    id: 'step-correct',
    text: '✅ ¡Correcto! Ahora solo ves los vuelos retrasados. Este filtro es crucial para priorizar operaciones.',
    attachTo: { element: '#flights-table', on: 'bottom' },
    buttons: [
      {
        text: 'Siguiente',
        action: tour.next
      }
    ]
  })

  tour.addStep({
    id: 'step-emergency',
    text: '🚨 Este botón detiene TODAS las operaciones. Úsalo solo en emergencias reales.',
    attachTo: { element: '#emergency-button', on: 'left' },
    buttons: [
      {
        text: 'Finalizar',
        action: tour.complete
      }
    ]
  })

  tour.start()
})
</script>

<style>
.baggage-control {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  color: white;
}

.v-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.v-card-title {
  color: white !important;
  font-weight: bold;
}

.shepherd-theme-dark {
  background: #1a1a2e !important;
  border: 2px solid #00d4ff !important;
  color: white !important;
}

.shepherd-theme-dark .shepherd-text {
  color: white !important;
}

.shepherd-theme-dark .shepherd-button {
  background: #00d4ff !important;
  color: #1a1a2e !important;
  font-weight: bold;
}

.shepherd-theme-dark .shepherd-button:hover {
  background: #00a8cc !important;
}
</style>
