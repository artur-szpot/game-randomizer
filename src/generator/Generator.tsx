import React from 'react';
import { GeneratorLine, GeneratorLineProps, GeneratorLineType, GeneratorLineSelectValues } from './GeneratorLine';
import { GeneratedElement, GeneratorTemplate } from './GeneratorTemplate';
import Line from '../line/Line';

interface Props {
}
interface State {
   appName: GeneratorLineProps;
   components: GeneratorLineProps[];
   results: GeneratorLineProps[];
   resultsError: string;
   totalErrors: number;
   generated: string;
}

class Generator extends React.Component<Props, State> {
   language = {
      generate: 'Generate',
      add: 'Add new line'
   }

   constructor(props: Props) {
      super(props);
      this.state = this.validateState({
         appName: {
            index: 0,
            component: GeneratorLineType.APPNAME,
            select: GeneratorLineSelectValues.APPNAME,
            input: '',
            handleSelect: (component: GeneratorLineType, index: number, value: GeneratorLineSelectValues) => this.handleSelect(component, index, value),
            handleInput: (component: GeneratorLineType, index: number, value: string) => this.handleInput(component, index, value),
            moveClick: (component: GeneratorLineType, index: number, direction: number) => this.move(component, index, direction),
            deleteClick: (component: GeneratorLineType, index: number) => this.delete(component, index),
         },
         components: [],
         results: [],
         resultsError: '',
         totalErrors: 0,
         generated: '',
      });
   }

