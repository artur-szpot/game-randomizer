export interface gameSettings {
   done: boolean
}
export const emptyGameSettings:()=>gameSettings=()=>{return{
   done: false
}}