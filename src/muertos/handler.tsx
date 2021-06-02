import { GameHandler } from "../GameHandler"
import { random, randomArraySlice, randomizeArray } from "../general/general"
import { infoCenter, infoLeft } from "../Info"
import { booleanBB, numberBB, okBB, BBValue } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { muertosCharacter, dataHandler } from "./data/data"
import { GameLanguage, LANG } from "./language"

enum ACTION {
   SET_PLAYERS,   // choose number of players
   SET_RULES,     // set the number of rules to use
   PASS,          // pass the device to next player
   ACCEPT,        // user can accept the character or not
   BEGIN,         // everybody accepted, show the rules
   END,           // show all choices
}

class gameState {
   action: ACTION = ACTION.SET_PLAYERS
   // settings
   players: number = -1
   // memory
   currentCharacter: number = -1
   rejectedCharacters: number[] = []
   chosenCharacters: number[] = []
   chosenRules: { [key: number]: string } = {}
}

export class MuertosHandler extends GameHandler {
   allCharacters: muertosCharacter[]
   allRules: string[]
   dictCharacters: { [key: number]: muertosCharacter }
   state: gameState

   constructor() {
      super(new GameLanguage())
      const data = new dataHandler()
      this.allCharacters = data.getCharacters(this.language.language)
      this.allRules = data.getRules(this.language.language)
      let dictCharacters: { [key: number]: muertosCharacter } = {}
      for (let character of this.allCharacters) {
         dictCharacters[character.id] = character
      }
      this.dictCharacters = dictCharacters
      this.state = new gameState()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.get(value)

      switch (this.state.action) {
         case ACTION.SET_PLAYERS:
            // choose number of players
            return {
               options: [3, 4, 5, 6, 7, 8].map(e => numberBB(`${e} ${lang(LANG.PLAYERS)}`, e))
            }
         case ACTION.SET_RULES:
            // choose number of rules
            return {
               info: [infoCenter(lang(LANG.CHOOSE_RULES_NUMBER))],
               options: [0, 1, 2, 3, 4].map(e => numberBB(`${e}`, e))
            }
         case ACTION.PASS:
            // pass the device to next player
            return {
               info: [infoCenter(lang(LANG.PASS_DEVICE))],
               options: [okBB(lang(LANG.OK))]
            }
         case ACTION.ACCEPT:
            // user can accept the character or not
            return {
               info: [
                  infoLeft(lang(LANG.ACCEPT_OR_NOT)),
                  infoCenter(this.getCharacter(this.state.currentCharacter))
               ],
               options: [
                  booleanBB(lang(LANG.ACCEPT), true),
                  booleanBB(lang(LANG.REJECT), false)
               ]
            }
         case ACTION.BEGIN:
            // everybody accepted, show the rules
            return {
               info: [
                  infoCenter(lang(LANG.RULES_LIST_HEADER)),
                  ...[1, 2, 3, 4].map(e => {
                     if (!this.state.chosenRules.hasOwnProperty(e)) {
                        return infoLeft(`${e}. ${lang(LANG.NO_RULE)}`)
                     }
                     return infoLeft(`${e}. ${this.state.chosenRules[e]}`)
                  })
               ],
               options: [okBB(lang(LANG.SHOW_CHARACTERS))]
            }
         case ACTION.END:
            // show all characters to choose from
            return {
               info: [
                  infoLeft(lang(LANG.CHARACTER_LIST_HEADER)),
                  ...this.state.chosenCharacters.map((e, i) => infoLeft(`${i + 1}. ${this.getCharacter(e)}`))
               ],
               options: []
            }
      }
   }

   executeAction(value: BBValue): void {
      const setAction = (action: ACTION) => this.state.action = action

      switch (this.state.action) {
         case ACTION.SET_PLAYERS:
            // chosen number of players
            setAction(ACTION.SET_RULES)
            this.state.players = value.getNumber()
            break

         case ACTION.SET_RULES:
            // chosen number of rules
            setAction(ACTION.PASS)
            this.state.chosenRules = this.chooseRules(value.getNumber())
            break

         case ACTION.PASS:
            // passed the device to next player
            setAction(ACTION.ACCEPT)
            this.state.currentCharacter = this.chooseCharacter()
            break

         case ACTION.ACCEPT:
            // user accepted the character or not
            // reject the character whether it was chosen or not to prevent it from reappearing
            this.state.rejectedCharacters = [...this.state.rejectedCharacters, this.state.currentCharacter]
            if (value.getBoolean()) {
               this.state.chosenCharacters = [...this.state.chosenCharacters, this.state.currentCharacter]
               this.state.currentCharacter = -1
               // if all players have chosen their character, fill up to 8
               const allChosen = this.state.chosenCharacters.length === this.state.players
               if (allChosen) {
                  while (this.state.chosenCharacters.length < 8) {
                     this.state.chosenCharacters.push(this.chooseCharacter())
                  }
                  this.state.chosenCharacters = randomizeArray(this.state.chosenCharacters)
               }
               setAction(allChosen ? ACTION.BEGIN : ACTION.PASS)
            } else {
               this.state.currentCharacter = this.chooseCharacter()
            }
            break

         case ACTION.BEGIN:
            // game over, show choices
            setAction(ACTION.END)
            break
      }
   }

   chooseCharacter(): number {
      const all = this.allCharacters.filter(e => !this.state.rejectedCharacters.includes(e.id))
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