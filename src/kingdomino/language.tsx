import { Language, languageEnum } from "../Language"

export enum LANG {
   CHOOSE_PLAYERS,
   CHOOSE_GAME,
   PLAYER_ORDER,
   TILES_USED,
   NEXT_ROUND,
   SET_KING,
   SET_QUEEN,
   SET_BOTH
}

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Wybierz graczy'
               case LANG.CHOOSE_GAME: return 'Wybierz grę'
               case LANG.PLAYER_ORDER: return 'Kolejność graczy'
               case LANG.TILES_USED: return 'Użyte płytki'
               case LANG.NEXT_ROUND: return 'Następna runda'
               case LANG.SET_KING: return 'Kingdomino'
               case LANG.SET_QUEEN: return 'Queendomino'
               case LANG.SET_BOTH: return 'Obie'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Choose players'
               case LANG.CHOOSE_GAME: return 'Choose game'
               case LANG.PLAYER_ORDER: return 'Player order'
               case LANG.TILES_USED: return 'Tiles used'
               case LANG.NEXT_ROUND: return 'Next round'
               case LANG.SET_KING: return 'Kingdomino'
               case LANG.SET_QUEEN: return 'Queendomino'
               case LANG.SET_BOTH: return 'Both'
            }
            break
      }
   }
}