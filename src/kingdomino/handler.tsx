import { ButtonScreenDisplay, infoLeft } from "../ButtonScreen"
import { GameHandler } from "../game/handler"
import { gameLanguages } from "../game/languages"
import { gameState } from "../game/state"
import { getPlayers, getTeams } from "../players/teams"
import { numberValue, stringValue, SuperButtonValue } from "../SuperButton"
import { KingdominoActions } from "./actions"
import { kingdominoLanguage, getLanguage } from "./language"
import { kingdominoGamesUsed } from "./settings"
import { kingdominoState } from "./state"


export class KingdominoHandler extends GameHandler {
   language: kingdominoLanguage

   constructor() {
      super()
      const language = gameLanguages.POLSKI
      this.language = getLanguage(language)
   }

   getScreenIndividual(state: gameState): ButtonScreenDisplay | undefined {
      const castState = state as kingdominoState

      switch (castState.action) {
         case KingdominoActions.CHOOSE_PLAYERS:
            // choose which players take part
            return {
               info: [infoLeft(this.language.CHOOSE_PLAYERS)],
               options: getTeams().map(e => stringValue(e, e))
            }
         case KingdominoActions.CHOOSE_GAME:
            //choose which game(s) are being played
            return {
               info: [infoLeft(this.language.CHOOSE_GAME)],
               options: [
                  numberValue(this.language.sets.KING, kingdominoGamesUsed.KING),
                  numberValue(this.language.sets.QUEEN, kingdominoGamesUsed.QUEEN),
                  numberValue(this.language.sets.BOTH, kingdominoGamesUsed.BOTH)
               ]
            }
      }
   }

   executeActionIndividual(state: gameState, value?: SuperButtonValue): gameState {
      const castState = state as kingdominoState
      switch (castState.action) {
         case KingdominoActions.CHOOSE_PLAYERS:
            // choose which players take part
            this.allPlayers = getPlayers(value!.value.string!)
            Object.assign(castState, {
               action: KingdominoActions.CHOOSE_GAME
            })
            break
         case KingdominoActions.CHOOSE_GAME:
            // chosen game to play
            Object.assign(castState, {
               settings: Object.assign(castState.settings, { gamesUsed: value!.value.number! }),
               memory: Object.assign(castState.memory, {}),
               action: KingdominoActions.FIRST_ROUND
            })
            break
      }
      return castState
   }
}