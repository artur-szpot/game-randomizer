import { AppActions } from "./actions";
import { emptyGameSettings, gameSettings } from "./settings";

export interface gameState {
   settings: gameSettings
   memory: any
   appAction: boolean
   action: any
}
export const emptyGameState: () => gameState = () => {
   return {
      settings: emptyGameSettings(),
      memory: {},
      appAction: true,
      action: AppActions.MENU
   }
}