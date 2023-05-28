import { defineStore } from 'pinia'
import type { Trail } from 'shared/types/Trail'
import type { Player } from 'shared/types/Player'
import type { IVector } from 'shared/types/IVector'
import { CharacterKind } from 'shared/types/Character'
import Phaser from 'phaser'

// Define the store
export const useGameManagerStore = defineStore('gameManager', {
  state: () => ({
    _players: new Map<string, Player>(),
    _trails: new Map<string, Trail>(),
    _socket: null as WebSocket | null,
    _game: null,
    _timer: 0,
    _roomId: '',
    _joinCode: '3333' //Deprecated
  }),
  getters: {
    players: (state) => state._players,
    trails: (state) => state._trails,
    timer: (state) => state._timer,
    roomId: (state) => state._roomId,
    joinCode: (state) => state._joinCode,
    game: (state) => state._game
  },
  actions: {
    addPlayer(player: Player) {
      this._players.set(player.id, player)
      console.log(`Added player '${player.id}'`)
    },
    getPlayer(playerId: string) {
      const player = this._players.get(playerId)
      if (!player) throw new Error(`Player '${playerId}' not found.`)
      return player
    },
    setPlayers(players: Player[]) {
      this._players = new Map(players.map((p) => [p.id, p]))
    },
    setRoomId(roomId: string) {
      this._roomId = roomId
    },
    setRoom(roomId: string) {
      this._roomId = roomId
    },
    setSocket(socket: WebSocket) {
      this._socket = socket
    },
    sendInput(input: IVector) {
      console.log(`Sending input '${JSON.stringify(input)}'`)
      this._socket.emit('direction_change', input, (response) => {
        // Handle the response from the server
        console.log(response)
      })
    },
    emitNameChange(name: string) {
      this._socket?.emit('name_change', name, (response) => {
        // Handle the response from the server
        console.log(response)
      })
    },
    emitStartGame() {
      this._socket?.emit('start_game', (response) => {
        // Handle the response from the server
        console.log(response)
      })
    },
    emitCharacterChange(character: CharacterKind) {
      if (Object.values(CharacterKind).includes(character)) {
        // Valid character kind
        // Perform your logic here
        this._socket?.emit('character_change', character, (response) => {
          // Handle the response from the server
          console.log(response)
        })
      } else {
        // Invalid character kind
        // Handle the error or provide a default behavior
      }
    },
    emitStartTrail() {
      this._socket?.emit('trail_on', (response) => {
        // Handle the response from the server
        console.log(response)
      })
    },
    emitStopTrail() {
      this._socket?.emit('trail_off', (response) => {
        // Handle the response from the server
        console.log(response)
      })
    },
    sendGuess(guess: string) {
      this._socket?.emit('guess_receive', guess, (response) => {
        // Handle the response from the server
        console.log(response)
      })
    },
    setGame(phaserGame: Phaser.Game) {
      this._game = phaserGame
    }
  }
})
