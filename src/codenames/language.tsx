import { Language, languageEnum } from "../Language"

export enum LANG {
   CHOOSE_PLAYERS,
   BLUE_LEADER,
   RED_LEADER,
   BLUE_TEAM,
   RED_TEAM,
}

export class GameLanguage extends Language {
   getValue(value: LANG) {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Wybierz graczy'
               case LANG.BLUE_LEADER: return 'Niebieski mistrz'
               case LANG.RED_LEADER: return 'Czerwony mistrz'
               case LANG.BLUE_TEAM: return 'Drużyna niebieskich'
               case LANG.RED_TEAM: return 'Drużyna czerwonych'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.CHOOSE_PLAYERS: return 'Choose players'
               case LANG.BLUE_LEADER: return 'Blue leader'
               case LANG.RED_LEADER: return 'Red leader'
               case LANG.BLUE_TEAM: return 'Blue team'
               case LANG.RED_TEAM: return 'Red team'
            }
            break
      }
   }
}