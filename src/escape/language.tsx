import { Language, languageEnum } from "../Language"

export enum LANG {
   ROOMS,
   DICE,
   ROOM_1,
   ROOM_2,
   ROOM_3,
   ROOM_4,
   ROOM_5,
   ROOM_6,
   ROOM_7,
   ROOM_8,
   ROOM_9,
   NEXT,
}

export class GameLanguage extends Language {
   getValue(value: LANG): string | undefined {
      switch (this.language) {
         case languageEnum.POLSKI:
            switch (value) {
               case LANG.ROOMS: return 'Pokoje'
               case LANG.DICE: return 'Kości'
               case LANG.ROOM_1: return 'Biblioteka'
               case LANG.ROOM_2: return 'Pralnia'
               case LANG.ROOM_3: return 'Stołówka'
               case LANG.ROOM_4: return 'Magazyn'
               case LANG.ROOM_5: return 'Spacerniak'
               case LANG.ROOM_6: return 'Prysznice'
               case LANG.ROOM_7: return 'Szpital'
               case LANG.ROOM_8: return 'Warsztat'
               case LANG.ROOM_9: return 'Pokój wizyt'
               case LANG.NEXT: return 'Następna runda'
            }
            break
         case languageEnum.ENGLISH:
            switch (value) {
               case LANG.ROOMS: return 'Rooms'
               case LANG.DICE: return 'Dice'
               case LANG.ROOM_1: return 'Library'
               case LANG.ROOM_2: return 'Laundry room'
               case LANG.ROOM_3: return 'Mess hall'
               case LANG.ROOM_4: return 'Warehouse'
               case LANG.ROOM_5: return 'Yard'
               case LANG.ROOM_6: return 'Showers'
               case LANG.ROOM_7: return 'Hospital'
               case LANG.ROOM_8: return 'Workshop'
               case LANG.ROOM_9: return "Visitors' room"
               case LANG.NEXT: return 'Next round'
            }
            break
      }
   }
}