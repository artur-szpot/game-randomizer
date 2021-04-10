import { ButtonScreenDisplay, ButtonScreenInfo, infoBlock, infoLeft } from "../ButtonScreen"
import { GameHandler } from "../game/handler"
import { gameLanguages } from "../game/languages"
import { gameState } from "../game/state"
import { arrayEquals, random, randomArrayElement, randomBool } from "../general/general"
import { numberValue, SuperButtonValue } from "../SuperButton"
import { IstanbulActions } from "./actions"
import { getLanguage, istanbulLanguage } from "./language"
import { istanbulMemory } from "./memory"
import { istanbulPresets } from "./settings"
import { istanbulState } from "./state"

export class IstanbulHandler extends GameHandler {
   language: istanbulLanguage

   constructor() {
      super()
      const language = gameLanguages.POLSKI
      this.language = getLanguage(language)
   }

   getScreenIndividual(state: gameState): ButtonScreenDisplay | undefined {
      const castState = state as istanbulState

      switch (castState.action) {
         case IstanbulActions.CHOOSE_PRESET:
            // choose preset to use
            return {
               info: [infoLeft(this.language.CHOOSE_PRESET)],
               options: [
                  numberValue(this.language.presets.VANILLA, istanbulPresets.VANILLA),
                  numberValue(this.language.presets.COFFEE, istanbulPresets.COFFEE),
                  numberValue(this.language.presets.LETTERS, istanbulPresets.LETTERS),
                  numberValue(this.language.presets.GREAT_BAZAAR, istanbulPresets.GREAT_BAZAAR)
               ]
            }
         case IstanbulActions.SHOW:
            let info: ButtonScreenInfo[] = [
               ...castState.memory.chosenLocations.map(row => infoBlock(row.map(e => `${e}`))),
               infoLeft(`${this.language.FIRST_PLAYER}: ${state.memory.firstPlayer}`),
               infoLeft(`${this.language.neutrals.MAYOR}: ${state.memory.neutrals.mayor}`),
               infoLeft(`${this.language.neutrals.SMUGGLER}: ${state.memory.neutrals.smuggler}`)
            ]
            if (state.memory.neutrals.coffeeTrader !== -1) {
               info.push(infoLeft(`${this.language.neutrals.COFFEE_TRADER}: ${state.memory.neutrals.coffeeTrader}`))
            }
            if (state.memory.neutrals.courier !== -1) {
               info.push(infoLeft(`${this.language.neutrals.COURIER}: ${state.memory.neutrals.courier}`))
            }
            return {
               info: info,
               options: []
            }
      }
   }

   executeActionIndividual(state: gameState, value?: SuperButtonValue): gameState {
      const castState = state as istanbulState
      switch (castState.action) {
         case IstanbulActions.CHOOSE_PRESET:
            // chosen preset to use
            const preset = value!.value.number! as istanbulPresets
            Object.assign(castState, {
               settings: { preset: preset },
               memory: this.generateBoard(preset),
               action: IstanbulActions.SHOW
            })
            break
      }
      return state
   }

   generateBoard(preset: istanbulPresets): istanbulMemory {
      const useCoffee = preset === istanbulPresets.COFFEE || preset === istanbulPresets.GREAT_BAZAAR
      const useLetters = preset === istanbulPresets.LETTERS || preset === istanbulPresets.GREAT_BAZAAR
      const useGreatBazaar = preset === istanbulPresets.GREAT_BAZAAR
      // Get the locations to be set. 
      // Do not include specially placed locations, i.e. 7, 8 and 9.
      let boards = [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16]
      let boardSize = [4, 4]
      if (useCoffee) {
         boards = [...boards, 17, 18, 19, 20]
         boardSize[0] = 5
      }
      if (useLetters) {
         boards = [...boards, 21, 22, 23, 24]
         boardSize[0] = 5
      }
      if (useGreatBazaar) {
         boards = [...boards, 25]
         boardSize[1] = 5
      }
      // Generate the possible location coordinates.
      let coords: number[][] = []
      for (let x = 0; x < boardSize[0]; x++) {
         for (let y = 0; y < boardSize[1]; y++) {
            coords.push([x, y])
         }
      }
      // Place the fountain.
      let boardPlacements: { [key: number]: number[] } = {}
      const placeBoard = (board: number, place: number[]) => {
         boardPlacements[board] = place
         coords = coords.filter(e => !arrayEquals(e, place))
      }
      if (useGreatBazaar) {
         placeBoard(7, [2, 2])
      } else if (useLetters || useCoffee) {
         placeBoard(7, [random(1, 3), random(1, 2)])
      } else {
         placeBoard(7, [random(1, 2), random(1, 2)])
      }
      // Place black market and cafe.
      const place1 = randomArrayElement(coords)
      const place2possibilities = coords.filter(e => e[0] !== place1[0] && e[1] !== place1[1] && Math.abs(e[0] - place1[0]) + Math.abs(e[1] - place1[1]) > 2)
      const place2 = randomArrayElement(place2possibilities)
      const cafeFirst = randomBool()
      placeBoard(9, cafeFirst ? place1 : place2)
      placeBoard(8, cafeFirst ? place2 : place1)
      // Place the remaining boards.
      boards.forEach(e => placeBoard(e, randomArrayElement(coords)))
      // Prepare the return value.
      boards = [7, 8, 9, ...boards]
      let chosenLocations: number[][] = []
      for (let y = 0; y < boardSize[1]; y++) {
         let row: number[] = []
         for (let x = 0; x < boardSize[0]; x++) {
            for (let b of boards) {
               if (arrayEquals(boardPlacements[b], [x, y])) { row.push(b) }
            }
         }
         chosenLocations.push(row)
      }
      return {
         chosenLocations: chosenLocations,
         neutrals: {
            mayor: random(1, 12),
            smuggler: random(1, 12),
            coffeeTrader: useCoffee ? random(1, 12) : -1,
            courier: useLetters ? random(1, 12) : -1
         },
         firstPlayer: randomArrayElement(this.allPlayers).name
      }
   }
}