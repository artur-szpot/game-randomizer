import { Language, languageEnum } from "../Language"

export enum LANG {
   RANDOM_MAP,
   RANDOM_QUESTS,
   ADDITIONAL_CAMPS,
   ADDED_CAMPS,
   RANDOM_CHARACTERS,
   RANDOM_CITY,
   MAP,
   PLAYER_NUMBER,
   OPTIONS,
   LONGER_VARIANT,
   PRIORITIZE_NAMED,
   CHOSEN_QUESTS,
   CHOSEN_CHARACTERS,
   CITY_SETUP,
   AMBER_MINES_YES,
   AMBER_MINES_NO,
   DAY,
   NIGHT,
   CHOSEN_BOSSES,
   OK,
   BACK_TO_MAIN,
   CHOSEN_MAP,
}

export class GameLanguage extends Language {
   getValue(value: LANG, index?: number): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.BACK_TO_MAIN: return 'Powrót do menu'
               case LANG.RANDOM_MAP: return 'Losowa mapa'
               case LANG.RANDOM_QUESTS: return 'Losowe questy'
               case LANG.ADDITIONAL_CAMPS: return 'Dodatkowe obozy'
               case LANG.ADDED_CAMPS: return `Dodatkowe obozy: ${index}`
               case LANG.RANDOM_CHARACTERS: return 'Losowe postaci'
               case LANG.RANDOM_CITY: return 'Ustawienia miasta'
               case LANG.MAP: return this.mapName(index ?? 0)
               case LANG.PLAYER_NUMBER: return 'Liczba graczy'
               case LANG.OPTIONS: return 'Opcje'
               case LANG.LONGER_VARIANT: return 'Dłuższa gra'
               case LANG.PRIORITIZE_NAMED: return 'Najpierw nazwane'
               case LANG.CHOSEN_QUESTS: return 'Wybrane questy'
               case LANG.CHOSEN_CHARACTERS: return 'Wybrane postaci'
               case LANG.CITY_SETUP: return 'Ustawienia miasta'
               case LANG.AMBER_MINES_YES: return 'Amber Mines: tak'
               case LANG.AMBER_MINES_NO: return 'Amber Mines: nie'
               case LANG.DAY: return 'Brzask'
               case LANG.NIGHT: return 'Zmierzch'
               case LANG.CHOSEN_BOSSES: return 'Wybrani bossowie'
               case LANG.OK: return 'OK'
               case LANG.CHOSEN_MAP: return 'Wybrana mapa'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.BACK_TO_MAIN: return 'Back to menu'
               case LANG.RANDOM_MAP: return 'Random map'
               case LANG.RANDOM_QUESTS: return 'Random quests'
               case LANG.ADDITIONAL_CAMPS: return 'Additional camps'
               case LANG.ADDED_CAMPS: return `Additional camps: ${index}`
               case LANG.RANDOM_CHARACTERS: return 'Random characters'
               case LANG.RANDOM_CITY: return 'City setup'
               case LANG.MAP: return this.mapName(index ?? 0)
               case LANG.PLAYER_NUMBER: return 'Total players'
               case LANG.OPTIONS: return 'Options'
               case LANG.LONGER_VARIANT: return 'Longer game'
               case LANG.PRIORITIZE_NAMED: return 'Prioritize named'
               case LANG.CHOSEN_QUESTS: return 'Chosen quests'
               case LANG.CHOSEN_CHARACTERS: return 'Chosen characters'
               case LANG.CITY_SETUP: return 'City setup'
               case LANG.AMBER_MINES_YES: return 'Use Amber Mines'
               case LANG.AMBER_MINES_NO: return "Don't use Amber Mines"
               case LANG.DAY: return 'Day'
               case LANG.NIGHT: return 'Night'
               case LANG.CHOSEN_BOSSES: return 'Chosen bosses'
               case LANG.OK: return 'OK'
               case LANG.CHOSEN_MAP: return 'Chosen map'
            }
            break
      }
   }

   mapName(index:number):string{
      switch (index) {
         case 0:
            return '1: Glogo Caverns'
         case 1:
            return '2: Broken Plains'
         case 2:
            return '3: Crimson Forest'
         case 3:
            return '4: Meteor Mountain'
         case 4:
            return '5: Toxic Desert'
         case 5:
            return '6: Cloudy Valley'
         case 6:
            return '7: Dried Sea'
         case 7:
            return '8: Fire Delta'
         case 8:
            return '9: Rocktooth Isles'
         case 9:
            return '10: Mammoth Jungle'
         case 10:
            return '11: The Last Ruin'
         default:
            return ''
      }
   }
}