import { GameHandler } from "../GameHandler"
import { BBICon, BBValue, BB_STYLE_ON_OFF, IBBProps, okBB, stringBB, styledBB } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { GameLanguage, LANG } from "./language"
import { BlockContainerType, BlockType, infoBlock, infoCenter, infoLeft, InfoProps } from "../Info"
import { random, randomArraySlice, randomArraySplice, randomizeArray } from "../general/general"
import { cartographersCard, cartographersShape, dataHandler } from "./data/data"

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
   deck: number[] = []
   discard: number[] = []
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
      const data = this.getScreenAndMenu()
      return {
         info: data.info,
         options: data.options,
      }
   }

   getBottomMenu(): IBBScreenProps {
      const data = this.getScreenAndMenu()
      return {
         bottomMenu: data.bottomMenu
      }
   }

   getScreenAndMenu(): IBBScreenProps {
      const lang = (value: LANG, index?: number) => this.language.get(value, index)
      let info: InfoProps[] = []
      let options: IBBProps[] = []
      let bottomMenu: BBICon[] = [BBICon.HOME]

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
               options = [okBB(lang(LANG.NEXT))]
               info = [
                  infoLeft(`${lang(LANG.SEASON, this.state.season)} (${this.state.time}/${this.maxSeasonTime[this.state.season]})`),
               ]
               const card = this.cards[this.state.currentCard]
               if (this.state.currentCard >= 0) {
                  info.push(infoCenter(card.types.map(e => lang(LANG.TERRAIN_NAME, e)).join(', ')))
                  info.push(infoCenter(card.types.map(e => lang(LANG.TERRAIN, e)).join(' ')))
               }
               // card.types.forEach(e => info.push(infoCenter(lang(LANG.TERRAIN, e))))
               if (card.shapes.length === 1) {
                  info.push(infoBlock(this.parseFields(card.shapes[0]), BlockContainerType.FULL, BlockType.CONCISE))
               } else if (card.shapes.length === 2) {
                  info.push(infoBlock(this.parseFields(card.shapes[0]), BlockContainerType.HALF, BlockType.CONCISE))
                  info.push(infoBlock(this.parseFields(card.shapes[1]), BlockContainerType.HALF, BlockType.CONCISE))
               }
               info.push(infoCenter(lang(LANG.CARD, this.state.currentCard)))
            } else {
               info = [
                  infoLeft(lang(LANG.GAME_OVER))
               ]
            }
            break
      }
      return { info, options, bottomMenu }
   }

   parseFields(shape: cartographersShape): number[][] {
      const goldRatio = shape.coin ? 2 : 1
      const fields = shape.fields.map(e => e.map(el => el * goldRatio))
      return fields
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
            this.state.deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // temp
            this.state.discard = []
            setAction(ACTION.GAME)
            this.executeAction(BBValue.noValue())
            break

         case ACTION.GAME:
            const finishSeason = this.state.time >= this.maxSeasonTime[this.state.season]
            let drawNewCard = true
            if (finishSeason) {
               if (this.state.currentCard >= 0) {
                  this.state.currentCard = -(this.state.season + 1)
                  drawNewCard = false
               } else {
                  this.state.season += 1
                  this.state.time = 0
                  this.state.deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // temp
               }
            }
            if (drawNewCard) {
               const chosenCard = randomArraySplice(this.state.deck, 1)[0]
               this.state.currentCard = chosenCard
               this.state.discard.push(chosenCard)
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
   }
}
