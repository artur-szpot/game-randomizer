import { ButtonScreenDisplay, ButtonScreenInfo, infoCenter, infoLeft } from "../ButtonScreen"
import { GameHandler } from "../game/handler"
import { gameLanguages } from "../game/languages"
import { gameState } from "../game/state"
import { randomizeArray } from "../general/general"
import { getPlayers, getTeams } from "../players/teams"
import { noValue, numberValue, stringValue, SuperButtonProps, SuperButtonValue } from "../SuperButton"
import { KingdominoActions } from "./actions"
import { kingdominoLanguage, getLanguage } from "./language"
import { kingdominoGamesUsed } from "./settings"
import { kingdominoState } from "./state"


export class KingdominoHandler extends GameHandler {
   language: kingdominoLanguage

   constructor() {
      super()
      const language = gameLanguages.POLSKI
      this.language = getLanguage(language)
   }

   getScreenIndividual(state: gameState): ButtonScreenDisplay | undefined {
      const castState = state as kingdominoState

      switch (castState.action) {
         case KingdominoActions.CHOOSE_PLAYERS:
            // choose which players take part
            return {
               info: [infoLeft(this.language.CHOOSE_PLAYERS)],
               options: getTeams().map(e => stringValue(e, e))
            }
         case KingdominoActions.CHOOSE_GAME:
            //choose which game(s) are being played
            return {
               info: [infoLeft(this.language.CHOOSE_GAME)],
               options: [
                  numberValue(this.language.sets.KING, kingdominoGamesUsed.KING),
                  numberValue(this.language.sets.QUEEN, kingdominoGamesUsed.QUEEN),
                  numberValue(this.language.sets.BOTH, kingdominoGamesUsed.BOTH)
               ]
            }
         case KingdominoActions.SHOW_TILES:
            // show tiles to use in this round
            // in first round, also show player order
            let players: string[] = []
            let playerOrder: ButtonScreenInfo[] = []
            const currentRound = castState.memory.currentRound
            const firstRound = currentRound == 0
            if (firstRound) {
               players = randomizeArray(this.allPlayers)
               if (players.length === 2) {
                  players = [
                     players[0],
                     players[1],
                     players[1],
                     players[0]
                  ]
               }
               playerOrder = [
                  infoLeft(this.language.PLAYER_ORDER),
                  ...players.map(e => infoCenter(e))
               ]
            }

            let totalTiles = 4
            if (this.allPlayers.length === 3) {
               totalTiles = 3
            } else if (castState.settings.gamesUsed === kingdominoGamesUsed.BOTH) {
               totalTiles = 8
            }

            let tilesUsed: ButtonScreenInfo[] = [infoLeft(this.language.TILES_USED)]
            let tileNumbers: number[] = []
            switch (castState.settings.gamesUsed) {
               case kingdominoGamesUsed.BOTH:
                  const modifiedRound = Math.floor(currentRound / 2)
                  if (currentRound % 2) {
                     tilesUsed.push(infoCenter(this.language.sets.KING))
                     for (let i = modifiedRound * totalTiles; i < (modifiedRound + 1) * totalTiles; i++) {
                        tileNumbers.push(castState.memory.kingTiles[i])
                     }
                  } else {
                     tilesUsed.push(infoCenter(this.language.sets.QUEEN))
                     for (let i = modifiedRound * totalTiles; i < (modifiedRound + 1) * totalTiles; i++) {
                        tileNumbers.push(castState.memory.queenTiles[i])
                     }
                  }
                  break
               case kingdominoGamesUsed.KING:
                  for (let i = currentRound * totalTiles; i < (currentRound + 1) * totalTiles; i++) {
                     tileNumbers.push(castState.memory.kingTiles[i])
                  }
                  break
               case kingdominoGamesUsed.QUEEN:
                  for (let i = currentRound * totalTiles; i < (currentRound + 1) * totalTiles; i++) {
                     tileNumbers.push(castState.memory.queenTiles[i])
                  }
                  break
            }
            tileNumbers.sort((a, b) => a - b)
            for (let tile of tileNumbers) {
               tilesUsed.push(infoCenter(`${tile}`))
            }

            let options: SuperButtonProps[] = []
            if (castState.memory.currentRound < 11) {
               options.push(noValue(this.language.NEXT_ROUND))
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

   executeActionIndividual(state: gameState, value?: SuperButtonValue): gameState {
      const castState = state as kingdominoState
      switch (castState.action) {
         case KingdominoActions.CHOOSE_PLAYERS:
            // choose which players take part
            this.allPlayers = getPlayers(value!.value.string!)
            Object.assign(castState, {
               action: KingdominoActions.CHOOSE_GAME
            })
            break
         case KingdominoActions.CHOOSE_GAME:
            // chosen game to play
            Object.assign(castState, {
               settings: Object.assign(castState.settings, { gamesUsed: value!.value.number! }),
               memory: Object.assign(castState.memory, {
                  kingTiles: randomizeArray(Array(48).fill(0).map((_, i) => i + 1)),
                  queenTiles: randomizeArray(Array(48).fill(0).map((_, i) => i + 1)),
                  currentRound: 0
               }),
               action: KingdominoActions.SHOW_TILES
            })
            break
         case KingdominoActions.SHOW_TILES:
            // next round
            Object.assign(castState, {
               memory: Object.assign(castState.memory, {
                  currentRound: castState.memory.currentRound + 1
               })
            })
            break

      }
      return castState
   }
}