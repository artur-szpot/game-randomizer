import { Language, languageEnum } from "../Language"

export enum LANG {
   CHOOSE_PLAYERS,
   CHOOSE_PRESET,
   PRESET_VANILLA,
   PRESET_COFFEE,
   PRESET_LETTERS,
   PRESET_GREAT_BAZAAR,
   FIRST_PLAYER,
   NEUTRAL_MAYOR,
   NEUTRAL_SMUGGLER,
   NEUTRAL_COFFEE_TRADER,
   NEUTRAL_COURIER,
}

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Wybierz graczy'
               case LANG.CHOOSE_PRESET: return 'Wybierz rodzaj gry'
               case LANG.PRESET_VANILLA: return 'podstawowa'
               case LANG.PRESET_COFFEE: return 'z kawą'
               case LANG.PRESET_LETTERS: return 'z listami'
               case LANG.PRESET_GREAT_BAZAAR: return 'Wielki Bazar'
               case LANG.FIRST_PLAYER: return 'Pierwszy gracz'
               case LANG.NEUTRAL_MAYOR: return 'Burmistrz'
               case LANG.NEUTRAL_SMUGGLER: return 'Szmugler'
               case LANG.NEUTRAL_COFFEE_TRADER: return 'Handlarz kawą'
               case LANG.NEUTRAL_COURIER: return 'Kurier'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Choose players'
               case LANG.CHOOSE_PRESET: return 'Choose game preset'
               case LANG.PRESET_VANILLA: return 'base game only'
               case LANG.PRESET_COFFEE: return 'with coffee'
               case LANG.PRESET_LETTERS: return 'with letters'
               case LANG.PRESET_GREAT_BAZAAR: return 'the Great Bazaar'
               case LANG.FIRST_PLAYER: return 'First player'
               case LANG.NEUTRAL_MAYOR: return 'Mayor'
               case LANG.NEUTRAL_SMUGGLER: return 'Smuggler'
               case LANG.NEUTRAL_COFFEE_TRADER: return 'Coffee trader'
               case LANG.NEUTRAL_COURIER: return 'Courier'
            }
            break
      }
   }
}