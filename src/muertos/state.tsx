import { AppActions } from "../game/actions"
import { gameState } from "../game/state"
import { MuertosActions } from "./actions"
import { emptyMuertosMemory, muertosMemory } from "./memory"
import { muertosSettings, emptyMuertosSettings } from "./settings"

export interface muertosState extends gameState {
   settings: muertosSettings
   memory: muertosMemory
   action: AppActions | MuertosActions
}
export const emptyMuertosState: () => muertosState = () => {
//    return {
//       settings: emptyMuertosSettings(),
//       memory: emptyMuertosMemory(),
//       appAction: true,
//       action: AppActions.MENU
//    }
// }
// export const startMuertosState: () => muertosState = () => {
   return {
      settings: emptyMuertosSettings(),
      memory: emptyMuertosMemory(),
      appAction: false,
      action: MuertosActions.SET_PLAYERS
   }
}