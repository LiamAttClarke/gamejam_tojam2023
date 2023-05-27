import { createRouter, createWebHistory } from 'vue-router';

import Welcome from './components/Welcome.vue';
import CharacterSelect from './components/CharacterSelect.vue';
import Game from './components/GameRenderer.vue';
import Lobby from './components/GameLobby.vue';


const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Welcome },
  { path: '/character', component: CharacterSelect },
  { path: '/lobby', component: Lobby },
  { path: '/game', component: Game },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;