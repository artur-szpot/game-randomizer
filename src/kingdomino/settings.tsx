import { gameSettings } from "../game/settings"

export enum kingdominoGamesUsed { KING, QUEEN, BOTH }

export interface kingdominoSettings extends gameSettings {
   gamesUsed: kingdominoGamesUsed
}
export const emptyKingdominoSettings: () => kingdominoSettings = () => {
   return {
      done: false,
      gamesUsed: kingdominoGamesUsed.KING
   }
}