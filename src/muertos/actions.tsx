export enum MuertosActions {
   SET_PLAYERS,   // START => choose number of players
   SET_RULES,     // set the number of rules to use
   PASS,          // pass the device to next player
   ACCEPT,        // user can accept the character or not
   BEGIN,         // everybody accepted, show the rules
   END,           // show all choices
}