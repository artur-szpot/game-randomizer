import React from 'react'
import General from '../general/General'
import { LineProps, LineTypes, ComponentProps, CategoryProps } from '../components/Line'
import { TextProps } from '../components/text/Text'
import { MultiState, MultiStateProps, MultiStateState, MultiStateLanguage } from '../components/multiState/MultiState'
import { PlusMinus, PlusMinusProps, PlusMinusState, PlusMinusLanguage, MinMaxCurrent } from '../components/plusMinus/PlusMinus'
import { YesNoProps, YesNoState, YesNoLanguage } from '../components/yesNo/YesNo'
import { NiceButtonProps, ButtonPanel, NiceButtonIcons, NiceButtonColors } from '../components/buttonPanel/ButtonPanel'

interface GameCommonLanguage { [key: string]: string[] }

export interface ComponentLanguage { title: string }
export interface ComponentState { behaviors?: ComponentBehavior[] }
export enum ComponentBehaviors {
   MINMAX_MIN,
   MINMAX_MAX,
   HIDELIST
}
export interface ComponentBehavior {
   type: ComponentBehaviors,
   target: string,
   index: number
}

/** Internal state of the app. */
export interface GameState {
   showResults: boolean
   yesno: { [key: string]: YesNoState[] }
   plusminus: { [key: string]: PlusMinusState[] }
   multistate: { [key: string]: MultiStateState[] }
}
interface GameStateLanguage {
   categories: { [key: string]: string }
   yesno: { [key: string]: YesNoLanguage[] }
   plusminus: { [key: string]: PlusMinusLanguage[] }
   multistate: { [key: string]: MultiStateLanguage[] }
   results: { [key: string]: string[] }
   specifics: { [key: string]: string }
   specificArrays: { [key: string]: string[] }
}

/** Props passed on to the app from AppBody. */
export interface GameProps {
   language: GamePropsLanguage
   onClickHome: () => void
}
export interface GamePropsLanguage {
   name: string
   abbr: string
   rnd: string
   title: string
}



export class Game extends React.Component<GameProps, GameState> {
   //==================================================================================================================================
   //#region === initialization

   // language 
   currentLanguage: GamePropsLanguage = this.props.language
   language: GameStateLanguage = {
      categories: {},
      yesno: {},
      plusminus: {},
      multistate: {},
      results: {},
      specifics: {},
      specificArrays: {},
   }
   commonLanguage: GameCommonLanguage = {}

   // line constructor
   first: boolean = true

   // functions for components

   functions = {
      onClickYesNo: (props: YesNoProps) => this.handleYesNoClick(props),
      onClickMultiState: {
         mainClick: (props: MultiStateProps, change: number) => this.handleMultiClick(props, change),
         subClick: (props: MultiStateProps, subIndex: number) => this.handleMultiSubClick(props, subIndex),
         listClick: (props: MultiStateProps) => this.handleMultiListClick(props),
      },
      onClickPlusMinus: (props: PlusMinusProps, change: number) => this.handlePlusMinusClick(props, change),

      // big buttons
      onClickRandomize: () => this.randomize(),
      onClickOptions: () => this.showOptions(),
   }

   /** To be overridden in every app. */
   randomize() {
      return
   }

   //#endregion
   //==================================================================================================================================
   //#region === component value access

   yesNoValue(name: string, index: number = 0): boolean {
      if (!this.state.yesno.hasOwnProperty(name) || this.state.yesno[name].length <= index) {
         alert(`yesNoValue called for non-existent entry ${name}[${index}]`)
      }
      return this.state.yesno[name][index].yes
   }

   plusMinusValue(name: string, index: number = 0): MinMaxCurrent {
      if (!this.state.plusminus.hasOwnProperty(name) || this.state.plusminus[name].length <= index) {
         alert(`plusMinusValue called for non-existent entry ${name}[${index}]`)
      }
      return this.state.plusminus[name][index].minMaxCurr
   }

