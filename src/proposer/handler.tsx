import { IBBScreenProps } from "../BBScreen"
import { BBValue, BB_STYLE, numberBB, okBB, styledBB } from "../BigButton"
import { GameHandler } from "../GameHandler"
import { randomArraySlice } from "../general/general"
import { infoCenter, infoLeft } from "../Info"
import { dataHandler, game } from "./data/data"
import { allTags, GameLanguage, LANG } from "./language"

enum ACTION {
   CHOOSE_PLAYERS,
   SETTINGS_SCREEN,
   INCLUDE_TAGS,
   EXCLUDE_TAGS,
   CHOOSE_TOTAL,
   SHOW_PROPOSED,
}

enum proposerSettings {
   INCLUDE_TAGS,
   EXCLUDE_TAGS,
   CHOOSE_TOTAL,
   OK,
}

class gameState {
   action: ACTION = ACTION.CHOOSE_PLAYERS
   tagsToInclude: LANG[] = []
   tagsToExclude: LANG[] = []
   totalPropositions: number = 5
}

export class ProposerHandler extends GameHandler {
   allGames: game[]
   state: gameState

   constructor() {
      super(new GameLanguage())
      this.allGames = new dataHandler().getGames(this.language.language)
      this.state = new gameState()
   }

   getScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.get(value)

      switch (this.state.action) {
         case ACTION.CHOOSE_PLAYERS:
            this.players.min = 1
            this.players.max = -1
            return this.getPlayersScreen()

         case ACTION.SETTINGS_SCREEN:
            return {
               options: [
                  numberBB(lang(LANG.SETTINGS_INCLUDE_TAGS), proposerSettings.INCLUDE_TAGS),
                  numberBB(lang(LANG.SETTINGS_EXCLUDE_TAGS), proposerSettings.EXCLUDE_TAGS),
                  numberBB(lang(LANG.SETTINGS_CHOOSE_TOTAL), proposerSettings.CHOOSE_TOTAL),
                  numberBB(lang(LANG.SETTINGS_OK), proposerSettings.OK),
               ]
            }

         case ACTION.INCLUDE_TAGS:
            return {
               info: [infoLeft(lang(LANG.SETTINGS_INCLUDE_TAGS))],
               options: [
                  ...allTags.map(e => styledBB(numberBB(lang(e), e), this.state.tagsToInclude.includes(e) ? BB_STYLE.ON : BB_STYLE.OFF)),
                  numberBB(lang(LANG.SETTINGS_BACK), -1),
               ]
            }

         case ACTION.EXCLUDE_TAGS:
            return {
               info: [infoLeft(lang(LANG.SETTINGS_EXCLUDE_TAGS))],
               options: [
                  ...allTags.map(e => styledBB(numberBB(lang(e), e), this.state.tagsToExclude.includes(e) ? BB_STYLE.ON : BB_STYLE.OFF)),
                  numberBB(lang(LANG.SETTINGS_BACK), -1),
               ]
            }

         case ACTION.CHOOSE_TOTAL:
            return {
               info: [infoLeft(lang(LANG.SETTINGS_BACK))],
               options: [
                  ...[3, 4, 5, 6, 7, 8].map(e => styledBB(numberBB(`${e}`, e), this.state.totalPropositions === e ? BB_STYLE.ON : BB_STYLE.OFF)),
                  numberBB(lang(LANG.SETTINGS_BACK), -1),
               ]
            }

         case ACTION.SHOW_PROPOSED:
            // show proposed games
            const potentialGames: game[] = this.allGames.filter(e =>
               e.min <= this.players.chosen.length
               && e.max >= this.players.chosen.length
               && this.players.chosen.map(el => `${this.players.team}/${el}`).filter(el => (e.exclude ?? []).includes(el)).length === 0
               && (this.state.tagsToInclude.length === 0 || e.tags.filter(el => this.state.tagsToInclude.includes(el)).length > 0)
               && (this.state.tagsToExclude.length === 0 || e.tags.filter(el => this.state.tagsToExclude.includes(el)).length === 0)
            )
            const chosenGames: game[] = randomArraySlice(potentialGames, this.state.totalPropositions)
            return {
               info: [
                  infoLeft(lang(LANG.GAMES)),
                  ...chosenGames.map(e => infoCenter(e.name)),
               ],
               options: [
                  okBB(lang(LANG.NEXT))
               ]
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
               setAction(ACTION.SETTINGS_SCREEN)
            }
            break

         case ACTION.INCLUDE_TAGS:
         case ACTION.EXCLUDE_TAGS:
            //set to include/exclude given tag
            const include = this.state.action === ACTION.INCLUDE_TAGS
            const chosenValue = value.getNumber()
            if (chosenValue === -1) {
               setAction(ACTION.SETTINGS_SCREEN)
               return
            }
            const chosenTag = chosenValue as LANG
            if (include && this.state.tagsToInclude.includes(chosenTag)) {
               this.state.tagsToInclude = this.state.tagsToInclude.filter(el => el !== chosenTag)
            } else if (!include && this.state.tagsToExclude.includes(chosenTag)) {
               this.state.tagsToExclude = this.state.tagsToExclude.filter(el => el !== chosenTag)
            } else if (include) {
               this.state.tagsToInclude.push(chosenTag)
            } else {
               this.state.tagsToExclude.push(chosenTag)
            }
            break

         case ACTION.CHOOSE_TOTAL:
            //set total propositions to show
            const chosenTotal = value.getNumber()
            if (chosenTotal === -1) {
               setAction(ACTION.SETTINGS_SCREEN)
               return
            }
            this.state.totalPropositions = chosenTotal
            break

         case ACTION.SETTINGS_SCREEN:
            //go to the correct settings screen
            const chosenMenu = value.getNumber() as proposerSettings
            switch (chosenMenu) {
               case proposerSettings.CHOOSE_TOTAL:
                  setAction(ACTION.CHOOSE_TOTAL)
                  break
               case proposerSettings.INCLUDE_TAGS:
                  setAction(ACTION.INCLUDE_TAGS)
                  break
               case proposerSettings.EXCLUDE_TAGS:
                  setAction(ACTION.EXCLUDE_TAGS)
                  break
               case proposerSettings.OK:
                  setAction(ACTION.SHOW_PROPOSED)
                  break
            }
            break
      }
   }
}