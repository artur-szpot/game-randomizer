import { ButtonScreenDisplay, ButtonScreenInfo, infoLeft } from "../ButtonScreen"
import { GameHandler } from "../game/handler"
import { gameLanguages } from "../game/languages"
import { gameState } from "../game/state"
import { randomBool, randomizeArray } from "../general/general"
import { codenamesLanguage, getLanguage } from "./language"

export class CodenamesHandler extends GameHandler {
   language: codenamesLanguage

   constructor() {
      super()
      const language = gameLanguages.POLSKI
      this.language = getLanguage(language)
   }

   getScreenIndividual(state: gameState): ButtonScreenDisplay {
      const sortedPlayers = randomizeArray(this.allPlayers).map(e => e.name)
      const blueFirst = randomBool()
      let info: ButtonScreenInfo[] = []
      if (blueFirst) {
         info.push(infoLeft(`${this.language.BLUE_LEADER}: ${sortedPlayers[0]}`))
         info.push(infoLeft(`${this.language.BLUE_TEAM}: ${sortedPlayers[1]}, ${sortedPlayers[2]}`))
         info.push(infoLeft(`${this.language.RED_LEADER}: ${sortedPlayers[3]}`))
         info.push(infoLeft(`${this.language.RED_TEAM}: ${sortedPlayers[4]}`))
      } else {
         info.push(infoLeft(`${this.language.RED_LEADER}: ${sortedPlayers[0]}`))
         info.push(infoLeft(`${this.language.RED_TEAM}: ${sortedPlayers[1]}, ${sortedPlayers[2]}`))
         info.push(infoLeft(`${this.language.BLUE_LEADER}: ${sortedPlayers[3]}`))
         info.push(infoLeft(`${this.language.BLUE_TEAM}: ${sortedPlayers[4]}`))
      }
      return {
         info: info,
         options: []
      }
   }
}