export interface istanbulMemory {
   chosenLocations: number[][],
   neutrals: {
      mayor: number,
      smuggler: number,
      coffeeTrader: number,
      courier: number
   },
   firstPlayer: string
}
export const emptyIstanbulMemory: () => istanbulMemory = () => {
   return {
      chosenLocations: [],
      neutrals: {
         mayor: -1,
         smuggler: -1,
         coffeeTrader: -1,
         courier: -1
      },
      firstPlayer: ''
   }
}