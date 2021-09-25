import { GameHandler } from "../GameHandler"
import { okBB } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { GameLanguage, LANG } from "./language"
import { infoCenter, infoLeft } from "../Info"
import { random, randomArraySplice } from "../general/general"

enum ACTION {
   RANDOMIZE
}

class gameState {
   action: ACTION = ACTION.RANDOMIZE
}

export class EscapeHandler extends GameHandler {
   state: gameState

   constructor() {
      super(new GameLanguage())
      this.state = new gameState()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.get(value)

      switch (this.state.action) {
         case ACTION.RANDOMIZE:
            let allRooms = [
               LANG.ROOM_1,
               LANG.ROOM_2,
               LANG.ROOM_3,
               LANG.ROOM_4,
               LANG.ROOM_5,
               LANG.ROOM_6,
               LANG.ROOM_7,
               LANG.ROOM_8,
               LANG.ROOM_9,
            ]
            const chosenRooms = randomArraySplice(allRooms, 3)
            const diceRolls = [
               random(1,6),
               random(1,6),
               random(1,6),
            ]
            return {
               info: [
                  infoLeft(lang(LANG.ROOMS)),
                  ...chosenRooms.map(e=> infoCenter(lang(e))),
                  infoLeft(lang(LANG.DICE)),
                  ...diceRolls.map(e=> infoCenter(`${e}`)),
               ],
               options: [
                  okBB(lang(LANG.NEXT))
               ]
            }
      }
   }

   // executeAction(value: BBValue): void {
   //    const setAction = (action: ACTION) => this.state.action = action

   //    switch (this.state.action) {
   //       case ACTION.CHOOSE_PLAYERS:
   //          // chosen which players take part
   //          this.executePlayersAction(value)
   //          if (this.players.chosen.length) {
   //             setAction(ACTION.SOME_ACTION)
   //             return
   //          }
   //          break
   //    }
   // }
}