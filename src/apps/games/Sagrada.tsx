import React from 'react'
import { Game, GameProps } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface SagradaResults {
   window: number[][]
   playerOrder: string[]
}

class Sagrada extends Game {
   //==================================================================================================================================
   //#region === additional variables

   playerColors = ['red','blue','green']

   //#endregion
   //==================================================================================================================================
   //#region === variable structure (generated)

   constructor(props: GameProps) {
      super(props)
      this.state = {
         showResults: false,
         yesno: {},
         plusminus: {
            playerCount: [{
               minMaxCurr: {
                  min: 1,
                  max: 6,
                  current: 2
               }
            }],
         },
         multistate: {},
      }
      this.setLanguage()
   }

   results: SagradaResults = {
      window: [],
      playerOrder: []
   }

   //#endregion
   //==================================================================================================================================
   //#region === renders

   renderOptions() {
      return (
         <>
            <Line {...this.shortPlusMinus('playerCount')} />
            {this.createOptionsButtons()}
         </>
      )
   }

   renderResults() {
      let resWindow: string[][] = this.results.window.map(e => e.map(el => String(el)))

      let windowAllLines: JSX.Element[] = []
      for (let i: number = 0; i < this.language.results.window.length; i++) {
         windowAllLines.push(<Line key={'window-' + i} {...this.shortResult(this.language.results.window[i], resWindow[i])} />)
      }

      return (
         <>
            <Line {...this.colorsResult(this.commonLanguage.playerOrder[0], this.results.playerOrder)} />
            {windowAllLines}
            {this.createResultsButtons()}
         </>
      )
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
               yesno: {},
               plusminus: {
                  playerCount: [{ title: 'PLACEHOLDER' }],
               },
               multistate: {},
               specifics: {},
               specificArrays: {},
               results: {
                  window: ['PLACEHOLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER'],
               },
            }
            break

         case 'English':
         default:
            this.language = {
               categories: {},
               yesno: {},
               plusminus: {
                  playerCount: [{ title: 'PLACEHOLDER' }],
               },
               multistate: {},
               specifics: {},
               specificArrays: {},
               results: {
                  window: ['PLACEH2OLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER',
                     'PLACEHOLDER'],
               },
            }
            break
      }
      this.currentLanguage = this.props.language
   }

   //#endregion
   //==================================================================================================================================
   //#region === randomizer

   randomize() {
      let window: number[][] = []

      // perform randomization

      this.results.window = window

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
}

export default Sagrada