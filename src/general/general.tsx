import { MouseEvent, KeyboardEvent } from 'react'

export enum ChangeWrappingOption {
   NO_CHANGE_IF_WRAP,  // [0, 1, 2, 3]: 2 + 3 => 2
   OTHER_EDGE_IF_WRAP, // [0, 1, 2, 3]: 2 + 3 => 0
   STOP_IF_WRAP,       // [0, 1, 2, 3]: 2 + 3 => 3
   CONTINUOUS_WRAP     // [0, 1, 2, 3]: 2 + 3 => 1
}

export function validateChange(current: number, change: number, min: number, max: number, wrap: ChangeWrappingOption): number {
   let retval = current + change
   const spread = max - min + 1
   switch (wrap) {
      case ChangeWrappingOption.CONTINUOUS_WRAP:
         while (retval > max) {
            retval -= spread
         }
         while (retval < min) {
            retval += spread
         }
         break
      case ChangeWrappingOption.OTHER_EDGE_IF_WRAP:
         if (retval > max) { return min }
         if (retval < min) { return max }
         break
      case ChangeWrappingOption.NO_CHANGE_IF_WRAP:
         if (retval < min || retval > max) { return current }
         break
      case ChangeWrappingOption.STOP_IF_WRAP:
         if (retval > max) { return max }
         if (retval < min) { return min }
         break
      default:
         break
   }
   return retval
}

export function arrayEquals(array1: any[], array2: any[]): boolean {
   if (array1.length !== array2.length) return false
   if (array1.length === 0) return true
   if (typeof array1[0] !== typeof array2[0]) return false
   for (let i = 0; i < array1.length; i++) {
      if (array2[i] !== array1[i]) return false
   }
   return true
}

/** Returns a random intiger from between min and max, inclusive on both ends. */
export function random(min: number, max: number): number {
   return min + Math.floor(Math.random() * (max - min + 1))
}

/** Returns a random boolean. */
export function randomBool(): boolean {
   return random(0, 1) === 0
}

/** Chooses a number of random elements from the source and returns them as a new array. */
export function randomArraySlice(source: any[], count: number = 1): any[] {
   let result: any[] = []
   let sourceCopy = [...source]
   for (let i = 0; i < count; i++) {
      if (sourceCopy.length > 0) {
         let chosen: number = random(0, sourceCopy.length - 1)
         result.push(sourceCopy[chosen])
         sourceCopy.splice(chosen, 1)
      }
   }
   return result
}
export function randomArrayElement(source: any[]): any { return randomArraySlice(source)[0] }

/** Removes a number of random elements from the source and returns them as a new array. */
export function randomArraySplice(source: any[], count: number = 1): any[] {
   let result: any[] = []
   for (let i = 0; i < count; i++) {
      if (source.length > 0) {
         let chosen: number = random(0, source.length - 1)
         result.push(source[chosen])
         source.splice(chosen, 1)
      }
   }
   return result
}

/** Randomizes the elements of an array and returns them as a new array. */
export function randomizeArray(source: any[]): any[] {
   let copy = [...source]
   return randomArraySplice(copy, copy.length)
}

// todo revive this
// export function displayPercent(value: number, inverse: boolean = true) {
//   if (isNaN(value)) { return '0%' }
//   if (inverse) { value = 1 - value }
//   return `${Math.round(value * 100)}%`
// }

export function regexExactMatch(input: string, regex: RegExp): boolean {
   const regexResult = regex.exec(input)
   return (regexResult && regexResult[0] === input) as boolean
}

/** Convert a boolean into 1 or 0 to enable the bitwise XOR operation. */
function bitwise(input: boolean): 0 | 1 {
   return input ? 1 : 0
}

/** Perform a XOR operation on two booleans. */
export function xor(value1: boolean, value2: boolean): boolean {
   return (bitwise(value1) ^ bitwise(value2)) === 1
}

/** Typecheck a variable for being undefined. */
export function isUndefined(input: any): boolean {
   return typeof input === 'undefined'
}

/** Enable a switch statement for shift/ctrl modifiers. */
export enum eventMod { NONE, CTRL, SHIFT, CTRL_SHIFT }
export function eventCtrlShift(event: MouseEvent | KeyboardEvent): eventMod {
   if (event.ctrlKey && event.shiftKey) { return eventMod.CTRL_SHIFT }
   if (event.ctrlKey) { return eventMod.CTRL }
   if (event.shiftKey) { return eventMod.SHIFT }
   return eventMod.NONE
}