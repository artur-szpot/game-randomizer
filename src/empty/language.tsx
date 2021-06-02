import { Language, languageEnum } from "../Language"

export enum LANG {
   SOME_VALUE,
}

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.SOME_VALUE: return 'Coś'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.SOME_VALUE: return 'Orange'
            }
            break
      }
   }
}