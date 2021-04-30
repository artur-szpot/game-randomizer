import { ButtonScreenDisplay, infoCenter } from "../ButtonScreen"
import { isUndefined } from "../general/general"
import { stringValue, SuperButtonValue, SuperButtonValueType } from "../SuperButton"
import { AppActions } from "./actions"
import { gameLanguages, gamesLanguage, getLanguage } from "./languages"
import { gameState } from "./state"

export class GameHandler {
   allPlayers: string[]
   menuLanguage: gamesLanguage

   constructor(){
      const language = gameLanguages.POLSKI
      this.menuLanguage = getLanguage(language)
      this.allPlayers = []
   }

   getScreen(state: gameState): ButtonScreenDisplay {
      if (state.appAction && state.action === AppActions.MENU) {
         return {
            options: [
               stringValue(this.menuLanguage.MUERTOS, 'muertos'),
               stringValue(this.menuLanguage.CODENAMES, 'codenames'),
               stringValue(this.menuLanguage.ISTANBUL, 'istanbul'),
               stringValue(this.menuLanguage.KINGDOMINO, 'kingdomino'),
            ]
         }
      }
      return this.getScreenIndividual(state) ?? this.errorScreenProps()
   }
   getScreenIndividual(state: gameState): ButtonScreenDisplay | undefined {
      return { options: [] }
   }

   executeAction(state: gameState, value?: SuperButtonValue): gameState {
      if (!isUndefined(value) && value!.valueType === SuperButtonValueType.MENU) {
         return Object.assign(state, {
            appAction: true,
            action: AppActions.MENU
         })
      // } else if (state.appAction && state.action === AppActions.MENU) {
      //    return Object.assign(state, {
      //       appAction: true,
      //       action: AppActions.START
      //    })
      }
      return this.executeActionIndividual(state, value)
   }

   executeActionIndividual(state: gameState, value?: SuperButtonValue): gameState {
      return state
   }

   errorScreenProps(): ButtonScreenDisplay {
      return {
         info: [infoCenter('Error')],
         options: []
      }
   }
}