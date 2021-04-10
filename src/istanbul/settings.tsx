import { gameSettings } from "../game/settings"

export enum istanbulPresets { NONE, VANILLA, COFFEE, LETTERS, GREAT_BAZAAR }
export interface istanbulSettings extends gameSettings {
   preset: istanbulPresets
}
export const emptyIstanbulSettings: () => istanbulSettings = () => {
   return {
      done: false,
      preset: istanbulPresets.NONE
   }
}