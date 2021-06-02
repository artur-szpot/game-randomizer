import { Language, languageEnum } from "../Language"

export enum LANG {
   CHOOSE_PLAYERS,
   FIRST_PLAYER,
}

export class GameLanguage extends Language {
   getValue(value: LANG) {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Wybierz graczy'
               case LANG.FIRST_PLAYER: return 'Pierwszy gracz:'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Choose players'
               case LANG.FIRST_PLAYER: return 'First player:'
            }
            break
      }
   }
}