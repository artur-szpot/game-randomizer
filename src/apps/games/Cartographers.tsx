import React from 'react'
import { Game, GameProps, GameState } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface CartographersResults {
   side: number
   decrees: number[]
}

class Cartographers extends Game {
   //==================================================================================================================================
   //#region === variable structure (generated)

   constructor(props: GameProps) {
      super(props)
      this.state = this.randomizeState({
         showResults: false,
         yesno: {},
         plusminus: {},
         multistate: {},
      })
      this.setLanguage()
   }

   results: CartographersResults = {
      side: 0,
      decrees: []
   }

   //#endregion
   //==================================================================================================================================
   //#region === renders

   renderOptions() { return this.renderResults() }

   renderResults() {
      let resSide: string = this.language.specificArrays.index[this.results.side]
      let resDecrees: string[] = this.results.decrees.map((e, index) => this.language.specificArrays.index[index] + ': ' + this.language.specificArrays.decrees[e])

      return (
         <>
            <Line {...this.shortResult(this.language.results.side[0], resSide)} />
            <Line {...this.shortResult(this.language.results.decrees[0], resDecrees)} />
            {this.createResultsOnlyButtons()}
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
               plusminus: {},
               multistate: {},
               specifics: {},
               specificArrays: {
                  index: ['A', 'B', 'C', 'D'],
                  decrees: [
                     'dec1',
                     'dec2',
                     'dec3',
                     'dec4',
                     'dec5',
                     'dec6',
                     'dec7',
                     'dec8',
                  ]
               },
               results: {
                  side: ['Mapa'],
                  decrees: ['Dekrety'],
               },
            }
            break

         case 'English':
         default:
            this.language = {
               categories: {},
               yesno: {},
               plusminus: {},
               multistate: {},
               specifics: {},
               specificArrays: {
                  index: ['A', 'B', 'C', 'D'],
                  decrees: [
                     'dec1',
                     'dec2',
                     'dec3',
                     'dec4',
                     'dec5',
                     'dec6',
                     'dec7',
                     'dec8',
                  ]
               },
               results: {
                  side: ['Map'],
                  decrees: ['Decrees'],
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
      this.setState(this.randomizeState(this.state))
   }

   randomizeState(currentState: GameState) {
      let side: number = 0
      let decrees: number[] = []

      side = General.random(0, 1)
      for(let i=0;i<4;i++){
         let choices = [i*2, i*2+1]
         decrees.push(General.randomFromArray(choices, 1)[0])
      }

      decrees = General.randomizeArray(decrees)

      this.results.side = side
      this.results.decrees = decrees

      let newState = Object.assign({}, currentState, { showResults: true })
      return newState
   }

   //#endregion
   //==================================================================================================================================
   //#region === additional functions

   // n/a

   //#endregion
   //==================================================================================================================================
}

export default Cartographers