   multiStateValue(name: string, index: number = 0): MultiStateState {
      if (!this.state.multistate.hasOwnProperty(name) || this.state.multistate[name].length <= index) {
         alert(`multiStateValue called for non-existent entry ${name}[${index}]`)
      }
      return this.state.multistate[name][index]
   }

   randomChanceValue(name: string, index: number = 0): number {
      if (!this.state.multistate.hasOwnProperty(name) || this.state.multistate[name].length <= index) {
         alert(`randomChanceValue called for non-existent entry ${name}[${index}]`)
      }
      return this.state.multistate[name][index].current / this.commonLanguage.randomChance.length
   }

   randomChanceEvaluate(name: string, index: number = 0): boolean {
      if (!this.state.multistate.hasOwnProperty(name) || this.state.multistate[name].length <= index) {
         alert(`randomChanceEvalueate called for non-existent entry ${name}[${index}]`)
      }
      return General.random(1, this.commonLanguage.randomChance.length - 1) <= this.state.multistate[name][index].current
   }

   //#endregion
   //==================================================================================================================================
   //#region === handlers

   handleYesNoClick(props: YesNoProps): void {
      if (!this.state.yesno.hasOwnProperty(props.name)) {
         alert("handleYesNoClick called for unsupported component: " + props.name)
         return
      }
      let newState: GameState = Object.assign({}, this.state)

      const yesNoState = this.state.yesno[props.name][props.index]
      newState.yesno[props.name][props.index].yes = !yesNoState.yes

      if (yesNoState.behaviors !== undefined) {
         for (let i = 0; i < yesNoState.behaviors.length; i++) {
            switch (yesNoState.behaviors[i].type) {
               case ComponentBehaviors.HIDELIST:
                  newState.multistate[yesNoState.behaviors[i].target][yesNoState.behaviors[i].index].showList = false
                  break
               default:
                  alert(`unhandled behavior ascribed to YesNo: ${yesNoState.behaviors[i].type}`)
                  break
            }
         }
      }

      this.setState(newState)
   }

