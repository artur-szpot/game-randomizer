import { AppActions } from "../game/actions"
import { emptyGameSettings } from "../game/settings"
import { gameState } from "../game/state"
import { CodenamesActions } from "./actions"

export interface codenamesState extends gameState {
   action: AppActions | CodenamesActions
}
export const emptyCodenamesState: () => codenamesState = () => {
   return {
      settings: emptyGameSettings(),
      memory: {},
      appAction: false,
      action: CodenamesActions.CHOOSE_PLAYERS
   }
}