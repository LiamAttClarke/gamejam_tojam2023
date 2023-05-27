import { createRouter, createWebHistory } from 'vue-router';

import Welcome from './components/Welcome.vue';
import CharacterSelect from './views/CharacterSelect.vue';
import Game from './components/GameRenderer.vue';
import Lobby from './views/GameLobby.vue';
import GameRoom from './components/GameRoom.vue';


const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Welcome },
  { path: '/character', component: CharacterSelect },
  { path: '/lobby', component: Lobby },
  { path: '/game', component: Game },
  { path: '/room', component: GameRoom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
