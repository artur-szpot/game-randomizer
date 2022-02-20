import { IBBScreenProps } from "../BBScreen"
import { BBValue, okBB } from "../BigButton"
import { GameHandler } from "../GameHandler"
import { random } from "../general/general"
import { infoCenter, infoLeft } from "../Info"
import { dataHandler, ghostThing } from "./data/data"
import { GameLanguage, LANG } from "./language"

enum ACTION {
   THING          // the only state: show chosen word, allow changes
}

class gameState {
   action: ACTION = ACTION.THING
   // memory
   currentThing: number = 0
   rejectedThings: number[] = []
}

export class GhostHandler extends GameHandler {
   allThings: ghostThing[]
   dictThings: { [key: number]: ghostThing }
   state: gameState

   constructor() {
      super(new GameLanguage())
      const data = new dataHandler()
      this.allThings = data.getThings(this.language.language)
      let dictThings: { [key: number]: ghostThing } = {}
      for (let thing of this.allThings) {
         dictThings[thing.id] = thing
      }
      this.dictThings = dictThings
      this.state = new gameState()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.get(value)

      switch (this.state.action) {
         case ACTION.THING:
            // choose number of players
            return {
               info: [
                  infoLeft(lang(LANG.ACCEPT_OR_NOT)),
                  infoCenter(this.getThing(this.state.currentThing === 0 ? this.chooseThing() : this.state.currentThing ))
               ],
               options: [
                  okBB(lang(LANG.CHANGE))
               ]
            }
      }
   }

   executeAction(value: BBValue): void {
      switch (this.state.action) {
         case ACTION.THING:
            this.state.rejectedThings = [...this.state.rejectedThings, this.state.currentThing]
            this.state.currentThing = this.chooseThing()
            break
      }
   }

   chooseThing(): number {
      const all = this.allThings.filter(e => !this.state.rejectedThings.includes(e.id))
      const total = all.length
      const chosen = random(0, total - 1)
      return all[chosen].id
   }

   getThing(id: number): string {
      const thing = this.dictThings[id]
      return thing.name
   }
}