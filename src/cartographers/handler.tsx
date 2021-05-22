import { GameHandler } from "../GameHandler"
import { BBValue, BB_STYLE_ON_OFF, okBB, stringBB, styledBB } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { GameLanguage, LANG } from "./language"
import { infoCenter, infoLeft } from "../Info"
import { random, randomArraySlice, randomizeArray } from "../general/general"
import { dataHandler } from "./data/data"

enum ACTION {
   CHOOSE_EXTENSIONS,
   SHOW,
}

enum OPTIONS {
   SKILLS = 'skills'
}

class gameState {
   action: ACTION = ACTION.CHOOSE_EXTENSIONS
   // settings
   useSkills: boolean = false
   // memory
   boardSide: string = 'A'
   decrees: { [key: string]: string } = {}
   skills: string[] = []
}

const DECREE_LIST = ['A', 'B', 'C', 'D']

export class CartographersHandler extends GameHandler {
   state: gameState
   decrees: string[]
   skills: string[]

   constructor() {
      super(new GameLanguage())
      this.state = new gameState()
      const data = new dataHandler()
      this.skills = data.getSkills(this.language.language)
      this.decrees = data.getDecrees(this.language.language)
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.get(value)

      switch (this.state.action) {
         case ACTION.CHOOSE_EXTENSIONS:
            return {
               info: [infoLeft(lang(LANG.CHOOSE_EXTENSIONS))],
               options: [
                  styledBB(stringBB(lang(LANG.SKILLS), OPTIONS.SKILLS), BB_STYLE_ON_OFF(this.state.useSkills)),
                  okBB(lang(LANG.OK))
               ]
            }

         case ACTION.SHOW:
            let info = [
               infoLeft(`${lang(LANG.BOARD_SIDE)}: ${this.state.boardSide}`),
               infoLeft(`${lang(LANG.DECREES)}:`),
               ...DECREE_LIST.map(e => infoCenter(`${e}: ${this.state.decrees[e]}`))
            ]
            if (this.state.useSkills) {
               info.push(infoLeft(`${lang(LANG.SKILLS)}:`))
               this.state.skills.forEach(e => info.push(infoCenter(e)))
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
         case ACTION.CHOOSE_EXTENSIONS:
            // toggled/chosen which extensions to use
            if (value.isOK()) {
               this.randomize()
               setAction(ACTION.SHOW)
               return
            }
            switch (value.getString()) {
               case OPTIONS.SKILLS:
                  this.state.useSkills = !this.state.useSkills
                  return
            }
            break
      }
   }


   randomize(): void {
      this.state.boardSide = ['A', 'B'][random(0, 1)]
      let decrees: number[] = []
      let skills: number[] = []

      for (let i = 0; i < 4; i++) {
         let choices = [0, 1, 2, 3].map(e => i * 4 + e)
         decrees.push(randomArraySlice(choices, 1)[0])
      }
      decrees = randomizeArray(decrees)
      DECREE_LIST.map((e, i) => this.state.decrees[e] = this.decrees[decrees[i]])

      skills = randomArraySlice([0, 1, 2, 3, 4, 5, 6, 7], 3)
      this.state.skills = skills.map(e => this.skills[e])
   }
}
