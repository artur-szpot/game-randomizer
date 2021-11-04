import { Language, languageEnum } from "../Language"

export enum LANG {
   CHOOSE_EXTENSIONS,
   SKILLS,
   OK,
   BOARD_SIDE,
   DECREES,
   SEASON,
   CARD,
   NEXT,
   START,
   TERRAIN,
   TERRAIN_NAME,
   GAME_OVER,
}

export class GameLanguage extends Language {
   getValue(value: LANG, index?: number): string | undefined {
      switch (value) {
         case LANG.SEASON: return this.getSeason(index!)
         case LANG.CARD: return this.getCard(index!)
         case LANG.TERRAIN: return this.getTerrain(index!)
         case LANG.TERRAIN_NAME: return this.getTerrainName(index!)
      }
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.CHOOSE_EXTENSIONS: return 'Wybierz dodatki:'
               case LANG.SKILLS: return 'Umiejętności'
               case LANG.BOARD_SIDE: return 'Mapa'
               case LANG.DECREES: return 'Dekrety'
               case LANG.OK: return 'OK'
               case LANG.NEXT: return 'Dalej'
               case LANG.START: return 'Start'
               case LANG.GAME_OVER: return 'Koniec gry'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.CHOOSE_EXTENSIONS: return 'Choose extensions:'
               case LANG.SKILLS: return 'Skills'
               case LANG.BOARD_SIDE: return 'Board side'
               case LANG.DECREES: return 'Decrees'
               case LANG.OK: return 'OK'
               case LANG.NEXT: return 'Next'
               case LANG.START: return 'Begin'
               case LANG.GAME_OVER: return 'Game over'
            }
            break
      }
   }

   getSeason(index: number) {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (index) {
               case 0: return 'Wiosna'
               case 1: return 'Lato'
               case 2: return 'Jesień'
               case 3: return 'Zima'
            }
            break
         case languageEnum.ENGLISH:
            switch (index) {
               case 0: return 'Spring'
               case 1: return 'Summer'
               case 2: return 'Autumn'
               case 3: return 'Winter'
            }
            break
      }
   }

   getTerrain(index: number) {
      return `[${this.getTerrainColor(index)}]`
      // return `[${this.getTerrainColor(index)}] ${this.getTerrainName(index)}`
   }

   getTerrainName(index: number) {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (index) {
               case 0: return 'Las'
               case 1: return 'Wioska'
               case 2: return 'Rzeka'
               case 3: return 'Pola'
               case 4: return 'Potwór'
            }
            break
         case languageEnum.ENGLISH:
            switch (index) {
               case 0: return 'Forest'
               case 1: return 'Village'
               case 2: return 'River'
               case 3: return 'Fields'
               case 4: return 'Monster'
            }
            break
      }
   }

   getTerrainColor(index: number) {
      switch (index) {
         case 0: return '#2fb42f'
         case 1: return '#e23c3c'
         case 2: return '#445ce4'
         case 3: return '#d4b83b'
         case 4: return '#8b338b'
      }
   }

   getCard(index: number) {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (index) {
               case -1: return 'Podlicz karty A i B'
               case -2: return 'Podlicz karty B i C'
               case -3: return 'Podlicz karty C i D'
               case -4: return 'Podlicz karty D i A'
               case -5: return 'Koniec gry'
               case 0: return 'Gospodarstwo'
               case 1: return 'Wielka rzeka'
               case 2: return 'Wiejski strumień'
               case 3: return 'Pole uprawne'
               case 4: return 'Sad'
               case 5: return 'Zapomniany las'
               case 6: return 'Mokradła'
               case 7: return 'Szczeliny'
               case 8: return 'Wioska rybacka'
               case 9: return 'Nadrzewna osada'
               case 10: return 'Miasto'
               case 11: return 'Ruiny twierdzy'
               case 12: return 'Ruiny świątyni'
            }
            break
         case languageEnum.ENGLISH:
            switch (index) {
               case -1: return 'Count cards A and B'
               case -2: return 'Count cards B and C'
               case -3: return 'Count cards C and D'
               case -4: return 'Count cards D and A'
               case -5: return 'Game over'
               case 0: return 'Forgotten forest'
            }
            break
      }
   }
}