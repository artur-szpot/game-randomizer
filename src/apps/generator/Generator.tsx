import React from 'react'
import { GeneratorLine, GeneratorLineProps, GeneratorLineType, GeneratorLineSelectValues, GeneratorLineFields, GeneratorLineInput } from './GeneratorLine'
import { GeneratedElement, GeneratorTemplate } from './GeneratorTemplate'
import { Line, LineProps, CategoryProps, ComponentProps, LineTypes } from '../../components/Line'
import { NiceButtonProps, NiceButtonColors, NiceButtonIcons, ButtonPanel } from '../../components/buttonPanel/ButtonPanel'

interface GeneratorProps {
   onClickHome: () => void
   // soon for language as well (etc.?)
}
interface State {
   appName: GeneratorLineProps
   components: GeneratorLineProps[]
   results: GeneratorLineProps[]
   resultsError: string
   totalErrors: number
   generated: string
}

class Generator extends React.Component<GeneratorProps, State> {

   emptyGeneratorLineInput(): GeneratorLineInput { return { value: '', error: '' } }

   emptyGeneratorLineProps(): GeneratorLineProps {
      return {
         index: -1,
         first: false,
         last: false,
         component: GeneratorLineType.COMPONENT,
         componentInstancesInput: this.emptyGeneratorLineInput(),
         categorySubtext: GeneratorLineSelectValues.NO,
         randomizeColors: GeneratorLineSelectValues.YES,
         yesNoInitial: GeneratorLineSelectValues.YES,
         randomChanceInitial: GeneratorLineSelectValues.SOMETIMES,
         multiStateCurrent: this.emptyGeneratorLineInput(),
         multiStateTotal: this.emptyGeneratorLineInput(),
         plusMinusValues: [this.emptyGeneratorLineInput(), this.emptyGeneratorLineInput(), this.emptyGeneratorLineInput()],
         minMaxValues: [this.emptyGeneratorLineInput(), this.emptyGeneratorLineInput(), this.emptyGeneratorLineInput(), this.emptyGeneratorLineInput()],
         handleSelect: (component: GeneratorLineType, index: number, field: GeneratorLineFields, value: GeneratorLineSelectValues) => this.handleSelect(component, index, field, value),
         handleInput: (component: GeneratorLineType, index: number, field: GeneratorLineFields, value: string) => this.handleInput(component, index, field, value),
         componentTypeSelect: GeneratorLineSelectValues.YESNO,
         componentNameInput: this.emptyGeneratorLineInput(),
         moveClick: (component: GeneratorLineType, index: number, direction: number) => this.move(component, index, direction),
         deleteClick: (component: GeneratorLineType, index: number) => this.delete(component, index),
      }
   }

   //==================================================================================================================================
   //#region === initialization

   constructor(props: GeneratorProps) {
      super(props)
      const appName: GeneratorLineProps = this.emptyGeneratorLineProps()
      appName.index = 0
      appName.component = GeneratorLineType.APPNAME
      appName.componentTypeSelect = GeneratorLineSelectValues.APPNAME
      appName.randomizeColors = GeneratorLineSelectValues.YES
      this.state = this.validateState({
         appName: appName,
         components: [],
         results: [],
         resultsError: '',
         totalErrors: 0,
         generated: '',
      })
   }

   language = {
      generate: 'Generate',
      add: 'Add new line'
   } //temp!

   //#endregion
   //==================================================================================================================================
   //#region === handlers

