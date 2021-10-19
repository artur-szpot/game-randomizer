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
}

export class GameLanguage extends Language {
   getValue(value: LANG, index?: number): string | undefined {
      switch (value) {
         case LANG.SEASON: return this.getSeason(index!)
         case LANG.CARD: return this.getCard(index!)
         case LANG.TERRAIN: return this.getTerrain(index!)
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
      return `[${this.getTerrainColor(index)}] ${this.getTerrainName(index)}`
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
         case 0: return 'green'
         case 1: return 'red'
         case 2: return 'blue'
         case 3: return 'yellow'
         case 4: return 'magenta'
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
               case 0: return 'Zapomniany las'
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