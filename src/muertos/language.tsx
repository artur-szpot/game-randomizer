import { Language, languageEnum } from "../Language"

export enum LANG {
   CHOOSE_RULES_NUMBER,
   PASS_DEVICE,
   ACCEPT_OR_NOT,
   RULES_LIST_HEADER,
   CHARACTER_LIST_HEADER,
   NO_RULE,
   OK,
   PLAYERS,
   ACCEPT,
   REJECT,
   SHOW_CHARACTERS,
}

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.CHOOSE_RULES_NUMBER: return 'Ile zasad wybrać?'
               case LANG.PASS_DEVICE: return 'Podaj urządzenie następnemu graczowi'
               case LANG.ACCEPT_OR_NOT: return 'Twoja postać:'
               case LANG.RULES_LIST_HEADER: return 'Obowiązujące zasady:'
               case LANG.CHARACTER_LIST_HEADER: return 'Pula postaci:'
               case LANG.NO_RULE: return 'brak zasady'
               case LANG.OK: return 'OK'
               case LANG.PLAYERS: return 'graczy'
               case LANG.ACCEPT: return 'OK'
               case LANG.REJECT: return 'Zmień'
               case LANG.SHOW_CHARACTERS: return 'Pokaż postaci'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.CHOOSE_RULES_NUMBER: return 'How many rules should be used?'
               case LANG.PASS_DEVICE: return 'Pass the device to next player'
               case LANG.ACCEPT_OR_NOT: return 'Your character:'
               case LANG.RULES_LIST_HEADER: return 'The rules:'
               case LANG.CHARACTER_LIST_HEADER: return 'The possible characters:'
               case LANG.NO_RULE: return 'no rule'
               case LANG.OK: return 'OK'
               case LANG.PLAYERS: return 'players'
               case LANG.ACCEPT: return 'OK'
               case LANG.REJECT: return 'Change'
               case LANG.SHOW_CHARACTERS: return 'Show characters'
            }
            break
      }
   }
}