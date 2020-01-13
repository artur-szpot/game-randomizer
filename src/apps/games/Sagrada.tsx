import React from 'react'
import { Game, GameProps } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface SagradaResults {
   windows: number[][]
   tools: number[]
   goals: number[]
   playerOrder: string[]
}

class Sagrada extends Game {
   //==================================================================================================================================
   //#region === additional variables

   playerColors = ['#e60000', '#800080', '#b3f0ff', '#00cc00', '#ff7d00', '#ffff33']

   //#endregion
   //==================================================================================================================================
   //#region === variable structure (generated)

   constructor(props: GameProps) {
      super(props)
      this.state = {
         showResults: false,
         yesno: {
            expansion1: [{ yes: true }],
            promo1: [{ yes: true }],
            promo2: [{ yes: true }],
            promo3: [{ yes: true }],
         },
         plusminus: {
            playerCount: [{
               minMaxCurr: {
                  min: 1,
                  max: 6,
                  current: 4
               }
            }],
         },
         multistate: {},
      }
      this.setLanguage()
   }

   results: SagradaResults = {
      windows: [],
      tools: [],
      goals: [],
      playerOrder: []
   }

   //#endregion
   //==================================================================================================================================
   //#region === renders

   renderOptions() {
      return (
         <>
            <Line {...this.shortPlusMinus('playerCount')} />
            <Line {...this.shortYesNo('expansion1')} />
            <Line {...this.shortYesNo('promo1')} />
            <Line {...this.shortYesNo('promo2')} />
            <Line {...this.shortYesNo('promo3')} />
            {this.createOptionsButtons()}
         </>
      )
   }

   renderResults() {
      let resWindow: string[][] = this.results.windows.map(e => e.map(el => this.language.specificArrays.windows[el].content))

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
         case 'English':
         default:
            this.language = {
               categories: {},
               yesno: {
                  expansion1: [{ title: '5-6 players expansion' }],
                  promo1: [{ title: 'Promo 1' }],
                  promo2: [{ title: 'Promo 2' }],
                  promo3: [{ title: 'Promo 3' }],
               },
               plusminus: {
                  playerCount: [{ title: 'Player count' }],
               },
               multistate: {},
               specifics: {},
               specificArrays: {
                  windows: [
                     { content: 'Symphony of Light / Virtus', tag: 'base' },
                     { content: 'Firelight / Sun\'s Glory', tag: 'base' },
                     { content: 'Shadow Thief / Sun Catcher', tag: 'base' },
                     { content: 'Ripples of Light / Fractal Drops', tag: 'base' },
                     { content: 'Aurora Sagradis / Aurorae Magnificus', tag: 'base' },
                     { content: 'Battlo / Bellesguard', tag: 'base' },
                     { content: 'Comitas / Chromatic Splendor', tag: 'base' },
                     { content: 'Fulgor del Cielo / Luz Celestial', tag: 'base' },
                     { content: 'Via Lux / Industria', tag: 'base' },
                     { content: 'Lux Astram / Lux Mundi', tag: 'base' },
                     { content: 'Firmitas / Kaleidoscopic Dream', tag: 'base' },
                     { content: 'Gravitas / Water of Life', tag: 'base' },
                     { content: 'Romanesque / Baroque', tag: 'exp1' },
                     { content: 'Alegria / Esperança', tag: 'exp1' },
                     { content: 'Naturaleza / Sol', tag: 'exp1' },
                     { content: 'Tenebra / Apricitas', tag: 'exp1' },
                     { content: 'Generosidad / Armonia', tag: 'exp1' },
                     { content: 'Ligero / Shadom', tag: 'exp1' },
                  ],
                  goals: [
                     { content: 'Column Shade Variety', tag: 'base' },
                     { content: 'Shade Variety', tag: 'base' },
                     { content: 'Medium Shades', tag: 'base' },
                     { content: 'Light Shades', tag: 'base' },
                     { content: 'Row Shade Variety', tag: 'base' },
                     { content: 'Column Color Variety', tag: 'base' },
                     { content: 'Color Variety', tag: 'base' },
                     { content: 'Row Color Variety', tag: 'base' },
                     { content: 'Deep Shades', tag: 'base' },
                     { content: 'Color Diagonals', tag: 'base' },
                  ],
                  tools: [
                     { content: 'Running Pliers', tag: 'base' },
                     { content: 'Lens Cutter', tag: 'base' },
                     { content: 'Cork-backed Straightedge', tag: 'base' },
                     { content: 'Flux brush', tag: 'base' },
                     { content: 'Eglomise Brush', tag: 'base' },
                     { content: 'Grozing Pliers', tag: 'base' },
                     { content: 'Grinding Stone', tag: 'base' },
                     { content: 'Copper Foil Burnisher', tag: 'base' },
                     { content: 'Flux Remover', tag: 'base' },
                     { content: 'Glazing Hammer', tag: 'base' },
                     { content: 'Tap Wheel', tag: 'base' },
                     { content: 'Lathekin', tag: 'base' },
                     { content: 'Lead Came Nippers', tag: 'exp1' },
                     { content: 'Strip Cutter', tag: 'exp1' },
                  ]
               },
               results: {
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

      this.results.windows = window

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