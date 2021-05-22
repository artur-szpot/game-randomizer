import { GameHandler } from "../GameHandler"
import { BBValue } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { GameLanguage, LANG } from "./language"

enum ACTION {
   CHOOSE_PLAYERS,
   SOME_ACTION,
}

class gameState {
   action: ACTION = ACTION.CHOOSE_PLAYERS
   // settings
   setting: number = -1
   // memory
   value: string = 'hello'
}

export class EmptyHandler extends GameHandler {
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
            this.players.max = 4
            return this.getPlayersScreen()

         case ACTION.SOME_ACTION:
            // screen description
            return {
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
               setAction(ACTION.SOME_ACTION)
               return
            }
            break
      }
   }
}