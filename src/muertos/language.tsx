import { gameLanguages } from "../game/languages"

export interface muertosLanguage {
   info: {
      CHOOSE_RULES_NUMBER: string,
      PASS_DEVICE: string,
      ACCEPT_OR_NOT: string,
      RULES_LIST_HEADER: string,
      CHARACTER_LIST_HEADER: string,
      NO_RULE: string
   },
   options: {
      OK: string,
      PLAYERS: string,
      ACCEPT: string,
      REJECT: string,
      SHOW_CHARACTERS: string,
   }
}

export function getLanguage(language: gameLanguages): muertosLanguage {
   switch (language) {
      case gameLanguages.POLSKI:
         return {
            info: {
               CHOOSE_RULES_NUMBER: 'Ile zasad wybrać?',
               PASS_DEVICE: 'Podaj urządzenie następnemu graczowi',
               ACCEPT_OR_NOT: 'Twoja postać:',
               RULES_LIST_HEADER: 'Obowiązujące zasady:',
               CHARACTER_LIST_HEADER: 'Pula postaci:',
               NO_RULE: 'brak zasady'
            },
            options: {
               OK: 'OK',
               PLAYERS: 'graczy', // as in "choose X players who will play"
               ACCEPT: 'OK',
               REJECT: 'Zmień',
               SHOW_CHARACTERS: 'Pokaż postaci'
            }
         }
      case gameLanguages.ENGLISH:
      case gameLanguages.DEUTSCH:
         break
   }
   return {
      info: {
         CHOOSE_RULES_NUMBER: 'How many rules should be used?',
         PASS_DEVICE: 'Pass the device to next player',
         ACCEPT_OR_NOT: 'Your character:',
         RULES_LIST_HEADER: 'The rules:',
         CHARACTER_LIST_HEADER: 'The possible characters:',
         NO_RULE: 'no rule'
      },
      options: {
         OK: 'OK',
         PLAYERS: 'players', // as in "choose X players who will play"
         ACCEPT: 'OK',
         REJECT: 'Change',
         SHOW_CHARACTERS: 'Show characters'
      }
   }
}