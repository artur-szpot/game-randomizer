import { gameLanguages } from "../game/languages"

export interface istanbulLanguage {
   CHOOSE_PRESET: string,
   presets: {
      VANILLA: string,
      COFFEE: string,
      LETTERS: string,
      GREAT_BAZAAR: string
   },
   FIRST_PLAYER: string,
   neutrals: {
      MAYOR: string,
      SMUGGLER: string,
      COFFEE_TRADER: string,
      COURIER: string
   }
}

export function getLanguage(language: gameLanguages): istanbulLanguage {
   switch (language) {
      case gameLanguages.POLSKI:
         return {
            CHOOSE_PRESET: 'Wybierz rodzaj gry',
            presets: {
               VANILLA: 'podstawowa',
               COFFEE: 'z kawą',
               LETTERS: 'z listami',
               GREAT_BAZAAR: 'Wielki Bazar'
            },
            FIRST_PLAYER: 'Pierwszy gracz',
            neutrals: {
               MAYOR: 'Burmistrz',
               SMUGGLER: 'Szmugler',
               COFFEE_TRADER: 'Handlarz kawą',
               COURIER: 'Kurier'
            }
         }
      case gameLanguages.ENGLISH:
      case gameLanguages.DEUTSCH:
         break
   }
   return {
      CHOOSE_PRESET: 'Choose game preset',
      presets: {
         VANILLA: 'base game only',
         COFFEE: 'with coffee',
         LETTERS: 'with letters',
         GREAT_BAZAAR: 'the Great Bazaar'
      },
      FIRST_PLAYER: 'First player',
      neutrals: {
         MAYOR: 'Mayor',
         SMUGGLER: 'Smuggler',
         COFFEE_TRADER: 'Coffee trader',
         COURIER: 'Courier'
      }
   }
}