export enum GAME {
   FIRST='first',
   MUERTOS = 'muertos',
   CODENAMES = 'codenames',
   ISTANBUL = 'istanbul',
   KINGDOMINO = 'kingdomino',
   CARTOGRAPHERS='cartographers',
}
export const allGames = [
   GAME.FIRST,
   GAME.MUERTOS,
   GAME.CODENAMES,
   GAME.ISTANBUL,
   GAME.KINGDOMINO,
   GAME.CARTOGRAPHERS,
]

export enum languageEnum { ENGLISH = 'english', POLSKI = 'polski' }

export enum baseLanguage {
   MISSING,
   OK,
   TOO_FEW_PLAYERS,
   TOO_MANY_PLAYERS,
   CHOOSE_PLAYERS,
   CHOOSE_TEAM,
}
export class Language {
   language: languageEnum = languageEnum.POLSKI

   get(value: any): string {
      return this.getValue(value) ?? `"${value}" ${this.getBaseValue(baseLanguage.MISSING)}!`
   }

   getValue(value: any): string | undefined {
      return value
   }

   getBase(value: any): string {
      return this.getBaseValue(value) ?? `"${value}" ${this.getBaseValue(baseLanguage.MISSING)}!`
   }

   getBaseValue(value: baseLanguage): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value as baseLanguage) {
               case baseLanguage.MISSING: return 'nie przetłumaczono'
               case baseLanguage.OK: return 'OK'
               case baseLanguage.TOO_FEW_PLAYERS: return 'Minimum graczy: '
               case baseLanguage.TOO_MANY_PLAYERS: return 'Maksimum graczy: '
               case baseLanguage.CHOOSE_PLAYERS: return 'Wybierz graczy:'
               case baseLanguage.CHOOSE_TEAM: return 'Wybierz grupę graczy:'
            }
            break
         case languageEnum.ENGLISH:
            switch (value as baseLanguage) {
               case baseLanguage.MISSING: return 'missing'
               case baseLanguage.OK: return 'OK'
               case baseLanguage.TOO_FEW_PLAYERS: return 'Minimum players: '
               case baseLanguage.TOO_MANY_PLAYERS: return 'Maximum players: '
               case baseLanguage.CHOOSE_PLAYERS: return 'Choose players:'
               case baseLanguage.CHOOSE_TEAM: return 'Choose a group of players:'
            }
            break
      }
   }

   getGame(value: GAME): string {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case GAME.FIRST: return 'Pierwszy gracz'
               case GAME.MUERTOS: return 'Fiesta de los Muertos'
               case GAME.CODENAMES: return 'Tajniacy'
               case GAME.ISTANBUL: return 'Istanbul'
               case GAME.KINGDOMINO: return 'Kingdomino'
               case GAME.CARTOGRAPHERS: return 'Kartografowie'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case GAME.FIRST: return 'First player'
               case GAME.MUERTOS: return 'Fiesta de los Muertos'
               case GAME.CODENAMES: return 'Codenames'
               case GAME.ISTANBUL: return 'Istanbul'
               case GAME.KINGDOMINO: return 'Kingdomino'
               case GAME.CARTOGRAPHERS: return 'Cartographers'
            }
            break
      }
      return value
   }
}