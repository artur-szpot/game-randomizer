import { GameHandler } from "../GameHandler"
import { BBValue, BB_STYLE_ON_OFF, IBBProps, okBB, stringBB, styledBB } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { GameLanguage, LANG } from "./language"
import { infoBlock, infoBlockShape, infoCenter, infoLeft, InfoProps } from "../Info"
import { random, randomArraySlice, randomizeArray } from "../general/general"
import { cartographersCard, dataHandler } from "./data/data"

enum ACTION {
   CHOOSE_EXTENSIONS,
   INITIAL_SETUP,
   GAME,
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
   cards: number[] = []
   time: number = 0
   season: number = 0
   currentCard: number = 0
   baseDeck: number[] = []
   ambushes: number[] = []
   heroes: number[] = []
   currentDeck: number[] = []
   ruinMod: boolean = false
}

const DECREE_LIST = ['A', 'B', 'C', 'D']

export class CartographersHandler extends GameHandler {
   state: gameState
   decrees: string[]
   skills: string[]
   cards: { [key: number]: cartographersCard }
   maxSeasonTime = [8, 8, 7, 6]

   constructor() {
      super(new GameLanguage())
      this.state = new gameState()
      const data = new dataHandler()
      this.skills = data.getSkills(this.language.language)
      this.decrees = data.getDecrees(this.language.language)
      this.cards = data.getCards()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG, index?: number) => this.language.get(value, index)
      let info: InfoProps[] = []
      let options: IBBProps[] = []

      switch (this.state.action) {
         case ACTION.CHOOSE_EXTENSIONS:
            info = [infoLeft(lang(LANG.CHOOSE_EXTENSIONS))]
            options = [
               styledBB(stringBB(lang(LANG.SKILLS), OPTIONS.SKILLS), BB_STYLE_ON_OFF(this.state.useSkills)),
               okBB(lang(LANG.OK))
            ]
            break

         case ACTION.INITIAL_SETUP:
            info = [
               infoLeft(`${lang(LANG.BOARD_SIDE)}: ${this.state.boardSide}`),
               infoLeft(`${lang(LANG.DECREES)}:`),
               ...DECREE_LIST.map(e => infoCenter(`${e}: ${this.state.decrees[e]}`))
            ]
            if (this.state.useSkills) {
               info.push(infoLeft(`${lang(LANG.SKILLS)}:`))
               this.state.skills.forEach(e => info.push(infoCenter(e)))
            }
            options = [
               okBB(lang(LANG.START))
            ]
            break

         case ACTION.GAME:
            if (this.state.season < 4) {
               const card = this.cards[this.state.currentCard]
               options = [okBB(lang(LANG.NEXT))]
               info = [
                  infoLeft(`${lang(LANG.SEASON, this.state.season)} (${this.state.time}/${this.maxSeasonTime[this.state.season]})`),
                  infoCenter(
                     lang(LANG.CARD, this.state.currentCard)
                     + (this.state.ruinMod && (card.types.length > 1 || card.types[0] !== 4) ? lang(LANG.RUIN_MOD) : '')
                  ),
               ]
               card.types.forEach(e => info.push(infoCenter(lang(LANG.TERRAIN, e))))
               if (card.shapes.length === 1) {
                  info.push(infoBlockShape(card.shapes[0].fields))
               } else if (card.shapes.length === 2) {
                  info.push(infoBlockShape(card.shapes[0].fields, true))
                  info.push(infoBlockShape(card.shapes[1].fields, true))
               }
            } else {
               info = [
                  infoLeft(lang(LANG.CARD, this.state.currentCard))
               ]
            }
            break
      }
      return { info, options }
   }

   executeAction(value: BBValue): void {
      const setAction = (action: ACTION) => this.state.action = action

      switch (this.state.action) {
         case ACTION.CHOOSE_EXTENSIONS:
            // toggled/chosen which extensions to use
            if (value.isOK()) {
               this.randomize()
               setAction(ACTION.INITIAL_SETUP)
               return
            }
            switch (value.getString()) {
               case OPTIONS.SKILLS:
                  this.state.useSkills = !this.state.useSkills
                  return
            }
            break

         case ACTION.INITIAL_SETUP:
            setAction(ACTION.GAME)
            this.executeAction(value)
            break

         case ACTION.GAME:
            const finishSeason = this.state.time >= this.maxSeasonTime[this.state.season]
            if (finishSeason) {
               if (this.state.currentCard >= 0) {
                  // Display season end card
                  this.state.ruinMod = false
                  this.state.currentCard = -(this.state.season + 1)
               } else {
                  // Begin next season
                  this.state.season += 1
                  if (this.state.season < 4) {
                     this.shuffleDecks()
                     this.drawCard()
                     this.state.time = this.cards[this.state.currentCard].time
                  } else {
                     this.state.currentCard = -(this.state.season + 1)
                  }
               }
            } else {
               // Draw next card
               this.drawCard()
               this.state.time += this.cards[this.state.currentCard].time
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

      this.createDecks()
      this.shuffleDecks()
   }

   createDecks(): void {
      this.state.baseDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      this.state.ambushes = randomArraySlice([13, 14, 15, 16, 17, 18, 19, 20], 4)
   }

   shuffleDecks(): void {
      let preserve: number[] = this.state.currentDeck.filter(e => !this.state.baseDeck.includes(e))
      if (this.state.heroes.length) {
         preserve.push(this.state.heroes.pop()!)
      }
      preserve.push(this.state.ambushes.pop()!)
      this.state.currentDeck = randomizeArray([...preserve, ...this.state.baseDeck])
      this.state.ruinMod = false
   }

   drawCard(): void {
      let card = this.cards[this.state.currentCard]
      if (card.types.length !== 1 || !(card.types.includes(4) || card.types.includes(5) || card.types.includes(6))) {
         this.state.ruinMod = false
      }

      this.state.currentCard = this.state.currentDeck.pop()!
      card = this.cards[this.state.currentCard]
      if (card.types.length === 1 && card.types[0] === 5) {
         this.state.ruinMod = true
         this.drawCard()
      }
   }
}
