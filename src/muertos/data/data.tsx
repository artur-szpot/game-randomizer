import { languageEnum } from '../../Language'
import characters from './characters.json'
import rules from './rules.json'

export interface muertosCharacter {
   id: number
   name: string
   hint?: string
}
interface muertosCharacterRaw {
   id: number
   name: { [key: string]: string }
   hint?: { [key: string]: string }
   include?: string[]
}
interface muertosRuleRaw {
   id: number
   text: { [key: string]: string }
   include?: string[]
}

export class dataHandler {
   getCharacters(language: languageEnum): muertosCharacter[] {
      let retval: muertosCharacter[] = []
      const values = characters as muertosCharacterRaw[]
      values.forEach(e => {
         if (!e.hasOwnProperty('include') || e.include!.includes(language)) {
            retval.push({
               id: e.id,
               name: (e.name.hasOwnProperty(language) ? e.name[language] : e.name.default) ?? 'NO_DEFAULT_NAME',
               hint: e.hasOwnProperty('hint') ? (e.hint!.hasOwnProperty(language) ? e.hint![language] : e.hint!.default) : undefined
            })
         }
      })
      return retval
   }
   getRules(language: languageEnum): string[] {
      let retval: string[] = []
      const values = rules as muertosRuleRaw[]
      values.forEach(e => {
         if (!e.hasOwnProperty('include') || e.include!.includes(language)) {
            retval.push((e.text.hasOwnProperty(language) ? e.text[language] : e.text.default) ?? 'NO_DEFAULT_TEXT')
         }
      })
      return retval
   }
}