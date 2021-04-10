import { gameLanguages } from "../game/languages"

export interface codenamesLanguage {
   BLUE_LEADER: string,
   RED_LEADER: string,
   BLUE_TEAM: string,
   RED_TEAM: string
}

export function getLanguage(language: gameLanguages): codenamesLanguage {
   switch (language) {
      case gameLanguages.POLSKI:
         return {
            BLUE_LEADER: 'Niebieski mistrz',
            RED_LEADER: 'Czerwony mistrz',
            BLUE_TEAM: 'Drużyna niebieskich',
            RED_TEAM: 'Drużyna czerwonych'
         }
      case gameLanguages.ENGLISH:
      case gameLanguages.DEUTSCH:
         break
   }
   return {
      BLUE_LEADER: 'Blue leader',
      RED_LEADER: 'Red leader',
      BLUE_TEAM: 'Blue team',
      RED_TEAM: 'Red team'
   }
}