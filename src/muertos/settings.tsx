import { gameSettings } from "../game/settings"

export interface muertosSettings extends gameSettings {
   players: number
}
export const emptyMuertosSettings: () => muertosSettings = () => {
   return {
      done: false,
      players: -1
   }
}