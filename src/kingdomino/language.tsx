import { gameLanguages } from "../game/languages"

export interface kingdominoLanguage {
   CHOOSE_PLAYERS: string,
   CHOOSE_GAME: string,
   PLAYER_ORDER: string,
   TILES_USED: string,
   NEXT_ROUND: string,
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
            PLAYER_ORDER: 'Kolejność graczy',
            TILES_USED: 'Użyte płytki',
            NEXT_ROUND: 'Następna runda',
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
      PLAYER_ORDER: 'Player order',
      TILES_USED: 'Tiles used',
      NEXT_ROUND: 'Next round',
      sets: {
         KING: 'Kingdomino',
         QUEEN: 'Queendomino',
         BOTH: 'Both'
      }
   }
}