   handleSelect(component: GeneratorLineType, index: number, field: GeneratorLineFields, value: GeneratorLineSelectValues): void {
      let newLines: GeneratorLineProps[]
      if (component === GeneratorLineType.APPNAME) {
         let appName = { ...this.state.appName }
         appName.randomizeColors = value
         let newState
         newState = Object.assign({}, this.state, { appName: appName })
         this.setState(newState, this.validate)
         return
      }
      else if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components]
      } else {
         newLines = [...this.state.results]
      }
      switch (field) {
         case GeneratorLineFields.TYPE:
            newLines[index].componentTypeSelect = value
            break
         case GeneratorLineFields.CATEGORY_SUBTEXT:
            newLines[index].categorySubtext = value
            break
         case GeneratorLineFields.YESNO_INITIAL:
            newLines[index].yesNoInitial = value
            break
         case GeneratorLineFields.RANDOMCHANCE_CURRENT:
            newLines[index].randomChanceInitial = value
            break
         default:
            alert('Attempted to call handleSelect for an unsupported field: ' + field)
            break
      }
      let newState
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines })
      } else {
         newState = Object.assign({}, this.state, { results: newLines })
      }
      this.setState(newState, this.validate)
   }

   handleInput(component: GeneratorLineType, index: number, field: GeneratorLineFields, value: string): void {
      if (component === GeneratorLineType.APPNAME) {
         let newAppName = { ...this.state.appName }
         newAppName.componentNameInput.value = value
         let newState = Object.assign({}, this.state, { appName: newAppName })
         this.setState(newState, this.validate)
         return
      }

      // validate input where necessary
      switch (field) {
         case GeneratorLineFields.INDEX:
         case GeneratorLineFields.PLUSMINUS_MIN:
         case GeneratorLineFields.PLUSMINUS_MAX:
         case GeneratorLineFields.PLUSMINUS_CURRENT:
         case GeneratorLineFields.MINMAX_MIN:
         case GeneratorLineFields.MINMAX_MAX:
         case GeneratorLineFields.MINMAX_MIN_CURRENT:
         case GeneratorLineFields.MINMAX_MAX_CURRENT:
         case GeneratorLineFields.MULTISTATE_CURRENT:
         case GeneratorLineFields.MULTISTATE_TOTAL:
            if (value.length > 2 || isNaN(Number(value)) || Number(value) % 1 || Number(value) < 0) {
               return
            }
            break
         default:
            break
      }
      let newLines: GeneratorLineProps[]
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components]
      } else {
         newLines = [...this.state.results]
      }
      switch (field) {
         case GeneratorLineFields.NAME:
            newLines[index].componentNameInput.value = value
            break
         case GeneratorLineFields.INDEX:
            newLines[index].componentInstancesInput.value = value
            break
         case GeneratorLineFields.PLUSMINUS_MIN:
            newLines[index].plusMinusValues[0].value = value
            break
         case GeneratorLineFields.PLUSMINUS_MAX:
            newLines[index].plusMinusValues![1].value = value
            break
         case GeneratorLineFields.PLUSMINUS_CURRENT:
            newLines[index].plusMinusValues![2].value = value
            break
         case GeneratorLineFields.MINMAX_MIN:
            newLines[index].minMaxValues![0].value = value
            break
         case GeneratorLineFields.MINMAX_MAX:
            newLines[index].minMaxValues![1].value = value
            break
         case GeneratorLineFields.MINMAX_MIN_CURRENT:
            newLines[index].minMaxValues![2].value = value
            break
         case GeneratorLineFields.MINMAX_MAX_CURRENT:
            newLines[index].minMaxValues![3].value = value
            break
         case GeneratorLineFields.MULTISTATE_CURRENT:
            newLines[index].multiStateCurrent.value = value
            break
         case GeneratorLineFields.MULTISTATE_TOTAL:
            newLines[index].multiStateTotal.value = value
            break
         default:
            alert('Attempted to call handleInput for an unsupported field: ' + field)
            break
      }
      let newState
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines })
      } else {
         newState = Object.assign({}, this.state, { results: newLines })
      }
      this.setState(newState, this.validate)
   }

   //#endregion
   //==================================================================================================================================
   //#region === line functions

   move(component: GeneratorLineType, index: number, direction: number): void {
      let newLines: GeneratorLineProps[]
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components]
      } else {
         newLines = [...this.state.results]
      }
      let tempLine = { ...newLines[index] }
      newLines[index] = { ...newLines[index + direction] }
      newLines[index].first = index === 0
      newLines[index].last = index === newLines.length - 1
      newLines[index].index = index
      newLines[index + direction] = tempLine
      newLines[index + direction].first = index + direction === 0
      newLines[index + direction].last = index + direction === newLines.length - 1
      newLines[index + direction].index = index + direction
      let newState
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines })
      } else {
         newState = Object.assign({}, this.state, { results: newLines })
      }
      this.setState(newState, this.validate)
   }

   delete(component: GeneratorLineType, index: number): void {
      let newLines: GeneratorLineProps[]
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components]
      } else {
         newLines = [...this.state.results]
      }
      newLines.splice(index, 1)
      if (newLines.length > 0) {
         for (let i = index; i < newLines.length; i++) {
            newLines[i].index = i
         }
         if (index === 0) {
            newLines[0].first = true
         }
         if (index === newLines.length) {
            newLines[newLines.length - 1].last = true
         }
      }
      let newState
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines })
      } else {
         newState = Object.assign({}, this.state, { results: newLines })
      }
      this.setState(newState, this.validate)
   }

   add(component: GeneratorLineType, several: boolean): void {
      let count: number = 1

      if (several) {
         let howMany: string | null = prompt('Provide the number of options to insert:')
         if (howMany === null) { return }
         count = Number(howMany)
         if (isNaN(count)) { return }
      }

      let newLines: GeneratorLineProps[]
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components]
      } else {
         newLines = [...this.state.results]
      }
      if (newLines.length > 0) {
         newLines[newLines.length - 1].last = false
      }
      for (let i = 0; i < count; i++) {
         let newLine: GeneratorLineProps = this.emptyGeneratorLineProps()
         newLine.index = newLines.length
         newLine.first = newLines.length === 0
         newLine.last = i === count - 1
         newLine.component = component
         newLine.componentTypeSelect = component === GeneratorLineType.COMPONENT ? GeneratorLineSelectValues.YESNO : GeneratorLineSelectValues.NUMBER
         newLines.push(newLine)

      }
      let newState
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines })
      } else {
         newState = Object.assign({}, this.state, { results: newLines })
      }
      this.setState(newState, this.validate)
   }

   //#endregion
   //==================================================================================================================================
   //#region === validation

   validate() {
      this.setState(this.validateState(this.state))
   }

   countErrors(input: GeneratorLineProps): number {
      let result: number = 0
      result += input.componentNameInput.error ? 1 : 0
      switch (input.componentTypeSelect) {
         case GeneratorLineSelectValues.MULTISTATE:
            result += input.multiStateCurrent.error ? 1 : 0
            result += input.multiStateTotal.error ? 1 : 0
            break
         case GeneratorLineSelectValues.PLUSMINUS:
            for (let j = 0; j < 3; j++) {
               result += input.plusMinusValues[j].error ? 1 : 0
            }
            break
         case GeneratorLineSelectValues.MINMAX:
            for (let j = 0; j < 4; j++) {
               result += input.minMaxValues[j].error ? 1 : 0
            }
            break
      }
      return result
   }

   validateState(currentState: State): State {
      let newState = { ...currentState }
      newState = this.validateAppName(newState)
      newState = this.validateComponents(newState)
      newState = this.validateResults(newState)
      newState.totalErrors = 0
      newState.totalErrors += this.countErrors(newState.appName)
      for (let i = 0; i < newState.components.length; i++) {
         newState.totalErrors += this.countErrors(newState.components[i])
      }
      if (newState.results.length === 0) {
         newState.resultsError = 'The app has to return at least one result.'
         newState.totalErrors++
      } else {
         newState.resultsError = ''
      }
      for (let i = 0; i < newState.results.length; i++) {
         newState.totalErrors += this.countErrors(newState.results[i])
      }
      return newState
   }

   validateAppName(newState: State) {
      let input: string = newState.appName.componentNameInput.value
      let failMessage: string = ''
      while (true) {
         if (input.length < 3) {
            failMessage = 'All names have to consist of at least 3 characters.'
            break
         }

         let regex = /[A-Z][a-zA-Z0-9]*/.exec(input)
         if (regex === null || regex[0] !== input) {
            failMessage = 'App name must begin with a capital letter and contain only letters and numbers.'
            break
         }
         break
      }
      newState.appName.componentNameInput.error = failMessage
      return newState
   }

   validateComponents(newState: State) {
      let emptyCategory: boolean = false
      let allNames: string[] = []
      for (let i = 0; i < newState.components.length; i++) {
         let input: string = newState.components[i].componentNameInput.value
         let select: GeneratorLineSelectValues = newState.components[i].componentTypeSelect
         let failMessage: string = ''
         // check the generals
         while (true) {
            if (allNames.indexOf(input) !== -1) {
               failMessage = 'Components\' names must be unique.'
               break
            }
            if (input) {
               allNames.push(input)
            }

            if (select === 'category') {
               if (emptyCategory) {
                  failMessage = 'The first component after a category may not be another category.'
                  break
               } else if (i === newState.components.length - 1) {
                  failMessage = 'A category may not be empty.'
                  break
               }
               emptyCategory = true
            } else {
               emptyCategory = false
            }

            if (input.length < 3) {
               failMessage = 'All names have to consist of at least 3 characters.'
               break
            }

            let regex = /[a-z][a-zA-Z0-9]*/.exec(input)
            if (regex === null || regex[0] !== input) {
               failMessage = 'Components\' names must begin with a small letter and contain only letters and numbers.'
               break
            }
            break
         }
         newState.components[i].componentNameInput.error = failMessage
         // check the particulars
         switch (select) {
            case GeneratorLineSelectValues.MULTISTATE:
               if (Number(newState.components[i].multiStateCurrent.value) > Number(newState.components[i].multiStateTotal.value)) {
                  newState.components[i].multiStateCurrent.error = 'current > total'
               } else if (Number(newState.components[i].multiStateCurrent.value) < 1) {
                  newState.components[i].multiStateCurrent.error = 'current < 1'
               } else {
                  newState.components[i].multiStateCurrent.error = newState.components[i].multiStateCurrent.value ? '' : '`' // error with no message if blank
               }
               newState.components[i].multiStateTotal.error = newState.components[i].multiStateTotal.value ? '' : '`' // error with no message if blank
               break
            case GeneratorLineSelectValues.PLUSMINUS:
               newState.components[i].plusMinusValues[0].error = ''
               newState.components[i].plusMinusValues[1].error = ''
               newState.components[i].plusMinusValues[2].error = ''
               const minMaxCurr: number[] = [
                  Number(newState.components[i].plusMinusValues[0].value),
                  Number(newState.components[i].plusMinusValues[1].value),
                  Number(newState.components[i].plusMinusValues[2].value)
               ]
               // check logic
               if (minMaxCurr[0] >= minMaxCurr[1]) {
                  newState.components[i].plusMinusValues[0].error = 'min >= max'
                  newState.components[i].plusMinusValues[1].error = 'max <= min'
               }
               if (minMaxCurr[2] < minMaxCurr[0]) {
                  newState.components[i].plusMinusValues[2].error = 'current < min'
               } else if (minMaxCurr[2] > minMaxCurr[1]) {
                  newState.components[i].plusMinusValues[2].error = 'current > max'
               }
               // check for blanks
               for (let k = 0; k < 3; k++) {
                  if (!newState.components[i].plusMinusValues[k].value) {
                     newState.components[i].plusMinusValues[k].error = '`' // blank error has no message => ` will be replaced with normal label
                  }
               }
               break
            case GeneratorLineSelectValues.MINMAX:
               newState.components[i].minMaxValues[0].error = ''
               newState.components[i].minMaxValues[1].error = ''
               newState.components[i].minMaxValues[2].error = ''
               newState.components[i].minMaxValues[3].error = ''
               const minMaxValues = {
                  min: Number(newState.components[i].minMaxValues[0].value),
                  max: Number(newState.components[i].minMaxValues[1].value),
                  currmin: Number(newState.components[i].minMaxValues[2].value),
                  currmax: Number(newState.components[i].minMaxValues[3].value)
               }
               // check logic
               if (minMaxValues.min >= minMaxValues.max) {
                  newState.components[i].minMaxValues[0].error = 'min >= max'
                  newState.components[i].minMaxValues[1].error = 'max <= min'
               }
               if (minMaxValues.currmin >= minMaxValues.currmax) {
                  newState.components[i].minMaxValues[2].error = 'current min >= current max'
                  newState.components[i].minMaxValues[3].error = 'current max <= current min'
               }
               if (minMaxValues.currmin < minMaxValues.min) {
                  newState.components[i].minMaxValues[2].error = 'current min < min'
               } else if (minMaxValues.currmin >= minMaxValues.max) {
                  newState.components[i].minMaxValues[2].error = 'current min >= max'
               }
               if (minMaxValues.currmax <= minMaxValues.min) {
                  newState.components[i].minMaxValues[3].error = 'current max <= min'
               } else if (minMaxValues.currmax > minMaxValues.max) {
                  newState.components[i].minMaxValues[3].error = 'current max > max'
               }
               // check for blanks
               for (let k = 0; k < 4; k++) {
                  if (!newState.components[i].minMaxValues[k].value) {
                     newState.components[i].minMaxValues[k].error = '`' // blank error has no message => ` will be replaced with normal label
                  }
               }
               break
         }
      }
      return newState
   }

   validateResults(newState: State) {
      let allNames: string[] = []
      for (let i = 0; i < newState.results.length; i++) {
         let input: string = newState.results[i].componentNameInput.value
         let failMessage: string = ''
         while (true) {
            if (allNames.indexOf(input) !== -1) {
               failMessage = 'Results\' names must be unique.'
               break
            }
            if (input) {
               allNames.push(input)
            }

            if (input.length < 3) {
               failMessage = 'All names have to consist of at least 3 characters.'
               break
            }

            let regex = /[a-z][a-zA-Z0-9]*/.exec(input)
            if (regex === null || regex[0] !== input) {
               failMessage = 'Results\' names must begin with a small letter and contain only letters and numbers.'
               break
            }
            break
         }
         newState.results[i].componentNameInput.error = failMessage
      }
      return newState
   }

   //#endregion
   //==================================================================================================================================
   //#region === generation

   generate() {
      if (this.state.totalErrors) {
         return
      }
      let opts: GeneratedElement[] = []
      let results: GeneratedElement[] = []
      for (let i = 0; i < this.state.components.length; i++) {
         const type = this.state.components[i].componentTypeSelect
         let initial: string[] = []
         switch (type) {
            case GeneratorLineSelectValues.CATEGORY:
               initial.push(this.state.components[i].categorySubtext)
               break
            case GeneratorLineSelectValues.MULTISTATE:
               initial.push(String(Number(this.state.components[i].multiStateCurrent.value) - 1))
               initial.push(this.state.components[i].multiStateTotal.value)
               break
            case GeneratorLineSelectValues.PLUSMINUS:
               for (let j = 0; j < 3; j++) { initial.push(this.state.components[i].plusMinusValues[j].value) }
               break
            case GeneratorLineSelectValues.MINMAX:
               initial.push(this.state.components[i].minMaxValues[0].value)
               initial.push(String(Number(this.state.components[i].minMaxValues[3].value) - 1))
               initial.push(this.state.components[i].minMaxValues[2].value)
               initial.push(String(Number(this.state.components[i].minMaxValues[2].value) + 1))
               initial.push(this.state.components[i].minMaxValues[1].value)
               initial.push(this.state.components[i].minMaxValues[3].value)
               break
            case GeneratorLineSelectValues.YESNO:
               initial.push(this.state.components[i].yesNoInitial)
               break
         }
         opts.push({
            name: this.state.components[i].componentNameInput.value,
            type: type,
            initial: initial,
            instances: type === GeneratorLineSelectValues.CATEGORY ? 1 : Math.max(1, Number(this.state.components[i].componentInstancesInput.value))
         })
      }
      for (let i = 0; i < this.state.results.length; i++) {
         results.push({
            name: this.state.results[i].componentNameInput.value,
            type: this.state.results[i].componentTypeSelect,
            initial: [],
            instances: Math.max(1, Number(this.state.results[i].componentInstancesInput.value))
         })
      }
      this.setState({ generated: GeneratorTemplate.generate(this.state.appName.componentNameInput.value, this.state.appName.randomizeColors === GeneratorLineSelectValues.YES, results, opts) })
   }

   //#endregion
   //==================================================================================================================================
   //#region === render

   render() {
      let components = []
      for (let i = 0; i < this.state.components.length; i++) {
         components.push(<GeneratorLine key={i} {...this.state.components[i]} />)
      }
      let results = []
      for (let i = 0; i < this.state.results.length; i++) {
         results.push(<GeneratorLine key={i} {...this.state.results[i]} />)
      }

      let finalizeFunction: () => void = () => { }
      let finalizeLabel: string = this.language.generate
      let finalizeColor: NiceButtonColors = NiceButtonColors.GREEN
      if (this.state.totalErrors) {
         finalizeLabel = `${this.state.totalErrors} error(s)`
         finalizeColor = NiceButtonColors.RED
      } else {
         finalizeFunction = () => this.generate()
      }

      let generatedOutput: JSX.Element | null = null
      if (this.state.generated) {
         generatedOutput = <textarea className='genArea' value={this.state.generated} autoFocus={true}></textarea>
      }

      let buttons: NiceButtonProps[] = []
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.ADD_ONE,
         label: 'option',
         function: () => this.add(GeneratorLineType.COMPONENT, false)
      })
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.ADD_MANY,
         label: 'options',
         function: () => this.add(GeneratorLineType.COMPONENT, true)
      })
      buttons.push({
         color: NiceButtonColors.BLUE,
         icon: NiceButtonIcons.ADD_ONE,
         label: 'result',
         function: () => this.add(GeneratorLineType.RESULT, false)
      })
      buttons.push({
         color: NiceButtonColors.BLUE,
         icon: NiceButtonIcons.ADD_MANY,
         label: 'results',
         function: () => this.add(GeneratorLineType.RESULT, true)
      })
      buttons.push({
         color: finalizeColor,
         icon: NiceButtonIcons.GENERATE,
         label: finalizeLabel,
         function: finalizeFunction
      })
      buttons.push({
         color: NiceButtonColors.RED,
         icon: NiceButtonIcons.HOME,
         label: 'Home',
         function: this.props.onClickHome
      })

      return (
         <>
            <div className='d-none d-md-block'>
               <form spellCheck={false} autoComplete='off'>
                  <Line {...this.shortCategory('General')} />
                  <GeneratorLine {...this.state.appName} />
                  <Line {...this.shortCategory('Options')} />
                  {components}
                  <Line {...this.shortCategory('Results', this.state.resultsError, true, this.state.resultsError !== '')} />
                  {results}
                  <div className='row no-gutters justify-content-center'>
                     <div className='col-xs-10 col-lg-10 col-xl-6 px-3'>
                        {generatedOutput}
                     </div>
                  </div>
                  <ButtonPanel buttons={buttons} />
               </form>
            </div>
            <div className='d-block d-md-none genTooSmall'>
               <p>This page is optimized to only be used at certain screen width.
                  The author doubts that any device with a smaller screen would be suitable for the purposes of writing code and thus did not feel the need to spend time creating
                  a fully responsive layout for it. Any comments to the contrary will be welcome at the&nbsp
                   <a href="https://github.com/artur-szpot/game-randomizer">project's GitHub page</a>.</p>
            </div>
         </>
      )
   }

   //#endregion
   //==================================================================================================================================
   //#region === helper ported over from Game

   assure_is_array(input: string | string[] | null) {
      if (input === null) {
         return []
      } else if (!Array.isArray(input)) {
         return [input]
      } else {
         return input
      }
   }

   shortCategory(text: string, subtext: string | string[] | null = null, visible: boolean = true, error: boolean = false): LineProps {
      let actualSubtext: string[]
      if (subtext === null) {
         actualSubtext = []
      } else if (!Array.isArray(subtext)) {
         actualSubtext = [subtext]
      } else {
         actualSubtext = subtext
      }
      return this.createCategory(
         text.split(' ')[0],
         text,
         actualSubtext,
         error,
         false,
         visible
      )
   }

   shortResult(text: string, subtext: string | string[], visible: boolean = true): LineProps {
      let actualSubtext: string[]
      if (!Array.isArray(subtext)) {
         actualSubtext = [subtext]
      } else {
         actualSubtext = subtext
      }
      return this.createCategory(
         text.split(' ')[0],
         text,
         actualSubtext,
         false,
         true,
         visible
      )
   }

   createCategory(name: string, title: string, text: string[], error: boolean, result: boolean, visible: boolean): LineProps {
      let insideProps: CategoryProps = {
         name: name,
         index: -1,
         title: title,
         text: text,
         text_category: [],
         tag_color: [],
         error: error,
         result: result,
         colors: [],
         hiddenMessage: '',
         unhideFunction: () => null
      }
      return this.createSingleLine(visible, insideProps)
   }

   createSingleLine(visible: boolean, insideProps: ComponentProps): LineProps {
      return {
         visible: visible,
         title: null,
         lineType: LineTypes.CATEGORY,
         insideProps: insideProps
      }
   }

   //#endregion
   //==================================================================================================================================
}

export default Generator