import { Language, languageEnum } from "../Language"

export enum LANG {
   ACCEPT_OR_NOT,
   CHANGE,
}

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.ACCEPT_OR_NOT: return 'Wasz duch to:'
               case LANG.CHANGE: return 'Zmień'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.ACCEPT_OR_NOT: return 'Your ghost persona is:'
               case LANG.CHANGE: return 'Change'
            }
            break
      }
   }
}