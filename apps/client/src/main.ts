import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useGameManagerStore } from './stores/gameManager';
import router from './router';
import './index.css'


import App from './App.vue'

const app = createApp(App)

const pinia = createPinia();
app.use(pinia)

// Provide the store to the app
app.provide('gameManager', useGameManagerStore);

app.use(router)

app.mount('#app')
