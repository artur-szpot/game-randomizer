import { CartographersHandler } from "./cartographers/handler"
import { CodenamesHandler } from "./codenames/handler"
import { FirstHandler } from "./first/handler"
import { GameHandler } from "./GameHandler"
import { IstanbulHandler } from "./istanbul/handler"
import { KingdominoHandler } from "./kingdomino/handler"
import { GAME } from "./Language"
import { MuertosHandler } from "./muertos/handler"

export function getGameHandler(value: GAME): GameHandler {
   switch (value) {
      case GAME.FIRST:
         return new FirstHandler()
      case GAME.MUERTOS:
         return new MuertosHandler()
      case GAME.CODENAMES:
         return new CodenamesHandler()
      case GAME.ISTANBUL:
         return new IstanbulHandler()
      case GAME.KINGDOMINO:
         return new KingdominoHandler()
      case GAME.CARTOGRAPHERS:
         return new CartographersHandler()
   }
}