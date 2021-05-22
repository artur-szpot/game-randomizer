import { Language, languageEnum } from "../Language"

export enum LANG {
   CHOOSE_EXTENSIONS,
   SKILLS,
   OK,
   BOARD_SIDE,
   DECREES,

}

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.CHOOSE_EXTENSIONS: return 'Wybierz dodatki:'
               case LANG.SKILLS: return 'Umiejętności'
               case LANG.BOARD_SIDE: return 'Mapa'
               case LANG.DECREES: return 'Dekrety'
               case LANG.OK: return 'OK'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.CHOOSE_EXTENSIONS: return 'Choose extensions:'
               case LANG.SKILLS: return 'Skills'
               case LANG.BOARD_SIDE: return 'Board side'
               case LANG.DECREES: return 'Decrees'
               case LANG.OK: return 'OK'
            }
            break
      }
   }
}