export interface kingdominoMemory {
   kingTilesUsed: number[]
   queenTilesUsed: number[]
   currentTiles: number[]
   currentSetKing: boolean
}
export const emptyKingdominoMemory: () => kingdominoMemory = () => {
   return {
      kingTilesUsed: [],
      queenTilesUsed: [],
      currentTiles: [],
      currentSetKing: true
   }
}