   handleMultiClick(props: MultiStateProps, change: number): void {
      if (!this.state.multistate.hasOwnProperty(props.name)) {
         alert("handleMultiClick called for unsupported component: " + props.name)
         return
      }
      let newState = Object.assign({}, this.state)

      const multistateState = this.state.multistate[props.name][props.index]
      const contentsLength = props.isRandomChance ? this.commonLanguage.randomChance.length : this.language.multistate[props.name][props.index].contents.length;
      newState.multistate[props.name][props.index].current = MultiState.validateNewChosen(multistateState.current, change, contentsLength)

      if (multistateState.behaviors !== undefined) {
         for (let i = 0; i < multistateState.behaviors.length; i++) {
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break
            }
         }
      }
      this.setState(newState)
   }

   handleMultiSubClick(props: MultiStateProps, subIndex: number) {
      if (!this.state.multistate.hasOwnProperty(props.name)) {
         alert("handleMultiSubClick called for unsupported component: " + props.name)
         return
      }
      let newState = Object.assign({}, this.state)

      const multistateState = this.state.multistate[props.name][props.index]
      newState.multistate[props.name][props.index] = { current: subIndex, showList: false }

      if (multistateState.behaviors !== undefined) {
         for (let i = 0; i < multistateState.behaviors.length; i++) {
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break
            }
         }
      }
      this.setState(newState)
   }

   handleMultiListClick(props: MultiStateProps) {
      if (!this.state.multistate.hasOwnProperty(props.name)) {
         alert("handleMultiListClick called for unsupported component: " + props.name)
         return
      }
      let newState = Object.assign({}, this.state)

      const multistateState = this.state.multistate[props.name][props.index]
      newState.multistate[props.name][props.index].showList = !multistateState.showList

      if (multistateState.behaviors !== undefined) {
         for (let i = 0; i < multistateState.behaviors.length; i++) {
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break
            }
         }
      }
      this.setState(newState)
   }

   handlePlusMinusClick(props: PlusMinusProps, change: number) {
      if (!this.state.plusminus.hasOwnProperty(props.name)) {
         alert("handlePlusMinusClick called for unsupported varName: " + props.name)
         return
      }
      let newState = Object.assign({}, this.state)

      const plusminusState = this.state.plusminus[props.name][props.index]

      if (PlusMinus.validateMinMaxCurr(plusminusState.minMaxCurr, change)) {
         let newValue = { ...plusminusState.minMaxCurr }
         newValue.current += change
         newState.plusminus[props.name][props.index].minMaxCurr = newValue
         if (plusminusState.behaviors !== undefined) {
            for (let i = 0; i < plusminusState.behaviors.length; i++) {
               let target: ComponentState | null = null
               switch (plusminusState.behaviors[i].type) {
                  case ComponentBehaviors.MINMAX_MIN:
                  case ComponentBehaviors.MINMAX_MAX:
                     target = newState.plusminus[plusminusState.behaviors[i].target][plusminusState.behaviors[i].index]
                     if(plusminusState.behaviors[i].type == ComponentBehaviors.MINMAX_MIN){
                        (target as PlusMinusState).minMaxCurr.min = newValue.current + 1
                     } else {
                        (target as PlusMinusState).minMaxCurr.max = newValue.current - 1
                     }
                     break
                  default:
                     alert(`unhandled behavior ascribed to PlusMinus: ${plusminusState.behaviors[i].type}`)
                     break
               }
            }
         }
      } else { return }
      this.setState(newState)
   }

   //#endregion
   //==================================================================================================================================
   //#region === language

   setLanguage(): void { }

   setCommonLanguage(): void {
      switch (this.props.language.name) {
         case 'Polski':
            this.commonLanguage = {
               randomize: ['Losuj'],
               rerandomize: ['Losuj ponownie'],
               home: ['Powrót do menu'],
               options: ['Zmień opcje'],
               yesNo: ['TAK', 'NIE'],
               randomChance: ['NIGDY', 'RZADKO', 'CZASEM', 'CZĘSTO', 'ZAZWYCZAJ', 'ZAWSZE'],
               playerOrder: ['Pierwszeństwo'],
               show: ['Pokaż']
            }
            break

         case 'English':
         default:
            this.commonLanguage = {
               randomize: ['Randomize'],
               rerandomize: ['Randomize again'],
               home: ['Home'],
               options: ['Back to options'],
               yesNo: ['YES', 'NO'],
               randomChance: ['NEVER', 'RARELY', 'SOMETIMES', 'OFTEN', 'USUALLY', 'ALWAYS'],
               playerOrder: ['Player order'],
               show: ['Show']
            }
            break
      }
   }

   //#endregion
   //==================================================================================================================================
   //#region === render

   renderResults() {
      // overridden by every child
      return (<p>This must be overridden!</p>)
   }

   renderOptions() {
      // overridden by every child
      return (<p>This must be overridden!</p>)
   }

   render() {
      if (this.props.language !== this.currentLanguage) {
         this.setLanguage()
      }

      if (this.state.showResults) {
         return this.renderResults()
      } else {
         return this.renderOptions()
      }
   }

   showOptions() { this.show(false) }
   showResults() { this.show(true) }
   show(showResults: boolean) {
      let newState = Object.assign({}, this.state, { showResults: showResults })
      this.setState(newState)
   }

   //#endregion
   //==================================================================================================================================
   //#region === components
   //================================================================
   //#region ====== general: lines and first-check

   createDoubleLine(title: string, visible: boolean, first: boolean, lineType: LineTypes, insideProps: ComponentProps): LineProps {
      let titleProps: TextProps = {
         name: '',
         index: -1,
         bold: true,
         hideSeparator: false,
         first: first,
         text: title
      }

      return {
         visible: visible,
         title: titleProps,
         lineType: lineType,
         insideProps: insideProps
      }
   }

   createSingleLine(visible: boolean, lineType: LineTypes, insideProps: ComponentProps): LineProps {
      return {
         visible: visible,
         title: null,
         lineType: lineType,
         insideProps: insideProps
      }
   }

   checkFirst(): boolean {
      let first: boolean = this.first
      this.first = false
      return first
   }

   //#endregion
   //================================================================
   //#region ====== buttons

   createResultsButtons() {
      let buttons: NiceButtonProps[] = []
      buttons.push({
         color: NiceButtonColors.RED,
         icon: NiceButtonIcons.HOME,
         label: this.commonLanguage.home[0],
         function: this.props.onClickHome
      })
      buttons.push({
         color: NiceButtonColors.BLUE,
         icon: NiceButtonIcons.OPTIONS,
         label: this.commonLanguage.options[0],
         function: this.functions.onClickOptions
      })
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.RERANDOMIZE,
         label: this.commonLanguage.rerandomize[0],
         function: this.functions.onClickRandomize
      })

      return (
         <ButtonPanel buttons={buttons} />
      )
   }

   createOptionsButtons() {
      let buttons: NiceButtonProps[] = []
      buttons.push({
         color: NiceButtonColors.RED,
         icon: NiceButtonIcons.HOME,
         label: this.commonLanguage.home[0],
         function: this.props.onClickHome
      })
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.RANDOMIZE,
         label: this.commonLanguage.randomize[0],
         function: this.functions.onClickRandomize
      })

      return (
         <ButtonPanel buttons={buttons} />
      )
   }

   createResultsOnlyButtons() {
      let buttons: NiceButtonProps[] = []
      buttons.push({
         color: NiceButtonColors.RED,
         icon: NiceButtonIcons.HOME,
         label: this.commonLanguage.home[0],
         function: this.props.onClickHome
      })
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.RERANDOMIZE,
         label: this.commonLanguage.rerandomize[0],
         function: this.functions.onClickRandomize
      })

      return (
         <ButtonPanel buttons={buttons} />
      )
   }

   //#endregion
   //================================================================
   //#region ====== category

   shortCategory(name: string, subtext: string | string[] | null = null, visible: boolean = true, error: boolean = false): LineProps {
      this.first = true
      let actualSubtext: string[]
      if (subtext === null) {
         actualSubtext = []
      } else if (!Array.isArray(subtext)) {
         actualSubtext = [subtext]
      } else {
         actualSubtext = subtext
      }
      return this.createCategory(
         name,
         0,
         this.language.categories[name],
         actualSubtext,
         [],
         error,
         false,
         '',
         () => null,
         visible
      )
   }

   shortResult(text: string, subtext: string | string[], visible: boolean = true, hiddenMessage: string = '', unhideFunction: () => void = () => null): LineProps {
      this.first = true
      let actualSubtext: string[]
      if (!Array.isArray(subtext)) {
         actualSubtext = [subtext]
      } else {
         actualSubtext = subtext
      }
      return this.createCategory(
         text.split(' ')[0],
         0,
         text,
         actualSubtext,
         [],
         false,
         true,
         hiddenMessage,
         unhideFunction,
         visible
      )
   }

   colorsResult(text: string, colors: string[], visible: boolean = true, hiddenMessage: string = '', unhideFunction: () => void = () => null): LineProps {
      this.first = true
      return this.createCategory(
         text.split(' ')[0],
         0,
         text,
         [],
         colors,
         false,
         true,
         hiddenMessage,
         unhideFunction,
         visible
      )
   }

   createCategory(name: string, index: number, text: string, subtext: string[], colors: string[], error: boolean, result: boolean, hiddenMessage: string, unhideFunction: () => void, visible: boolean): LineProps {
      let insideProps: CategoryProps = {
         name: name,
         index: -1,
         text: text,
         subtext: subtext,
         error: error,
         result: result,
         colors: colors,
         hiddenMessage: hiddenMessage,
         unhideFunction: unhideFunction
      }
      return this.createSingleLine(visible, LineTypes.CATEGORY, insideProps)
   }

   //#endregion
   //================================================================
   //#region ====== multiState

   shortMultiStateArray(name: string, visible: boolean = true) {
      return this.state.multistate[name].map((e, index) => this.createMultiState(
         this.language.multistate[name][index].title,
         name,
         index,
         e.showList,
         this.language.multistate[name][index].contents,
         e.current,
         false,
         visible,
         this.checkFirst()
      ))
   }

   shortMultiState(name: string, visible: boolean = true) {
      return this.createMultiState(
         this.language.multistate[name][0].title,
         name,
         0,
         this.state.multistate[name][0].showList,
         this.language.multistate[name][0].contents,
         this.state.multistate[name][0].current,
         false,
         visible,
         this.checkFirst()
      )
   }

   shortRandomChanceArray(name: string, visible: boolean = true) {
      return this.state.multistate[name].map((e, index) => this.createMultiState(
         this.language.multistate[name][index].title,
         name,
         index,
         e.showList,
         this.commonLanguage.randomChance,
         e.current,
         true,
         visible,
         this.checkFirst()
      ))
   }

   shortRandomChance(name: string, visible: boolean = true) {
      return this.createMultiState(
         this.language.multistate[name][0].title,
         name,
         0,
         this.state.multistate[name][0].showList,
         this.commonLanguage.randomChance,
         this.state.multistate[name][0].current,
         true,
         visible,
         this.checkFirst()
      )
   }

   createMultiState(title: string, name: string, index: number, showList: boolean, states: string[], currentState: number, isRandomChance: boolean, visible: boolean, first: boolean): LineProps {
      let insideProps: MultiStateProps = {
         name: name,
         index: index,
         onClick: this.functions.onClickMultiState,
         showList: showList,
         states: states,
         currentState: currentState,
         isRandomChance: isRandomChance,
      }
      return this.createDoubleLine(title, visible, first, LineTypes.MULTISTATE, insideProps)
   }

   //#endregion
   //================================================================
   //#region ====== plusMinus

   shortPlusMinusArray(name: string, visible: boolean = true) {
      return this.state.plusminus[name].map((e, index) => this.createPlusMinus(
         this.language.plusminus[name][index].title,
         name,
         index,
         this.state.plusminus[name][index].minMaxCurr,
         visible,
         this.checkFirst()
      ))
   }

   shortPlusMinus(name: string, visible: boolean = true) {
      return this.createPlusMinus(
         this.language.plusminus[name][0].title,
         name,
         0,
         this.state.plusminus[name][0].minMaxCurr,
         visible,
         this.checkFirst()
      )
   }

   createPlusMinus(title: string, name: string, index: number, minMaxCurr: MinMaxCurrent, visible: boolean, first: boolean): LineProps {
      let insideProps: PlusMinusProps = {
         name: name,
         index: index,
         onClick: this.functions.onClickPlusMinus,
         minMaxCurr: minMaxCurr,
      }
      return this.createDoubleLine(title, visible, first, LineTypes.PLUSMINUS, insideProps)
   }

   //#endregion
   //================================================================
   //#region ====== yesNo

   shortYesNoArray(name: string, visible: boolean = true): LineProps[] {
      return this.state.yesno[name].map((e, index) => this.createYesNo(
         this.language.yesno[name][index].title,
         this.commonLanguage.yesNo,
         name,
         index,
         this.state.yesno[name][index].yes,
         visible,
         this.checkFirst()
      ))
   }

   shortYesNo(name: string, visible: boolean = true): LineProps {
      return this.createYesNo(
         this.language.yesno[name][0].title,
         this.commonLanguage.yesNo,
         name,
         0,
         this.state.yesno[name][0].yes,
         visible,
         this.checkFirst()
      )
   }

   createYesNo(title: string, display: string[], name: string, index: number, yes: boolean, visible: boolean, first: boolean): LineProps {
      let insideProps: YesNoProps = {
         name: name,
         index: index,
         display: display,
         onClick: this.functions.onClickYesNo,
         yes: yes,
      }
      return this.createDoubleLine(title, visible, first, LineTypes.YESNO, insideProps)
   }

   //#endregion
   //================================================================
   //#endregion
   //==================================================================================================================================
}