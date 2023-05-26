import { createRouter, createWebHistory } from 'vue-router';

import Game from './components/GameRenderer.vue';
import Lobby from './components/GameLobby.vue';


const routes: Array<RouteRecordRaw> = [
  { path: '/lobby', component: Lobby },
  { path: '/game', component: Game },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
