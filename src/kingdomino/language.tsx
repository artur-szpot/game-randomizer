import { gameLanguages } from "../game/languages"

export interface kingdominoLanguage {
   CHOOSE_PLAYERS: string,
   CHOOSE_GAME: string,
   sets: {
      KING: string,
      QUEEN: string,
      BOTH: string
   }
}

export function getLanguage(language: gameLanguages): kingdominoLanguage {
   switch (language) {
      case gameLanguages.POLSKI:
         return {
            CHOOSE_PLAYERS: 'Wybierz graczy',
            CHOOSE_GAME: 'Wybierz grę',
            sets: {
               KING: 'Kingdomino',
               QUEEN: 'Queendomino',
               BOTH: 'Obie'
            }
         }
      case gameLanguages.ENGLISH:
      case gameLanguages.DEUTSCH:
         break
   }
   return {
      CHOOSE_PLAYERS: 'Choose players',
      CHOOSE_GAME: 'Choose game',
      sets: {
         KING: 'Kingdomino',
         QUEEN: 'Queendomino',
         BOTH: 'Both'
      }
   }
}