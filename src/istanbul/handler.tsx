import { GameHandler } from "../GameHandler"
import { BBValue, numberBB } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { GameLanguage, LANG } from "./language"
import { infoLeft, infoBlock, InfoProps } from "../Info"
import { arrayEquals, random, randomArrayElement, randomBool } from "../general/general"

enum ACTION {
   CHOOSE_PLAYERS,// choose which players take part
   CHOOSE_PRESET, // choose which preset to generate
   SHOW,          // show results
}

export enum istanbulPresets { NONE, VANILLA, COFFEE, LETTERS, GREAT_BAZAAR }

class gameState {
   action: ACTION = ACTION.CHOOSE_PLAYERS
   // settings
   players: string[] = []
   preset: istanbulPresets = istanbulPresets.NONE
   // memory
   chosenLocations: number[][] = []
   neutrals: { mayor: number, smuggler: number, coffeeTrader: number, courier: number } = {
      mayor: -1,
      smuggler: -1,
      coffeeTrader: -1,
      courier: -1
   }
   firstPlayer: string = ''
}

export class IstanbulHandler extends GameHandler {
   state: gameState

   constructor() {
      super(new GameLanguage())
      this.state = new gameState()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.get(value)

      switch (this.state.action) {
         case ACTION.CHOOSE_PLAYERS:
            this.players.min = 2
            this.players.max = 5
            return this.getPlayersScreen()

         case ACTION.CHOOSE_PRESET:
            // choose preset to use
            return {
               info: [infoLeft(lang(LANG.CHOOSE_PRESET))],
               options: [
                  numberBB(lang(LANG.PRESET_VANILLA), istanbulPresets.VANILLA),
                  numberBB(lang(LANG.PRESET_COFFEE), istanbulPresets.COFFEE),
                  numberBB(lang(LANG.PRESET_LETTERS), istanbulPresets.LETTERS),
                  numberBB(lang(LANG.PRESET_GREAT_BAZAAR), istanbulPresets.GREAT_BAZAAR)
               ]
            }
         case ACTION.SHOW:
            let info: InfoProps[] = [
               ...this.state.chosenLocations.map(row => infoBlock(row.map(e => `${e}`))),
               infoLeft(`${lang(LANG.FIRST_PLAYER)}: ${this.state.firstPlayer}`),
               infoLeft(`${lang(LANG.NEUTRAL_MAYOR)}: ${this.state.neutrals.mayor}`),
               infoLeft(`${lang(LANG.NEUTRAL_SMUGGLER)}: ${this.state.neutrals.smuggler}`)
            ]
            if (this.state.neutrals.coffeeTrader !== -1) {
               info.push(infoLeft(`${lang(LANG.NEUTRAL_COFFEE_TRADER)}: ${this.state.neutrals.coffeeTrader}`))
            }
            if (this.state.neutrals.courier !== -1) {
               info.push(infoLeft(`${lang(LANG.NEUTRAL_COURIER)}: ${this.state.neutrals.courier}`))
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
            this.executePlayersAction(value)
            if (this.players.chosen.length) {
               setAction(ACTION.CHOOSE_PRESET)
               return
            }
            break

         case ACTION.CHOOSE_PRESET:
            // chosen preset to use
            this.state.preset = value.getNumber() as istanbulPresets
            this.generateBoard()
            setAction(ACTION.SHOW)
            break
      }
   }

   generateBoard(): void {
      const preset = this.state.preset
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
      this.state.chosenLocations = chosenLocations
      this.state.neutrals = {
         mayor: random(1, 12),
         smuggler: random(1, 12),
         coffeeTrader: useCoffee ? random(1, 12) : -1,
         courier: useLetters ? random(1, 12) : -1
      }
      this.state.firstPlayer = randomArrayElement(this.players.chosen)
   }
}