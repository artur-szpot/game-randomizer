import { Language, baseLanguage as LANG, allGames, GAME } from "./Language"
import { stringBB, BBValue, styledBB, BB_STYLE, okBB, BB_STYLE_ON_OFF } from "./BigButton"
import { IBBScreenProps } from "./BBScreen"
import { getPlayers, getTeams } from "./players/teams"
import { infoLeft } from "./Info"

export class GameHandler {
   language: Language
   players: {
      min: number
      max: number
      team: string
      available: { name: string, chosen: boolean }[]
      chosen: string[]
   }

   constructor(language: Language) {
      this.language = language
      this.players = {
         min: 2,
         max: 4,
         team: '',
         available: [],
         chosen: []
      }
   }

   getScreen(): IBBScreenProps {
      const game = (value: GAME) => this.language.getGame(value)

      return {
         mainMenu: true,
         options: allGames.map(e => stringBB(game(e), e))
      }
   }

   getPlayersScreen(): IBBScreenProps {
      const lang = (value: LANG) => this.language.getBase(value)

      if (!this.players.team.length) {
         return {
            info: [infoLeft(lang(LANG.CHOOSE_TEAM))],
            options: getTeams().map(e => stringBB(e, e))
         }
      }
      const totalChosen = this.players.available.filter(e => e.chosen).length
      let chosenError: string | undefined
      if (this.players.min !== -1 && totalChosen < this.players.min) {
         chosenError = `${lang(LANG.TOO_FEW_PLAYERS)} ${this.players.min}`
      }
      if (this.players.max !== -1 && totalChosen > this.players.max) {
         chosenError = `${lang(LANG.TOO_MANY_PLAYERS)} ${this.players.max}`
      }
      return {
         info: [infoLeft(lang(LANG.CHOOSE_PLAYERS))],
         options: [
            ...this.players.available.map(e => styledBB(stringBB(e.name, e.name), BB_STYLE_ON_OFF(e.chosen))),
            typeof chosenError === 'undefined' ? okBB(lang(LANG.OK)) : styledBB(okBB(chosenError), BB_STYLE.DISABLED)
         ]
      }
   }

   executeAction(value: BBValue): void { }

   executePlayersAction(value: BBValue): void {
      if (!this.players.team.length) {
         this.players.team = value.getString()
         this.players.available = getPlayers(this.players.team).map(e => { return { name: e, chosen: true } })
         return
      }
      if (value.isOK()) {
         this.players.chosen = this.players.available.filter(e => e.chosen).map(e => e.name)
         return
      }
      const toggledPlayer = value.getString()
      for (let player of this.players.available) {
         if (player.name === toggledPlayer) {
            player.chosen = !player.chosen
            return
         }
      }
   }
}