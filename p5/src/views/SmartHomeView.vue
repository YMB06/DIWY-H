<script setup lang="ts">
import NightModeToggle from '../components/actividad1/NightModeToggle.vue'
import LightDimmer from '../components/actividad1/LightDimmer.vue'
import SyncStatus from '../components/actividad1/SyncStatus.vue'
import SecurityAlert from '../components/actividad1/SecurityAlert.vue'
import WeatherWidget from '../components/actividad2/WeatherWidget.vue'
import EnergyMonitor from '../components/actividad3/EnergyMonitor.vue'
import LandingPage from '../components/actividad4/LandingPage.vue'
import BrowserCapabilities from '../components/BrowserCapabilities.vue'
</script>

<template>
  <div class="smart-home-view">
    <h1>🏠 Smart Home Control Panel</h1>
    
    <section class="activity-section">
      <h2>Actividad 1: Animaciones con CSS</h2>
      <div class="components-grid">
        <NightModeToggle />
        <LightDimmer />
        <SyncStatus />
        <SecurityAlert />
      </div>
    </section>

    <section class="activity-section">
      <h2>Actividad 2: Iconografía Dinámica y SVG Animado</h2>
      <WeatherWidget />
    </section>

    <section class="activity-section">
      <h2>Actividad 3: Monitor de Consumo Energético con Canvas</h2>
      <EnergyMonitor />
    </section>

    <section class="activity-section">
      <h2>Actividad 4: Landing Page con GSAP</h2>
      <LandingPage />
    </section>

    <section class="activity-section">
      <h2>Actividad 5: Auditoría de Rendimiento</h2>
      <BrowserCapabilities />
    </section>
  </div>
</template>

<style scoped>
.smart-home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
}

.activity-section {
  margin-bottom: 60px;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.activity-section h2 {
  color: #34495e;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.components-grid > * {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}
</style>
