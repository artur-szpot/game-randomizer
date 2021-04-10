export interface muertosMemory {
   currentCharacter: number
   rejectedCharacters: number[]
   chosenCharacters: number[]
   chosenRules: { [key: number]: string }
}
export const emptyMuertosMemory: () => muertosMemory = () => {
   return {
      currentCharacter: -1,
      rejectedCharacters: [],
      chosenCharacters: [],
      chosenRules: {}
   }
}