   handleSelect(component: GeneratorLineType, index: number, value: GeneratorLineSelectValues): void {
      let newLines: GeneratorLineProps[];
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components];
      } else {
         newLines = [...this.state.results];
      }
      newLines[index].select = value;
      let newState;
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines });
      } else {
         newState = Object.assign({}, this.state, { results: newLines });
      }
      this.setState(newState, this.validate);
   }

   handleInput(component: GeneratorLineType, index: number, value: string): void {
      if (component === GeneratorLineType.APPNAME) {
         let newAppName = { ...this.state.appName };
         newAppName.input = value;
         let newState = Object.assign({}, this.state, { appName: newAppName });
         this.setState(newState, this.validate);
         return;
      }

      let newLines: GeneratorLineProps[];
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components];
      } else {
         newLines = [...this.state.results];
      }
      newLines[index].input = value;
      let newState;
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines });
      } else {
         newState = Object.assign({}, this.state, { results: newLines });
      }
      this.setState(newState, this.validate);
   }

   move(component: GeneratorLineType, index: number, direction: number): void {
      let newLines: GeneratorLineProps[];
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components];
      } else {
         newLines = [...this.state.results];
      }
      let tempSelect = newLines[index].select;
      let tempInput = newLines[index].input;
      newLines[index].select = newLines[index + direction].select;
      newLines[index].input = newLines[index + direction].input;
      newLines[index + direction].select = tempSelect;
      newLines[index + direction].input = tempInput;
      let newState;
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines });
      } else {
         newState = Object.assign({}, this.state, { results: newLines });
      }
      this.setState(newState, this.validate);
   }

   delete(component: GeneratorLineType, index: number): void {
      let newLines: GeneratorLineProps[];
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components];
      } else {
         newLines = [...this.state.results];
      }
      newLines.splice(index, 1);
      if (newLines.length > 0) {
         for (let i = index; i < newLines.length; i++) {
            newLines[i].index = i;
         }
         if (index === 0) {
            newLines[0].first = true;
         }
         if (index === newLines.length) {
            newLines[newLines.length - 1].last = true;
         }
      }
      let newState;
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines });
      } else {
         newState = Object.assign({}, this.state, { results: newLines });
      }
      this.setState(newState, this.validate);
   }

   add(component: GeneratorLineType): void {
      let newLines: GeneratorLineProps[];
      if (component === GeneratorLineType.COMPONENT) {
         newLines = [...this.state.components];
      } else {
         newLines = [...this.state.results];
      }
      if (newLines.length > 0) {
         newLines[newLines.length - 1].last = false;
      }
      let newLine: GeneratorLineProps = {
         index: newLines.length,
         first: newLines.length === 0,
         last: true,
         component: component,
         handleSelect: (component: GeneratorLineType, index: number, value: GeneratorLineSelectValues) => this.handleSelect(component, index, value),
         handleInput: (component: GeneratorLineType, index: number, value: string) => this.handleInput(component, index, value),
         select: component === GeneratorLineType.COMPONENT ? GeneratorLineSelectValues.YESNO : GeneratorLineSelectValues.NUMBER,
         input: '',
         moveClick: (component: GeneratorLineType, index: number, direction: number) => this.move(component, index, direction),
         deleteClick: (component: GeneratorLineType, index: number) => this.delete(component, index),
      }
      newLines.push(newLine);
      let newState;
      if (component === GeneratorLineType.COMPONENT) {
         newState = Object.assign({}, this.state, { components: newLines });
      } else {
         newState = Object.assign({}, this.state, { results: newLines });
      }
      this.setState(newState, this.validate);
   }

   validate() {
      this.setState(this.validateState(this.state));
   }

   validateState(currentState: State): State {
      let newState = { ...currentState };
      newState = this.validateAppName(newState);
      newState = this.validateComponents(newState);
      newState = this.validateResults(newState);
      newState.totalErrors = 0;
      if (newState.appName.error) {
         newState.totalErrors++;
      }
      for (let i = 0; i < newState.components.length; i++) {
         if (newState.components[i].error) {
            newState.totalErrors++;
         }
      }
      if (newState.results.length === 0) {
         newState.resultsError = 'The app has to return at least one result.'
         newState.totalErrors++;
      } else {
         newState.resultsError = '';
      }
      for (let i = 0; i < newState.results.length; i++) {
         if (newState.results[i].error) {
            newState.totalErrors++;
         }
      }
      return newState;
   }

   validateAppName(newState: State) {
      let input: string = newState.appName.input;
      let failMessage: string | undefined = undefined;
      while (true) {
         if (input.length < 3) {
            failMessage = 'All names have to consist of at least 3 characters.';
            break;
         }

         let regex = /[A-Z][a-zA-Z0-9]*/.exec(input);
         if (regex === null || regex[0] != input) {
            failMessage = 'App name must begin with a capital letter and contain only letters and numbers.';
            break;
         }
         break;
      }
      newState.appName.error = failMessage;
      return newState;
   }

   validateComponents(newState: State) {
      let emptyCategory: boolean = false;
      let allNames: string[] = [];
      for (let i = 0; i < newState.components.length; i++) {
         let input: string = newState.components[i].input;
         let select: string = newState.components[i].select;
         let failMessage: string | undefined = undefined;
         while (true) {
            if (allNames.indexOf(input) != -1) {
               failMessage = 'Components\' names must be unique.';
               break;
            }
            if (input) {
               allNames.push(input);
            }

            if (select == 'category') {
               if (emptyCategory) {
                  failMessage = 'The first component after a category may not be another category.';
                  break;
               } else if (i === newState.components.length - 1) {
                  failMessage = 'A category may not be empty.';
                  break;
               }
               emptyCategory = true;
            } else {
               emptyCategory = false;
            }

            if (input.length < 3) {
               failMessage = 'All names have to consist of at least 3 characters.';
               break;
            }

            let regex = /[a-z][a-zA-Z0-9]*/.exec(input);
            if (regex === null || regex[0] != input) {
               failMessage = 'Components\' names must begin with a small letter and contain only letters and numbers.';
               break;
            }
            break;
         }
         newState.components[i].error = failMessage;
      }
      return newState;
   }

   validateResults(newState: State) {
      let allNames: string[] = [];
      for (let i = 0; i < newState.results.length; i++) {
         let input: string = newState.results[i].input;
         let failMessage: string | undefined = undefined;
         while (true) {
            if (allNames.indexOf(input) != -1) {
               failMessage = 'Results\' names must be unique.';
               break;
            }
            if (input) {
               allNames.push(input);
            }

            if (input.length < 3) {
               failMessage = 'All names have to consist of at least 3 characters.';
               break;
            }

            let regex = /[a-z][a-zA-Z0-9]*/.exec(input);
            if (regex === null || regex[0] != input) {
               failMessage = 'Results\' names must begin with a small letter and contain only letters and numbers.';
               break;
            }
            break;
         }
         newState.results[i].error = failMessage;
      }
      return newState;
   }

   generate() {
      if (this.state.totalErrors) {
         return;
      }
      let opts: GeneratedElement[] = [];
      let results: GeneratedElement[] = [];
      for (let i = 0; i < this.state.components.length; i++) {
         opts.push({
            name: this.state.components[i].input,
            type: this.state.components[i].select
         });
      }
      for (let i = 0; i < this.state.results.length; i++) {
         results.push({
            name: this.state.results[i].input,
            type: this.state.results[i].select
         });
      }
      this.setState({ generated: GeneratorTemplate.generate(this.state.appName.input, results, opts) });
   }

   render() {
      let components = [];
      for (let i = 0; i < this.state.components.length; i++) {
         components.push(<GeneratorLine key={i} {...this.state.components[i]} />);
      }
      let results = [];
      for (let i = 0; i < this.state.results.length; i++) {
         results.push(<GeneratorLine key={i} {...this.state.results[i]} />);
      }

      let finalButton: JSX.Element | null = null;
      if (this.state.totalErrors) {
         finalButton = <button className='anyButton bigButton genBigButton red'>{`Correct ${this.state.totalErrors} error(s) before generating.`}</button>;
      } else {
         finalButton = <button className='anyButton bigButton genBigButton green' onClick={() => this.generate()}>{this.language.generate}</button>;
      }

      let generatedOutput: JSX.Element | null = null;
      if (this.state.generated) {
         generatedOutput = <textarea className='genArea'>{this.state.generated}</textarea>
      }

      return (
         <>
            <Line lineType='Category' text='General' visible={true} />
            <GeneratorLine {...this.state.appName} />
            <Line lineType='Category' text='Components' visible={true} />
            {components}
            <div className='row no-gutters justify-content-center'>
               <div className='col-xs-10 col-lg-10 col-xl-6 px-3'>
                  <button className='anyButton bigButton genBigButton blue' onClick={() => this.add(GeneratorLineType.COMPONENT)}>Add component</button>
               </div>
            </div>
            <Line lineType='Category' text='Results' subtext={this.state.resultsError} error={this.state.resultsError != ''} visible={true} />
            {results}
            <div className='row no-gutters justify-content-center'>
               <div className='col-xs-10 col-lg-10 col-xl-6 px-3'>
                  <button className='anyButton bigButton genBigButton blue' onClick={() => this.add(GeneratorLineType.RESULT)}>Add result</button>
               </div>
            </div>
            <div className='row no-gutters justify-content-center'>
               <div className='col-xs-10 col-lg-10 col-xl-6 px-3'>
                  {finalButton}
               </div>
            </div>
            <div className='row no-gutters justify-content-center'>
               <div className='col-xs-10 col-lg-10 col-xl-6 px-3'>
                  {generatedOutput}
               </div>
            </div>
         </>
      );
   }
}

export default Generator;