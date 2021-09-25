import { languageEnum } from '../../Language'
import { LANG } from '../language'
import games from './games.json'

export interface game {
   id: number
   name: string
   min: number
   max: number
   exclude?: string[]
   impossible?: number[]
   tags: LANG[]
}
interface gameRaw {
   id: number
   name: { [key: string]: string }
   min: number
   max: number
   exclude?: string[]
   impossible?: number[]
   tags?: string[]
}

export class dataHandler {
   getGames(language: languageEnum): game[] {
      let retval: game[] = []
      const values = games as gameRaw[]
      values.forEach(e => {
         retval.push({
            id: e.id,
            name: (e.name.hasOwnProperty(language) ? e.name[language] : e.name.default) ?? 'NO_DEFAULT_NAME',
            min: e.min,
            max: e.max,
            impossible: e.impossible,
            exclude: e.exclude,
            tags: (e.tags ?? []).map(e => this.getTag(e))
         })
      })
      return retval
   }

   getTag(tag: string): LANG {
      switch (tag) {
         case 'cards': return LANG.TAG_CARDS
         case 'words': return LANG.TAG_WORDS
         case 'dice': return LANG.TAG_DICE
         case 'board': return LANG.TAG_BOARD
         case 'logic': return LANG.TAG_LOGIC
         case 'bluff': return LANG.TAG_BLUFF
         case 'roll-and-write': return LANG.TAG_ROLL_AND_WRITE
         case 'drawing': return LANG.TAG_DRAWING
         case 'coop': return LANG.TAG_COOP
         default:
            alert(`Unknown tag: ${tag}`)
            return LANG.TAG_BLUFF
      }
   }
}