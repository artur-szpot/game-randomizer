import { languageEnum } from '../../Language'
import decrees from './decrees.json'
import skills from './skills.json'
import cards from './cards.json'

interface cartographersDecreeRaw {
   id: number
   name: { [key: string]: string }
}

interface cartographersSkillRaw {
   id: number
   name: { [key: string]: string }
}

interface cartographersShape {
   fields: number[][]
   coin: boolean
}

export interface cartographersCard {
   shapes: cartographersShape[]
   types: number[]
   id: number
   time: number
}

export class dataHandler {
   getDecrees(language: languageEnum): string[] {
      let retval: string[] = []
      const values = decrees as cartographersDecreeRaw[]
      values.forEach(e => {
         retval.push((e.name.hasOwnProperty(language) ? e.name[language] : e.name.default) ?? 'NO_DEFAULT_NAME')
      })
      return retval
   }
   getSkills(language: languageEnum): string[] {
      let retval: string[] = []
      const values = skills as cartographersSkillRaw[]
      values.forEach(e => {
         retval.push((e.name.hasOwnProperty(language) ? e.name[language] : e.name.default) ?? 'NO_DEFAULT_NAME')
      })
      return retval
   }
   getCards(): { [key: number]: cartographersCard } {
      let retval: { [key: number]: cartographersCard } = {}
      const cardsRaw = cards as cartographersCard[]
      cardsRaw.forEach(e => retval[e.id] = e)
      return retval
   }
}