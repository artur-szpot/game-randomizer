export interface kingdominoMemory {
   kingTiles: number[]
   queenTiles: number[]
   currentRound: number
}
export const emptyKingdominoMemory: () => kingdominoMemory = () => {
   return {
      kingTiles: [],
      queenTiles: [],
      currentRound: 0
   }
}