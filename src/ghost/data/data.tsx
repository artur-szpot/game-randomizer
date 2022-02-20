import { languageEnum } from '../../Language'
import things from './things.json'

export interface ghostThing {
   id: number
   name: string
}
interface ghostThingRaw {
   id: number
   name: { [key: string]: string }
   include?: string[]
}

export class dataHandler {
   getThings(language: languageEnum): ghostThing[] {
      let retval: ghostThing[] = []
      const values = things as ghostThingRaw[]
      values.forEach(e => {
         if (!e.hasOwnProperty('include') || e.include!.includes(language)) {
            retval.push({
               id: e.id,
               name: (e.name.hasOwnProperty(language) ? e.name[language] : e.name.default) ?? 'NO_DEFAULT_NAME'
            })
         }
      })
      return retval
   }
}