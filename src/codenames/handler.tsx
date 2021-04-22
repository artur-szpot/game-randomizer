import { ButtonScreenDisplay, ButtonScreenInfo, infoLeft } from "../ButtonScreen"
import { GameHandler } from "../game/handler"
import { gameLanguages } from "../game/languages"
import { gameState } from "../game/state"
import { randomBool, randomizeArray } from "../general/general"
import { getPlayers, getTeams } from "../players/teams"
import { stringValue, SuperButtonValue } from "../SuperButton"
import { CodenamesActions } from "./actions"
import { codenamesLanguage, getLanguage } from "./language"
import { codenamesState } from "./state"

export class CodenamesHandler extends GameHandler {
   language: codenamesLanguage

   constructor() {
      super()
      const language = gameLanguages.POLSKI
      this.language = getLanguage(language)
   }

   getScreenIndividual(state: gameState): ButtonScreenDisplay | undefined {
      const castState = state as codenamesState
      switch (castState.action) {
         case CodenamesActions.CHOOSE_PLAYERS:
            // choose which players take part
            return {
               info: [infoLeft(this.language.CHOOSE_PLAYERS)],
               options: getTeams().map(e => stringValue(e, e))
            }
         case CodenamesActions.SHOW:
            const sortedPlayers = randomizeArray(this.allPlayers)
            const blueFirst = randomBool()
            let info: ButtonScreenInfo[] = []
            let team: string[] = []
            if (blueFirst) {
               info.push(infoLeft(`${this.language.BLUE_LEADER}: ${sortedPlayers[0]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 === 0)
               info.push(infoLeft(`${this.language.BLUE_TEAM}: ${team.join(', ')}`))
               info.push(infoLeft(`${this.language.RED_LEADER}: ${sortedPlayers[1]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 !== 0)
               info.push(infoLeft(`${this.language.RED_TEAM}: ${team.join(', ')}`))
            } else {
               info.push(infoLeft(`${this.language.RED_LEADER}: ${sortedPlayers[0]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 === 0)
               info.push(infoLeft(`${this.language.RED_TEAM}: ${team.join(', ')}`))
               info.push(infoLeft(`${this.language.BLUE_LEADER}: ${sortedPlayers[1]}`))
               team = sortedPlayers.slice(2).filter((_, i) => i % 2 !== 0)
               info.push(infoLeft(`${this.language.BLUE_TEAM}: ${team.join(', ')}`))
            }
            return {
               info: info,
               options: []
            }
      }
   }

   executeActionIndividual(state: gameState, value?: SuperButtonValue): gameState {
      const castState = state as codenamesState
      switch (castState.action) {
         case CodenamesActions.CHOOSE_PLAYERS:
            // choose which players take part
            this.allPlayers = getPlayers(value!.value.string!)
            Object.assign(castState, {
               action: CodenamesActions.SHOW
            })
            break
      }
      return state
   }
}