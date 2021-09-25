import { IBBScreenProps } from "../BBScreen"
import { BBValue, BB_STYLE_ON_OFF, numberBB, okBB, stringBB, styledBB } from "../BigButton"
import { GameHandler } from "../GameHandler"
import { random, randomArraySlice, randomBool } from "../general/general"
import { infoCenter, infoLeft } from "../Info"
import { GameLanguage, LANG } from "./language"

enum ACTION {
   MAIN_SCREEN,
   RANDOM_MAP,
   RANDOM_QUESTS,
   ADDITIONAL_CAMPS,
   RANDOM_CHARACTERS,
   RANDOM_CITY
}

enum OPTIONS {
   LONGER_VARIANT = 'longerVariant',
   PRIORITIZE_NAMED = 'prioritizeNamed'
}

class gameState {
   action: ACTION = ACTION.MAIN_SCREEN
   // settings
   chosenMap?: number = undefined
   totalPlayers?: number = undefined
   longerVariant: boolean = false
   prioritizeNamed: boolean = false
   settingsDone: boolean = false
   // memory
   value: string = 'hello'
}

const questBase = [
   [["B", "D", "H", "M"], ["A", "C", "E", "F", "G", "I", "J", "K", "L", "N", "O", "P"]],
   [[1, 3, 4, 10, 13, 15], [2, 5, 6, 7, 8, 9, 11, 12, 14, 16]],
   [[20, 23, 27, 28], [17, 18, 19, 21, 22, 24, 25, 26, 29, 30, 31, 32]],
   [[33, 34, 37, 40, 43, 44, 48], [35, 36, 38, 39, 41, 42, 45, 46, 47]],
   [[51, 54, 59, 60, 63], [49, 50, 52, 53, 55, 56, 57, 58, 61, 62, 64]],
   [[69, 70, 72, 76, 78, 79, 80], [65, 66, 67, 68, 71, 73, 74, 75, 77]],
   [[81, 85, 87, 88, 89, 94], [82, 83, 84, 86, 90, 91, 92, 93, 95, 96]],
   [[98, 105, 106, 108, 110, 111], [97, 99, 100, 101, 102, 103, 104, 107, 109, 112]],
   [[115, 117, 118, 119, 123, 126, 128], [113, 114, 116, 120, 121, 122, 124, 125, 127]],
   [[133, 138, 141, 145], [130, 131, 132, 134, 135, 136, 137, 139, 140, 142, 143, 144]],
   [[146, 147, 148, 150, 152, 153, 158], [149, 151, 154, 155, 156, 157, 159, 160, 161]]
]

const characterBase = [
   'Grear',
   'Vera',
   'Eyim',
   'Rin',
   'Shardling',
   'Tanian',
   'Kikli',
   'Riza'
]

const bossesBase = [
   'Captain Shreya',
   'Zag the Treasure Hunter',
   'The Ivory Queen',
   'The Red King',
]

export class NearFarHandler extends GameHandler {
   state: gameState

   constructor() {
      super(new GameLanguage())
      this.state = new gameState()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG, index?: number) => this.language.get(value, index)

