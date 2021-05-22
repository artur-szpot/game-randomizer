import { GameHandler } from "../GameHandler"
import { BBValue, IBBProps, numberBB, okBB } from "../BigButton"
import { IBBScreenProps } from "../BBScreen"
import { GameLanguage, LANG } from "./language"
import { randomizeArray } from "../general/general"
import { infoLeft, infoCenter, InfoProps } from "../Info"

enum ACTION {
   CHOOSE_PLAYERS,   // choose which players take part
   CHOOSE_GAME,      // choose which game is played (king, queen, both)
   SHOW_TILES,       // show tiles [and starting order in first round]
}

export enum kingdominoGamesUsed { KING, QUEEN, BOTH }

class gameState {
   action: ACTION = ACTION.CHOOSE_PLAYERS
   // settings
   players: string[] = []
   gamesUsed: kingdominoGamesUsed = kingdominoGamesUsed.KING
   // memory
   kingTiles: number[] = []
   queenTiles: number[] = []
   currentRound: number = -1
}

export class KingdominoHandler extends GameHandler {
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
            this.players.max = 6
            return this.getPlayersScreen()

         case ACTION.CHOOSE_GAME:
            //choose which game(s) are being played
            return {
               info: [infoLeft(lang(LANG.CHOOSE_GAME))],
               options: [
                  numberBB(lang(LANG.SET_KING), kingdominoGamesUsed.KING),
                  numberBB(lang(LANG.SET_QUEEN), kingdominoGamesUsed.QUEEN),
                  numberBB(lang(LANG.SET_BOTH), kingdominoGamesUsed.BOTH)
               ]
            }
         case ACTION.SHOW_TILES:
            // show tiles to use in this round
            // in first round, also show player order
            let players: string[] = []
            let playerOrder: InfoProps[] = []
            const currentRound = this.state.currentRound
            const firstRound = currentRound === 0
            if (firstRound) {
               players = randomizeArray(this.players.chosen)
               if (players.length === 2) {
                  players = [
                     players[0],
                     players[1],
                     players[1],
                     players[0]
                  ]
               }
               playerOrder = [
                  infoLeft(lang(LANG.PLAYER_ORDER)),
                  ...players.map(e => infoCenter(e))
               ]
            }

            let totalTiles = 4
            if (this.players.chosen.length === 3) {
               totalTiles = 3
            } else if (this.state.gamesUsed === kingdominoGamesUsed.BOTH) {
               totalTiles = 8
            }

            let tilesUsed: InfoProps[] = [infoLeft(lang(LANG.TILES_USED))]
            let tileNumbers: number[] = []
            switch (this.state.gamesUsed) {
               case kingdominoGamesUsed.BOTH:
                  const modifiedRound = Math.floor(currentRound / 2)
                  if (currentRound % 2) {
                     tilesUsed.push(infoCenter(lang(LANG.SET_KING)))
                     for (let i = modifiedRound * totalTiles; i < (modifiedRound + 1) * totalTiles; i++) {
                        tileNumbers.push(this.state.kingTiles[i])
                     }
                  } else {
                     tilesUsed.push(infoCenter(lang(LANG.SET_QUEEN)))
                     for (let i = modifiedRound * totalTiles; i < (modifiedRound + 1) * totalTiles; i++) {
                        tileNumbers.push(this.state.queenTiles[i])
                     }
                  }
                  break
               case kingdominoGamesUsed.KING:
                  for (let i = currentRound * totalTiles; i < (currentRound + 1) * totalTiles; i++) {
                     tileNumbers.push(this.state.kingTiles[i])
                  }
                  break
               case kingdominoGamesUsed.QUEEN:
                  for (let i = currentRound * totalTiles; i < (currentRound + 1) * totalTiles; i++) {
                     tileNumbers.push(this.state.queenTiles[i])
                  }
                  break
            }
            tileNumbers.sort((a, b) => a - b)
            for (let tile of tileNumbers) {
               tilesUsed.push(infoCenter(`${tile}`))
            }

            let options: IBBProps[] = []
            if (this.state.currentRound < 11) {
               options.push(okBB(lang(LANG.NEXT_ROUND)))
            }
            return {
               info: [
                  ...playerOrder,
                  ...tilesUsed
               ],
               options: options
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
               setAction(ACTION.CHOOSE_GAME)
               return
            }
            break

         case ACTION.CHOOSE_GAME:
            // chosen game to play
            this.state.gamesUsed = value.getNumber() as kingdominoGamesUsed
            this.state.kingTiles = randomizeArray(Array(48).fill(0).map((_, i) => i + 1))
            this.state.queenTiles = randomizeArray(Array(48).fill(0).map((_, i) => i + 1))
            this.state.currentRound = 0
            setAction(ACTION.SHOW_TILES)
            break

         case ACTION.SHOW_TILES:
            // next round
            this.state.currentRound = this.state.currentRound + 1
            break
      }
   }
}