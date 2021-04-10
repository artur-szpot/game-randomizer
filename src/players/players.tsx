import players from './players.json'

export interface player {
   name: string
}

export function getPlayers(): player[] {
   return players as player[]
}