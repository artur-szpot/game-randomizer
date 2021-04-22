import { AppActions } from "../game/actions"
import { gameState } from "../game/state"
import { KingdominoActions } from "./actions"
import { emptyKingdominoMemory, kingdominoMemory } from "./memory"
import { kingdominoSettings, emptyKingdominoSettings } from "./settings"

export interface kingdominoState extends gameState {
   settings: kingdominoSettings
   memory: kingdominoMemory
   action: AppActions | KingdominoActions
}
export const emptyKingdominoState: () => kingdominoState = () => {
   return {
      settings: emptyKingdominoSettings(),
      memory: emptyKingdominoMemory(),
      appAction: false,
      action: KingdominoActions.CHOOSE_PLAYERS
   }
}