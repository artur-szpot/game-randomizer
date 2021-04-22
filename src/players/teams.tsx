import teams from './teams.json'

export interface team {
   name: string
   players: string[]
}

export function getTeams(): string[] {
   return (teams as team[]).map(e => e.name)
}

export function getPlayers(teamName: string): string[] {
   for (let team of (teams as team[])) {
      if (team.name == teamName) { return team.players }
   }
   return []
}