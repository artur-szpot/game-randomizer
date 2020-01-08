import React from 'react'
import { Game, GameProps, ComponentBehaviors } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface FrescoResults {
   modules: number[]
   playerOrder: string[]
}

class Fresco extends Game {
	//==================================================================================================================================
	//#region === additional variables

   playerColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00']
   
   //#endregion
   //==================================================================================================================================
   //#region === variable structure (generated)

   constructor(props: GameProps) {
      super(props)
      this.state = {
         showResults: false,
         yesno: {
            modulesAll: [{ yes: true }],
            modules: [
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true },
               { yes: true }
            ],
         },
         plusminus: {
            exact: [{ minMaxCurr: { min: 1, max: 11, current: 6 } }],
            normalBase: [{ minMaxCurr: { min: 0, max: 11, current: 6 } }],
            normalVariation: [{ minMaxCurr: { min: 1, max: 11, current: 2 } }],
            rangeMin: [{
               minMaxCurr: { min: 1, max: 7, current: 4 },
               behaviors: [{ type: ComponentBehaviors.MINMAX_MIN, target: 'rangeMax', index: 0 }]
            }],
            rangeMax: [{
               minMaxCurr: { min: 5, max: 11, current: 8 },
               behaviors: [{ type: ComponentBehaviors.MINMAX_MAX, target: 'rangeMin', index: 0 }]
            }],
         },
         multistate: {
            randomizingMode: [{ current: 0, showList: false }],
         },
      }
      this.setLanguage()
   }

   results: FrescoResults = {
      modules: [],
      playerOrder: []
   }

   //#endregion
   //==================================================================================================================================
   //#region === renders

   renderOptions() {
      let modulesAllLines: JSX.Element[] = []
      const modulesAllProps = this.shortYesNoArray('modules', !this.yesNoValue('modulesAll'))
      for (let i = 0; i < modulesAllProps.length; i++) {
         modulesAllLines.push(<Line key={'modules-' + i} {...modulesAllProps[i]} />)
      }

      return (
         <>
            <Line {...this.shortCategory('mode')} />
            <Line {...this.shortMultiState('randomizingMode')} />
            <Line {...this.shortPlusMinus('exact', this.multiStateValue('randomizingMode').current === 0)} />
            <Line {...this.shortPlusMinus('rangeMin', this.multiStateValue('randomizingMode').current === 1)} />
            <Line {...this.shortPlusMinus('rangeMax', this.multiStateValue('randomizingMode').current === 1)} />
            <Line {...this.shortPlusMinus('normalBase', this.multiStateValue('randomizingMode').current === 2)} />
            <Line {...this.shortPlusMinus('normalVariation', this.multiStateValue('randomizingMode').current === 2)} />
            <Line {...this.shortCategory('modulesCategory')} />
            <Line {...this.shortYesNo('modulesAll')} />
            {modulesAllLines}
            {this.createOptionsButtons()}
         </>
      )
   }

   renderResults() {
      let resModules: string[] = this.results.modules.map(value => this.language.yesno.modules[value].title)

      return (
         <>
         <Line {...this.colorsResult(this.commonLanguage.playerOrder[0], this.results.playerOrder)} />
            <Line {...this.shortResult(this.language.results.modules[0], resModules)} />
            {this.createResultsButtons()}
         </>
      )
   }

   //#endregion
   //==================================================================================================================================
   //#region === randomizer

   randomize() {
      let modules: number[] = []

      let totalModulesToChoose: number = 0
      switch (this.multiStateValue('randomizingMode').current) {
         case 0:
            totalModulesToChoose = this.plusMinusValue('exact').current
            break
         case 1:
            totalModulesToChoose = General.random(this.plusMinusValue('rangeMin').current, this.plusMinusValue('rangeMax').current)
            break
         case 2:
            totalModulesToChoose = General.randomNormal(this.plusMinusValue('normalBase').current, this.plusMinusValue('normalVariation').current, 0, 11)
      }

      let modulesToChooseFrom: number[]
      if (this.yesNoValue('modulesAll')) {
         modulesToChooseFrom = [...Array(this.language.yesno.modules.length).keys()]
      } else {
         modulesToChooseFrom = this.state.yesno.modules.map((state, index) => state.yes ? index : -1).filter(value => value > -1)
      }
      if (modulesToChooseFrom.length >= totalModulesToChoose) {
         modules = General.randomFromArray(modulesToChooseFrom, totalModulesToChoose)
      } else {
         let otherModules = this.state.yesno.modules.map((state, index) => !state.yes ? index : -1).filter(value => value > -1)
         modules = modulesToChooseFrom.concat(General.randomFromArray(otherModules, totalModulesToChoose - modulesToChooseFrom.length))
      }
      modules = modules.sort((a, b) => a - b)

      this.results.modules = modules

		// randomize player order
		this.results.playerOrder = General.randomizeArray(this.playerColors.slice())

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
               categories: {
                  mode: 'Tryb losowania',
                  modulesCategory: 'Moduły',
                  modulesCategorySubtext: 'Jeśli wybrana/wylosowana liczba modułów przekroczy liczbę dopuszczonych, nadmiar zostanie dobrany spośród niedozwolonych.',
               },
               yesno: {
                  modulesAll: [{ title: 'Wszystkie moduły' }],
                  modules: [
                     { title: '1 - Portrety' },
                     { title: '2 - Prośba biskupa' },
                     { title: '3 - Specjalne mieszanki kolorów' },
                     { title: '4 - Studnia Życzeń' },
                     { title: '5 - Płatki złota' },
                     { title: '6 - Szklarze' },
                     { title: '7 - Zwoje' },
                     { title: '8 - Dzwony' },
                     { title: '9 - Fresk naścienny' },
                     { title: '10 - Medico' },
                     { title: 'Queenie 1 - Przysługi biskupa' }
                  ],
               },
               plusminus: {
                  exact: [{ title: 'Liczba modułów' }],
                  rangeMin: [{ title: 'Minimalna liczba modułów' }],
                  rangeMax: [{ title: 'Maksymalna liczba modułów' }],
                  normalBase: [{ title: 'Podstawowa wartość' }],
                  normalVariation: [{ title: 'Dopuszczalne odchylenie' }],
               },
               multistate: {
                  randomizingMode: [{
                     title: 'Tryb losowania',
                     contents: [
                        'Dokładna liczba',
                        'Zakres',
                        'Przybliżona liczba'
                     ]
                  }],
               },
               specifics: {},
               specificArrays: {},
               results: {
                  modules: ['Wybrane moduły'],
               },
            }
            break

         case 'English':
         default:
            this.language = {
               categories: {
                  mode: 'Randomizing mode',
                  modulesCategory: 'Modules',
                  modulesCategorySubtext: 'If the chosen/randomized number of modules exceeds the number of those allowed, the excess will be drawn from among those disallowed.',
               },
               yesno: {
                  modulesAll: [{ title: 'All modules' }],
                  modules: [
                     { title: '1 – The portraits' },
                     { title: '2 – The bishop’s request' },
                     { title: '3 – Special blend colors' },
                     { title: '4 – The Wishing Well' },
                     { title: '5 – The Leaf Gold' },
                     { title: '6 – The Glaziers' },
                     { title: '7 – The Scrolls' },
                     { title: '8 – The Bells' },
                     { title: '9 – The Wall Fresco' },
                     { title: '10 – The Medico' },
                     { title: 'Queenie – The bishop’s favors' }
                  ],
               },
               plusminus: {
                  exact: [{ title: 'Number of modules' }],
                  rangeMin: [{ title: 'Minimum' }],
                  rangeMax: [{ title: 'Maximum' }],
                  normalBase: [{ title: 'Base value' }],
                  normalVariation: [{ title: 'Allowed variation' }],
               },
               multistate: {
                  randomizingMode: [{
                     title: 'Randomizing mode',
                     contents: [
                        'Exact number',
                        'From a range',
                        'Normalized random'
                     ]
                  }],
               },
               specifics: {},
               specificArrays: {},
               results: {
                  modules: ['Chosen modules'],
               },
            }
            break
      }
      this.currentLanguage = this.props.language
   }

   //#endregion
   //==================================================================================================================================
}

export default Fresco