import { IBBScreenProps } from "../BBScreen"
import { BBValue } from "../BigButton"
import { GameHandler } from "../GameHandler"
import { randomArrayElement, } from "../general/general"
import { infoCenter, infoLeft } from "../Info"
import { GameLanguage, LANG } from "./language"

export enum ACTION {
   CHOOSE_PLAYERS,// choose which players take part
   SHOW,          // show results
}

class gameState {
   action: ACTION = ACTION.CHOOSE_PLAYERS
   // settings
   players: string[] = []
}

export class FirstHandler extends GameHandler {
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
            this.players.max = -1
            return this.getPlayersScreen()

         case ACTION.SHOW:
            return {
               info: [
                  infoLeft(lang(LANG.FIRST_PLAYER)),
                  infoCenter(randomArrayElement(this.players.chosen))
               ],
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