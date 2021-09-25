import { Language, languageEnum } from "../Language"

export enum LANG {
   GAMES,
   NEXT,
   TAG_CARDS,
   TAG_WORDS,
   TAG_DICE,
   TAG_BOARD,
   TAG_LOGIC,
   TAG_BLUFF,
   TAG_ROLL_AND_WRITE,
   TAG_DRAWING,
   TAG_COOP,
   SETTINGS_INCLUDE_TAGS,
   SETTINGS_EXCLUDE_TAGS,
   SETTINGS_CHOOSE_TOTAL,
   SETTINGS_BACK,
   SETTINGS_OK,
}

export const allTags = [
   LANG.TAG_CARDS,
   LANG.TAG_WORDS,
   LANG.TAG_DICE,
   LANG.TAG_BOARD,
   LANG.TAG_LOGIC,
   LANG.TAG_BLUFF,
   LANG.TAG_ROLL_AND_WRITE,
   LANG.TAG_DRAWING,
   LANG.TAG_COOP,
]

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.GAMES: return 'Proponowane gry'
               case LANG.NEXT: return 'Losuj ponownie'
               case LANG.TAG_CARDS: return 'karty'
               case LANG.TAG_WORDS: return 'słowa'
               case LANG.TAG_DICE: return 'kości'
               case LANG.TAG_BOARD: return 'plansza'
               case LANG.TAG_LOGIC: return 'logika'
               case LANG.TAG_BLUFF: return 'blefowanie'
               case LANG.TAG_ROLL_AND_WRITE: return 'losuj i rysuj'
               case LANG.TAG_DRAWING: return 'rysowanie'
               case LANG.TAG_COOP: return 'kooperacja'
               case LANG.SETTINGS_INCLUDE_TAGS: return 'wybierz tagi'
               case LANG.SETTINGS_EXCLUDE_TAGS: return 'odrzuć tagi'
               case LANG.SETTINGS_CHOOSE_TOTAL: return 'liczba propozycji'
               case LANG.SETTINGS_BACK: return 'OK'
               case LANG.SETTINGS_OK: return 'OK'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.GAMES: return 'Proposed games'
               case LANG.NEXT: return 'Choose again'
               case LANG.TAG_CARDS: return 'cards'
               case LANG.TAG_WORDS: return 'words'
               case LANG.TAG_DICE: return 'dice'
               case LANG.TAG_BOARD: return 'board'
               case LANG.TAG_LOGIC: return 'logic'
               case LANG.TAG_BLUFF: return 'bluffing'
               case LANG.TAG_ROLL_AND_WRITE: return 'roll-and-write'
               case LANG.TAG_DRAWING: return 'drawing'
               case LANG.TAG_COOP: return 'cooperation'
               case LANG.SETTINGS_INCLUDE_TAGS: return 'include tags'
               case LANG.SETTINGS_EXCLUDE_TAGS: return 'exclude tags'
               case LANG.SETTINGS_CHOOSE_TOTAL: return 'total propositions'
               case LANG.SETTINGS_BACK: return 'OK'
               case LANG.SETTINGS_OK: return 'OK'
            }
            break
      }
   }
}