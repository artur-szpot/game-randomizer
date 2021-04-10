import { ButtonScreenDisplay, infoCenter, infoLeft } from "../ButtonScreen"
import { GameHandler } from "../game/handler"
import { gameLanguages } from "../game/languages"
import { gameState } from "../game/state"
import { random, randomArraySlice, randomizeArray } from "../general/general"
import { noValue, numberValue, SuperButtonValue } from "../SuperButton"
import { MuertosActions } from "./actions"
import { muertosCharacter, dataHandler } from "./data/data"
import { getLanguage, muertosLanguage } from "./language"
import { muertosState, emptyMuertosState } from "./state"

export class MuertosHandler extends GameHandler {
   allCharacters: muertosCharacter[]
   allRules: string[]
   language: muertosLanguage
   dictCharacters: { [key: number]: muertosCharacter }

   constructor() {
      super()
      const data = new dataHandler()
      const language = gameLanguages.POLSKI
      this.allCharacters = data.getCharacters(language)
      this.allRules = data.getRules(language)
      this.language = getLanguage(language)
      let dictCharacters: { [key: number]: muertosCharacter } = {}
      for (let character of this.allCharacters) {
         dictCharacters[character.id] = character
      }
      this.dictCharacters = dictCharacters
   }

   getScreenIndividual(state: gameState): ButtonScreenDisplay|undefined {
      const castState = state as muertosState

      switch (castState.action) {
         case MuertosActions.SET_PLAYERS:
            // choose number of players
            return {
               options: [3, 4, 5, 6, 7, 8].map(e => numberValue(`${e} ${this.language.options.PLAYERS}`, e))
            }
         case MuertosActions.SET_RULES:
            // choose number of rules
            return {
               info: [infoCenter(this.language.info.CHOOSE_RULES_NUMBER)],
               options: [0, 1, 2, 3, 4].map(e => numberValue(`${e}`, e))
            }
         case MuertosActions.PASS:
            // pass the device to next player
            return {
               info: [infoCenter(this.language.info.PASS_DEVICE)],
               options: [noValue(this.language.options.OK)]
            }
         case MuertosActions.ACCEPT:
            // user can accept the character or not
            return {
               info: [
                  infoLeft(this.language.info.ACCEPT_OR_NOT),
                  infoCenter(this.getCharacter(castState.memory.currentCharacter))
               ],
               options: [
                  numberValue(this.language.options.ACCEPT, 1),
                  numberValue(this.language.options.REJECT, 0)
               ]
            }
         case MuertosActions.BEGIN:
            // everybody accepted, show the rules
            return {
               info: [
                  infoCenter(this.language.info.RULES_LIST_HEADER),
                  ...[1,2,3,4].map(e=>{
                     if(!state.memory.chosenRules.hasOwnProperty(e)){
                        return infoLeft(`${e}. ${this.language.info.NO_RULE}`)
                     }
                     return infoLeft(`${e}. ${state.memory.chosenRules[e]}`)
                  })
               ],
               options: [noValue(this.language.options.SHOW_CHARACTERS)]
            }
         case MuertosActions.END:
            // show all characters too choose from
            return {
               info: [
                  infoLeft(this.language.info.CHARACTER_LIST_HEADER),
                  ...castState.memory.chosenCharacters.map((e, i) => infoLeft(`${i + 1}. ${this.getCharacter(e)}`))
               ],
               options: [noValue(this.language.options.OK)]
            }
      }
   }

   executeActionIndividual(state: gameState, value?: SuperButtonValue): gameState {
      // if (state.appAction && state.action == AppActions.START) {
      //    state = startMuertosState()
      // }
      const castState = state as muertosState
      switch (castState.action) {
         case MuertosActions.SET_PLAYERS:
            // chosen number of players
            Object.assign(castState, {
               settings: { players: value!.value.number },
               action: MuertosActions.SET_RULES
            })
            break
         case MuertosActions.SET_RULES:
            // chosen number of rules
            Object.assign(castState, {
               settings: Object.assign(castState.settings, { done: true }),
               memory: Object.assign(castState.memory, { chosenRules: this.chooseRules(value!.value.number!) }),
               action: MuertosActions.PASS
            })
            break
         case MuertosActions.PASS:
            // passed the device to next player
            Object.assign(castState, {
               memory: Object.assign(castState.memory, { currentCharacter: this.chooseCharacter(castState.memory.rejectedCharacters) }),
               action: MuertosActions.ACCEPT
            })
            break
         case MuertosActions.ACCEPT:
            // user accepted the character or not
            // reject the character whether it was chosen or not to prevent it from reappearing
            const rejectedCharacters = [...castState.memory.rejectedCharacters, castState.memory.currentCharacter]
            if (value!.value.number === 1) {
               // 1 = accepted
               const acceptedMemory = Object.assign(castState.memory, {
                  rejectedCharacters: rejectedCharacters,
                  chosenCharacters: [...castState.memory.chosenCharacters, castState.memory.currentCharacter],
                  currentCharacter: -1
               })
               const allChosen = acceptedMemory.chosenCharacters.length === castState.settings.players
               if (allChosen) {
                  while (acceptedMemory.chosenCharacters.length < 8) {
                     acceptedMemory.chosenCharacters.push(this.chooseCharacter(castState.memory.rejectedCharacters))
                  }
                  acceptedMemory.chosenCharacters = randomizeArray(acceptedMemory.chosenCharacters)
               }
               Object.assign(castState, {
                  memory: acceptedMemory,
                  action: allChosen ? MuertosActions.BEGIN : MuertosActions.PASS
               })
            } else {
               // 0 = rejected
               const rejectedMemory = Object.assign(castState.memory, {
                  rejectedCharacters: rejectedCharacters,
                  currentCharacter: this.chooseCharacter(rejectedCharacters)
               })
               Object.assign(castState, {
                  memory: rejectedMemory
               })
            }
            break
         case MuertosActions.BEGIN:
            // game over, show choices
            Object.assign(castState, {
               action: MuertosActions.END
            })
            break
         case MuertosActions.END:
            // back to menu
            Object.assign(castState, emptyMuertosState())
      }
      return castState
   }

   chooseCharacter(rejectedCharacters: number[]): number {
      const all = this.allCharacters.filter(e => !rejectedCharacters.includes(e.id))
      const total = all.length
      const chosen = random(0, total - 1)
      return all[chosen].id
   }

   getCharacter(id: number): string {
      const character = this.dictCharacters[id]
      return `${character.name}${character.hint ? ` (${character.hint})` : ''}`
   }

   chooseRules(total: number): { [key: number]: string } {
      const chosenRules = randomArraySlice(this.allRules, total)
      const chosenTurns = randomizeArray([1, 2, 3, 4])
      let retval: { [key: number]: string } = {}
      for (let i = 0; i < total; i++) {
         retval[chosenTurns[i]] = chosenRules[i]
      }
      return retval
   }
}