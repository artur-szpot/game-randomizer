import React from 'react'
import { Game, GameProps } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface EthnosResults {
   races: number[]
   playerOrder: string[]
}

class Ethnos extends Game {
   //==================================================================================================================================
   //#region === additional variables

   playerColors = ['white','lightblue','purple','lightgreen','red','black']

   //#endregion
   //==================================================================================================================================
   //#region === variable structure (generated)

   constructor(props: GameProps) {
      super(props)
      this.state = {
         showResults: false,
         yesno: {
            twoPlayers: [{ yes: false }],
            fairies: [{ yes: false }],
         },
         plusminus: {},
         multistate: {},
      }
      this.setLanguage()
   }

   results: EthnosResults = {
      races: [],
      playerOrder: []
   }

   //#endregion
   //==================================================================================================================================
   //#region === renders

   renderOptions() {
      return (
         <>
            <Line {...this.shortYesNo('twoPlayers')} />
            <Line {...this.shortYesNo('fairies')} />
            {this.createOptionsButtons()}
         </>
      )
   }

   renderResults() {
      let resRaces: string[] = this.results.races.map(e => this.language.specificArrays.races[e])

      return (
         <>
            <Line {...this.colorsResult(this.commonLanguage.playerOrder[0], this.results.playerOrder)} />
            <Line {...this.shortResult(this.language.results.races[0], resRaces)} />
            {this.createResultsButtons()}
         </>
      )
   }

   //#endregion
   //==================================================================================================================================
   //#region === randomizer

   randomize() {
      let races: number[] = []

      let racesChoice = [...Array(12 + (this.yesNoValue('fairies') ? 1 : 0)).keys()]
      races = General.randomFromArray(racesChoice, 6 - (this.yesNoValue('twoPlayers') ? 1 : 0))

      this.results.races = races

      // randomize player order
      this.results.playerOrder = General.randomizeArray(this.playerColors.slice())

		this.showResults()
   }

   //#endregion
   //==================================================================================================================================
   //#region === additional functions

   // n/a

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
                  twoPlayers: [{ title: 'Tylko dwójka graczy' }],
                  fairies: [{ title: 'Promka: Wróżki' }],
               },
               plusminus: {},
               multistate: {},
               specifics: {},
               specificArrays: {
                  races: [
                     'Szkielety',
                     'Niziołki',
                     'Giganci',
                     'Morski lud',
                     'Trolle',
                     'Elfy',
                     'Orkowie',
                     'Czarodzieje',
                     'Minotaury',
                     'Centaury',
                     'Skrzydlaci',
                     'Krasnoludy',
                     'Wróżki'
                  ],
               },
               results: {
                  races: ['Rasy'],
               },
            }
            break

         case 'English':
         default:
            this.language = {
               categories: {},
               yesno: {
                  twoPlayers: [{ title: 'Two players only' }],
                  fairies: [{ title: 'Promo: Fairies' }],
               },
               plusminus: {},
               multistate: {},
               specifics: {},
               specificArrays: {
                  races: [
                     'Skeleton',
                     'Halfling',
                     'Giant',
                     'Merfolk',
                     'Troll',
                     'Elf',
                     'Orc',
                     'Wizards',
                     'Minotaur',
                     'Centaur',
                     'Wingfolk',
                     'Dwarf',
                     'Fairies'
                  ],
               },
               results: {
                  races: ['Races']
               },
            }
            break
      }
      this.currentLanguage = this.props.language
   }

   //#endregion
   //==================================================================================================================================
}

export default Ethnos