import { createRouter, createWebHistory } from 'vue-router';

import Game from './components/GameRenderer.vue';
import Lobby from './components/HelloWorld.vue';
import Welcome from './components/TheWelcome.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Welcome },
  { path: '/lobby', component: Lobby },
  { path: '/game', component: Game },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