      switch (this.state.action) {
         case ACTION.MAIN_SCREEN:
            // choose randomizer to use
            this.state.chosenMap = undefined
            this.state.settingsDone = false
            this.state.totalPlayers = undefined
            return {
               options: [
                  numberBB(lang(LANG.RANDOM_MAP), ACTION.RANDOM_MAP),
                  numberBB(lang(LANG.RANDOM_QUESTS), ACTION.RANDOM_QUESTS),
                  numberBB(lang(LANG.ADDITIONAL_CAMPS), ACTION.ADDITIONAL_CAMPS),
                  numberBB(lang(LANG.RANDOM_CHARACTERS), ACTION.RANDOM_CHARACTERS),
                  numberBB(lang(LANG.RANDOM_CITY), ACTION.RANDOM_CITY),
               ]
            }

         case ACTION.RANDOM_MAP:
            // auto-switch to RANDOM_QUESTS
            this.state.chosenMap = random(0, 10)
            this.state.action = ACTION.RANDOM_QUESTS
            return this.getScreen()

         case ACTION.RANDOM_QUESTS:
            // choose map, get random quests
            if (typeof this.state.chosenMap === 'undefined') {
               return {
                  options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => numberBB(lang(LANG.MAP, e), e))
               }
            }
            else if (typeof this.state.totalPlayers === 'undefined') {
               return {
                  info: [infoLeft(lang(LANG.PLAYER_NUMBER))],
                  options: [2, 3, 4].map(e => numberBB(`${e}`, e))
               }
            }
            else if (!this.state.settingsDone) {
               return {
                  info: [infoLeft(lang(LANG.OPTIONS))],
                  options: [
                     styledBB(stringBB(lang(LANG.LONGER_VARIANT), OPTIONS.LONGER_VARIANT), BB_STYLE_ON_OFF(this.state.longerVariant!)),
                     styledBB(stringBB(lang(LANG.PRIORITIZE_NAMED), OPTIONS.PRIORITIZE_NAMED), BB_STYLE_ON_OFF(this.state.prioritizeNamed!)),
                     okBB(lang(LANG.OK))
                  ]
               }
            }
            else {
               let totalQuests: number
               let chosenQuests: (number | string)[]
               let allQuests: (number | string)[]
               switch (this.state.totalPlayers!) {
                  case 2: totalQuests = 7
                     break
                  case 3: totalQuests = 9
                     break
                  case 4: totalQuests = 11
                     break
                  default:
                     totalQuests = 1
                     break
               }
               if (this.state.longerVariant) { totalQuests += 2 }
               if (this.state.prioritizeNamed) {
                  chosenQuests = [...questBase[this.state.chosenMap!][0]]
                  allQuests = [...questBase[this.state.chosenMap!][1]]
               } else {
                  chosenQuests = []
                  allQuests = [...questBase[this.state.chosenMap!][0], ...questBase[this.state.chosenMap!][1]]
               }
               chosenQuests = [...chosenQuests, ...randomArraySlice(allQuests, totalQuests - chosenQuests.length)]
               if (this.state.chosenMap! === 0) {
                  chosenQuests = chosenQuests.sort()
               } else {
                  chosenQuests = (chosenQuests as number[]).sort((a, b) => a - b);
               }
               let info = [
                  infoLeft(lang(LANG.CHOSEN_MAP)),
                  infoCenter(lang(LANG.MAP, this.state.chosenMap)),
                  infoLeft(lang(LANG.CHOSEN_QUESTS)),
                  ...chosenQuests.map(e => infoCenter(`${e}`))
               ]
               if (this.state.chosenMap === 10) {
                  const chosenBosses = randomArraySlice(bossesBase, this.state.totalPlayers)
                  info = [
                     ...info,
                     infoLeft(lang(LANG.CHOSEN_BOSSES)),
                     ...chosenBosses.map(e => infoCenter(e))
                  ]
               }
               return {
                  info: info,
                  options: [
                     okBB(lang(LANG.BACK_TO_MAIN))
                  ]
               }
            }

         case ACTION.ADDITIONAL_CAMPS:
            const addedCamps = random(0, 4)
            return {
               info: [
                  infoLeft(lang(LANG.ADDED_CAMPS, addedCamps))
               ],
               options: [
                  okBB(lang(LANG.BACK_TO_MAIN))]
            }

         case ACTION.RANDOM_CHARACTERS:
            if (typeof this.state.totalPlayers === 'undefined') {
               return {
                  info: [infoLeft(lang(LANG.PLAYER_NUMBER))],
                  options: [
                     ...[1, 2, 3, 4].map(e => numberBB(`${e}`, e)),
                     okBB(lang(LANG.BACK_TO_MAIN))
                  ]
               }
            }
            const chosenCharacters = randomArraySlice(characterBase, this.state.totalPlayers)
            return {
               info: [
                  infoLeft(lang(LANG.CHOSEN_CHARACTERS)),
                  ...chosenCharacters.map(e => infoCenter(e))
               ],
               options: [
                  okBB(lang(LANG.BACK_TO_MAIN))]
            }

         case ACTION.RANDOM_CITY:
            const useAmberMines = randomBool()
            const useDay = randomBool()
            return {
               info: [
                  infoLeft(lang(LANG.CITY_SETUP)),
                  infoCenter(lang(useAmberMines ? LANG.AMBER_MINES_YES : LANG.AMBER_MINES_NO)),
                  infoCenter(lang(useDay ? LANG.DAY : LANG.NIGHT)),
               ],
               options: [
                  okBB(lang(LANG.BACK_TO_MAIN))]
            }
      }
   }

   executeAction(value: BBValue): void {
      const setAction = (action: ACTION) => this.state.action = action

      switch (this.state.action) {
         case ACTION.MAIN_SCREEN:
            // chosen randomizer to use
            setAction(value.getNumber())
            return

         case ACTION.RANDOM_QUESTS:
            // whole setup for a set of randomized quests
            if (typeof this.state.chosenMap === 'undefined') {
               this.state.chosenMap = value.getNumber()
            } else if (typeof this.state.totalPlayers === 'undefined') {
               this.state.totalPlayers = value.getNumber()
            } else if (!this.state.settingsDone) {
               if (value.isOK()) {
                  this.state.settingsDone = true
               } else {
                  switch (value.getString()) {
                     case OPTIONS.LONGER_VARIANT:
                        this.state.longerVariant = !this.state.longerVariant
                        break
                     case OPTIONS.PRIORITIZE_NAMED:
                        this.state.prioritizeNamed = !this.state.prioritizeNamed
                        break
                  }
               }
            } else {
               setAction(ACTION.MAIN_SCREEN)
            }
            return

         case ACTION.RANDOM_CHARACTERS:
            // choose random characters
            if (typeof this.state.totalPlayers === 'undefined') {
               this.state.totalPlayers = value.getNumber()
            } else {
               setAction(ACTION.MAIN_SCREEN)
            }
            return

         default:
            setAction(ACTION.MAIN_SCREEN)
            return
      }
   }
}