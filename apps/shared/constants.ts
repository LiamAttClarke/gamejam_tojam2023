export default Object.freeze({
  MSG_TYPES: {
    LIST_ROOMS: 'list_rooms',
    CREATE_ROOM: 'create_room',
    JOIN_ROOM: 'join_room',
    LEAVE_ROOM: 'leave_room',
    DISCONNECT: 'disconnect',
    BROADCAST_ROOM_STATE: 'broadcast_room_state',
    DIRECTION_CHANGE: 'direction_change',
    NAME_CHANGE: 'name_change',
    CHARACTER_CHANGE: 'character_change',
    GUESS_RECEIVE: "guess_receive",
    TRAIL_ON: "trail_on",
  },
  MOVE_DIRECTIONS: {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
  }
});
