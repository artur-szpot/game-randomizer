import React from 'react'
import { Game, GameProps } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface CartographersResults {
   side: number
   decrees: number[]
   skills: number[]
}

class Cartographers extends Game {
   //==================================================================================================================================
   //#region === variable structure (generated)

   constructor(props: GameProps) {
      super(props)
      this.state = {
         showResults: false,
         yesno: { skills: [{ yes: true }] },
         plusminus: {},
         multistate: {},
      }
      this.setLanguage()
   }

   results: CartographersResults = {
      side: 0,
      decrees: [],
      skills: []
   }

   //#endregion
   //==================================================================================================================================
   //#region === renders

   renderOptions() {
      return (
         <>
            <Line {...this.shortYesNo('skills')} />
            {this.createOptionsButtons()}
         </>
      )
   }

   renderResults() {
      let resSide: string = this.language.specificArrays.index[this.results.side].content
      let resDecreesCategories: string[] = this.results.decrees.map((_, index) => this.language.specificArrays.index[index].content)
      let resDecreesColors: string[] = this.results.decrees.map(e => this.language.specificArrays.decrees[e].tag)
      let resDecrees: string[] = this.results.decrees.map(e => this.language.specificArrays.decrees[e].content)
      let resSkills: string[] = this.results.skills.map(e => this.language.specificArrays.skills[e].content)

      return (
         <>
            <Line {...this.shortResult(this.language.results.side[0], resSide)} />
            <Line {...this.shortResultCategoryColor(this.language.results.decrees[0], resDecreesCategories, resDecreesColors, resDecrees)} />
            <Line {...this.shortResult(this.language.results.skills[0], resSkills, this.yesNoValue('skills'))} />
            {this.createResultsButtons()}
         </>
      )
   }

   //#endregion
   //==================================================================================================================================
   //#region === randomizer

   randomize() {
      let side: number = 0
      let decrees: number[] = []
      let skills: number[] = []

      side = General.random(0, 1)

      let choices = []
      for (let i = 0; i < 4; i++) {
         choices = [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]
         decrees.push(General.randomFromArray(choices, 1)[0])
      }
      decrees = General.randomizeArray(decrees)

      choices = [...Array(8).keys()]
      skills = General.randomFromArray(choices, 3)

      this.results.side = side
      this.results.decrees = decrees
      this.results.skills = skills

      this.showResults()
   }

   //#endregion
   //==================================================================================================================================
   //#region === language

   setLanguage() {
      this.setCommonLanguage()
      switch (this.props.language.name) {
         case 'Polski':
            this.language = {
               categories: {},
               yesno: {
                  skills: [{ title: 'Umiejętności' }]
               },
               plusminus: {},
               multistate: {},
               specifics: {},
               specificArrays: {
                  index: [
                     { content: 'A', tag: '' },
                     { content: 'B', tag: '' },
                     { content: 'C', tag: '' },
                     { content: 'D', tag: '' },
                  ],
                  decrees: [
                     { content: 'Zagajnik', tag: '#0A6833' },
                     { content: 'Górskie ostępy', tag: '#0A6833' },
                     { content: 'Leśna wieża', tag: '#0A6833' },
                     { content: 'Leśna warta', tag: '#0A6833' },
                     { content: 'Umocnienia', tag: '#641A09' },
                     { content: 'Żyzne równiny', tag: '#641A09' },
                     { content: 'Kolonia', tag: '#641A09' },
                     { content: 'Wielkie miasto', tag: '#641A09' },
                     { content: 'Polny staw', tag: '#946842/#005889' },
                     { content: 'Złoty spichlerz', tag: '#946842/#005889' },
                     { content: 'Rozległe nabrzeże', tag: '#946842/#005889' },
                     { content: 'Dolina magów', tag: '#946842/#005889' },
                     { content: 'Utracone włości', tag: '#483F36' },
                     { content: 'Kryjówki', tag: '#483F36' },
                     { content: 'Pogranicze', tag: '#483F36' },
                     { content: 'Trakt handlowy', tag: '#483F36' },
                  ],
                  skills: [
                     { content: 'Leczenie ran', tag: '' },
                     { content: 'Akrobatyka', tag: '' },
                     { content: 'Koncentracja', tag: '' },
                     { content: 'Wiedza', tag: '' },
                     { content: 'Dyplomacja', tag: '' },
                     { content: 'Skradanie się', tag: '' },
                     { content: 'Negocjacje', tag: '' },
                     { content: 'Przeszukiwanie', tag: '' },
                  ]
               },
               results: {
                  side: ['Mapa'],
                  decrees: ['Dekrety'],
                  skills: ['Umiejętności']
               },
            }
            break

         case 'English':
         default:
            this.language = {
               categories: {},
               yesno: {
                  skills: [{ title: 'Skills' }]
               },
               plusminus: {},
               multistate: {},
               specifics: {},
               specificArrays: {
                  index: [
                     { content: 'A', tag: '' },
                     { content: 'B', tag: '' },
                     { content: 'C', tag: '' },
                     { content: 'D', tag: '' },
                  ],
                  decrees: [
                     { content: 'Sentinel Wood', tag: '#0e8b44' },
                     { content: 'Greenbough', tag: '#0e8b44' },
                     { content: 'Treetower', tag: '#0e8b44' },
                     { content: 'Stoneside Forest', tag: '#0e8b44' },
                     { content: 'Shieldgate', tag: '#8c240d' },
                     { content: 'Greengold Plains', tag: '#8c240d' },
                     { content: 'Wildholds', tag: '#8c240d' },
                     { content: 'Great City', tag: '#8c240d' },
                     { content: 'Canal Lake', tag: '#b0b04f/#0085cc' },
                     { content: 'The Golden Granary', tag: '#b0b04f/#0085cc' },
                     { content: 'Shoreside Expanse', tag: '#b0b04f/#0085cc' },
                     { content: 'Mages Valley', tag: '#b0b04f/#0085cc' },
                     { content: 'Lost Barony', tag: '#746658' },
                     { content: 'The Cauldrons', tag: '#746658' },
                     { content: 'Borderlands', tag: '#746658' },
                     { content: 'The Broken Road', tag: '#746658' },
                  ],
                  skills: [
                     { content: 'Cure Wounds', tag: '' },
                     { content: 'Acrobatics', tag: '' },
                     { content: 'Concentrate', tag: '' },
                     { content: 'Knowledge', tag: '' },
                     { content: 'Diplomacy', tag: '' },
                     { content: 'Move Silently', tag: '' },
                     { content: 'Negotiate', tag: '' },
                     { content: 'Search', tag: '' },
                  ]
               },
               results: {
                  side: ['Map'],
                  decrees: ['Decrees'],
                  skills: ['Skills']
               },
            }
            break
      }
      this.currentLanguage = this.props.language
   }

   //#endregion
   //==================================================================================================================================
}

export default Cartographers