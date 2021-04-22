import { AppActions } from "../game/actions"
import { gameState } from "../game/state"
import { IstanbulActions } from "./actions"
import { emptyIstanbulMemory, istanbulMemory } from "./memory"
import { emptyIstanbulSettings, istanbulSettings } from "./settings"

export interface istanbulState extends gameState {
   settings: istanbulSettings
   memory: istanbulMemory
   action: AppActions | IstanbulActions
}
export const emptyIstanbulState: () => istanbulState = () => {
   return {
      settings: emptyIstanbulSettings(),
      memory: emptyIstanbulMemory(),
      appAction: false,
      action: IstanbulActions.CHOOSE_PLAYERS
   }
}