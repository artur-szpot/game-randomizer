import { IBBScreenProps } from "../BBScreen"
import { BBValue } from "../BigButton"
import { GameHandler } from "../GameHandler"
import { randomBool, randomizeArray } from "../general/general"
import { infoLeft, InfoProps } from "../Info"
import { GameLanguage, LANG } from "./language"

export enum ACTION {
   CHOOSE_PLAYERS,// choose which players take part
   SHOW,          // show results
}

class gameState {
   action: ACTION=ACTION.CHOOSE_PLAYERS
   // settings
   players: string[]=[]
}

export class CodenamesHandler extends GameHandler {
   state: gameState

   constructor() {
      super(new GameLanguage())
      this.state = new gameState()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.get(value)

      switch (this.state.action) {
         case ACTION.CHOOSE_PLAYERS:
            this.players.min = 4
            this.players.max = -1
            return this.getPlayersScreen()

         case ACTION.SHOW:
            const sortedPlayers = randomizeArray(this.players.chosen)
            const blueFirst = randomBool()
            let info: InfoProps[] = []
            let team: string[] = []
            if (blueFirst) {
               info.push(infoLeft(`${lang(LANG.BLUE_LEADER)}: ${sortedPlayers[0]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 === 0)
               info.push(infoLeft(`${lang(LANG.BLUE_TEAM)}: ${team.join(', ')}`))
               info.push(infoLeft(`${lang(LANG.RED_LEADER)}: ${sortedPlayers[1]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 !== 0)
               info.push(infoLeft(`${lang(LANG.RED_TEAM)}: ${team.join(', ')}`))
            } else {
               info.push(infoLeft(`${lang(LANG.RED_LEADER)}: ${sortedPlayers[0]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 === 0)
               info.push(infoLeft(`${lang(LANG.RED_TEAM)}: ${team.join(', ')}`))
               info.push(infoLeft(`${lang(LANG.BLUE_LEADER)}: ${sortedPlayers[1]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 !== 0)
               info.push(infoLeft(`${lang(LANG.BLUE_TEAM)}: ${team.join(', ')}`))
            }
            return {
               info: info,
               options: []
            }
      }
   }

   executeAction(value: BBValue): void {
      const setAction = (action: ACTION) => this.state.action = action

      switch (this.state.action) {
         case ACTION.CHOOSE_PLAYERS:
            // chosen which players take part
            this.executePlayersAction(value)
            if (this.players.chosen.length) {
               setAction(ACTION.SHOW)
               return
            }
            break
      }
   }
}