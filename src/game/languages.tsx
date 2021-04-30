export enum gameLanguages { DEFAULT = 'default', POLSKI = 'polski', DEUTSCH = 'deutsch', ENGLISH = 'english' }

export interface gamesLanguage {
   MUERTOS: string,
   CODENAMES: string,
   ISTANBUL: string,
   KINGDOMINO: string,
}

export function getLanguage(language: gameLanguages): gamesLanguage {
   switch (language) {
      case gameLanguages.POLSKI:
         return {
            MUERTOS: 'Fiesta los Muertos',
            CODENAMES: 'Tajniacy',
            ISTANBUL: 'Istambuł',
            KINGDOMINO: 'Kingdomino',
         }
      case gameLanguages.ENGLISH:
      case gameLanguages.DEUTSCH:
         break
   }
   return {
      MUERTOS: 'Fiesta los Muertos',
      CODENAMES: 'Codenames',
      ISTANBUL: 'Istanbul',
      KINGDOMINO: 'Kingdomino',
   }
}