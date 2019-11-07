import React from 'react';
import General from '../general/General';
import Line from '../line/Line';

interface StateLanguage {
   categories: { [key: string]: string };
   opts: { [key: string]: string };
   optArrays: { [key: string]: string[] };
   results: { [key: string]: string };
   yesNo: string[];
   specifics:{ [key: string]: string };
   specificArrays: { [key: string]: string[] };
}

export interface PropsLanguage {
   name: string;
   abbr: string;
   rnd: string;
   title: string;
}

export interface GameProps {
   language: PropsLanguage;
   onClickHome(): void;
}

export interface GameState {
   showResults: boolean;
   opts: { [key: string]: any };
}

export class Game extends React.Component<GameProps, GameState> {
   //==================================================================================================================================
   //#region === initialization

   constructor(props: GameProps) {
      super(props);
   }

   // language 
   currentLanguage: PropsLanguage = this.props.language;
   language: StateLanguage = { 
      categories: {},
      opts: {},
      optArrays: {},
      results: {},
      yesNo: [],
      specifics: {},
      specificArrays: {},
   };

   // line constructor
   first: boolean = true;

   // functions for components

   functions = {
      onClickYesNo: (name: string) => this.handleYesNoClick(name),
      onClickMulti: {
         mainClick: (name: string, change: number) => this.handleMultiClick(name, change),
         subClick: (name: string, index: number) => this.handleMultiSubClick(name, index),
         listClick: (name: string) => this.handleMultiListClick(name),
      },
      onClickPlusMinus: (name: string, change: number) => this.handlePlusMinusClick(name, change),

      // big buttons
      onClickRandomize: () => this.randomize(),
      onClickOptions: () => this.showOptions(),
   };

   /** To be overridden in every app. */
   randomize() {
      return;
   }

   //#endregion
   //==================================================================================================================================
   //#region === handlers

   handleYesNoClick(varName: string) {
      if (!this.state.opts.hasOwnProperty(varName)) {
         alert("handleYesNoClick called for unsupported varName: " + varName);
         return;
      }
      let newState: GameState = Object.assign({}, this.state);
      newState.opts[varName] = !this.state.opts[varName];
      newState = this.handleYesNoClickSpecial(newState, varName);
      this.setState(newState);
   }

   /** Handle special cases after normal processing of YesNoClick. */
   handleYesNoClickSpecial(newState: GameState, varName: string) {
      return newState;
   }

   handleMultiClick(varName: string, change: number) {
      if (!this.state.opts.hasOwnProperty(varName)) {
         alert("handleMultiClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      newState.opts[varName] = General.validateNewChosen(this.state.opts[varName], change, this.language.optArrays[varName + 's'].length);
      newState = this.handleMultiClickSpecial(newState, varName);
      this.setState(newState);
   }

   /** Handle special cases after normal processing of YesNoClick. */
   handleMultiClickSpecial(newState: GameState, varName: string) {
      return newState;
   }

   handleMultiSubClick(varName: string, value: number) {
      if (!this.state.opts.hasOwnProperty(varName)
         || !this.state.opts.hasOwnProperty(varName + 'List')) {
         alert("handleMultiSubClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      newState.opts[varName] = value;
      newState.opts[varName + 'List'] = false;
      newState = this.handleMultiSubClickSpecial(newState, varName, value);
      this.setState(newState);
   }

   /** Handle special cases after normal processing of YesNoClick. */
   handleMultiSubClickSpecial(newState: GameState, varName: string, value: number) {
      return newState;
   }

   handleMultiListClick(varName: string) {
      if (!this.state.opts.hasOwnProperty(varName + 'List')) {
         alert("handleMultiListClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      newState.opts[varName + 'List'] = !this.state.opts[varName + 'List'];
      newState = this.handleMultiListClickSpecial(newState, varName);
      this.setState(newState);
   }

   /** Handle special cases after normal processing of YesNoClick. */
   handleMultiListClickSpecial(newState: GameState, varName: string) {
      return newState;
   }

   handlePlusMinusClick(varName: string, change: number) {
      if (!this.state.opts.hasOwnProperty(varName)) {
         alert("handlePlusMinusClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      if (General.validateMinMaxCurr(this.state.opts[varName], change)) {
         let newValue = this.state.opts[varName].slice();
         newValue[2] += change;
         newState.opts[varName] = newValue;
         let subVarName = varName.substring(0, varName.length - 3);
         if (varName.endsWith('Min') && this.state.opts.hasOwnProperty(subVarName + 'Max')) {
            newState.opts[subVarName + 'Max'][0] = newValue[2] + 1;
         }
         else if (varName.endsWith('Max') && this.state.opts.hasOwnProperty(subVarName + 'Min')) {
            newState.opts[subVarName + 'Min'][1] = newValue[2] - 1;
         }
      } else { return; }
      newState = this.handlePlusMinusClickSpecial(newState, varName, change);
      this.setState(newState);
   }

   /** Handle special cases after normal processing of YesNoClick. */
   handlePlusMinusClickSpecial(newState: GameState, varName: string, change: number) {
      return newState;
   }

   //#endregion
   //==================================================================================================================================
   //#region === render

   setLanguage() {
      // overridden by every child
      return;
   }

   renderResults() {
      // overridden by every child
      return (<p>This must be overridden!</p>);
   }

   renderOptions() {
      // overridden by every child
      return (<p>This must be overridden!</p>);
   }

   render() {
      if (this.props.language !== this.currentLanguage) {
         this.setLanguage();
      }

      if (this.state.showResults) {
         return this.renderResults();
      } else {
         return this.renderOptions();
      }
   }

   showOptions() {
      let newState = Object.assign({}, this.state, { showResults: false });
      this.setState(newState);
   }

   //#endregion
   //==================================================================================================================================
   //#region === components
   //================================================================
   //#region === buttons

   createAllButtons() {
      return (
         <>
            <Line
               lineType='BigButton'
               text={this.language.opts.rerandomize}
               color='green'
               onClick={this.functions.onClickRandomize}
               first={true}
            />
            <Line
               lineType='BigButton'
               text={this.language.opts.options}
               color='blue'
               onClick={this.functions.onClickOptions}
            />
            <Line
               lineType='BigButton'
               text={this.language.opts.home}
               color='red'
               onClick={this.props.onClickHome}
            />
         </>
      );
   }

   createMainButtons() {
      return (
         <>
            <Line
               lineType='BigButton'
               text={this.language.opts.randomize}
               color='green'
               onClick={this.functions.onClickRandomize}
               first={true}
            />
            <Line
               lineType='BigButton'
               text={this.language.opts.home}
               color='red'
               onClick={this.props.onClickHome}
            />
         </>
      );
   }

   createResultOnlyButtons() {
      return (
         <>
            <Line
               lineType='BigButton'
               text={this.language.opts.rerandomize}
               color='green'
               onClick={this.functions.onClickRandomize}
               first={true}
            />
            <Line
               lineType='BigButton'
               text={this.language.opts.home}
               color='red'
               onClick={this.props.onClickHome}
            />
         </>
      );
   }

   //#endregion
   //================================================================
   //#region === category

   shortCategory(text: string, subtext: string | string[] = '', list: boolean = false, visible: boolean = true) {
      this.first = true;
      return this.createCategory(
         text,
         subtext,
         list,
         visible
      );
   }

   createCategory(text: string, subtext: string | string[], list: boolean, visible: boolean) {
      return (
         {
            lineType: 'Category',
            text: text,
            subtext: subtext,
            list: list,
            visible: visible,
         }
      );
   }

   //#endregion
   //================================================================
   //#region === multiState

   shortMultiState(name: string, visible: boolean = true) {
      let first = this.first;
      this.first = false;
      return this.createMultiState(
         this.language.opts[name],
         name,
         this.state.opts[name + 'List'],
         this.language.optArrays[name + 's'],
         this.state.opts[name],
         visible,
         first
      );
   }

   createMultiState(title: string, name: string, showList: boolean, states: string[], currentState: number, visible: boolean, first: boolean) {
      return (
         {
            lineType: 'MultiState',
            title: title,
            name: name,
            onClick: this.functions.onClickMulti,
            showList: showList,
            states: states,
            currentState: currentState,
            visible: visible,
            first: first
         }
      );
   }

   //#endregion
   //================================================================
   //#region === plusMinus

   shortPlusMinus(name: string, visible: boolean = true) {
      let first = this.first;
      this.first = false;
      return this.createPlusMinus(
         this.language.opts[name],
         name,
         this.state.opts[name],
         visible,
         first
      );
   }

   createPlusMinus(title: string, name: string, minMaxCurr: number[], visible: boolean, first: boolean) {
      return (
         {
            lineType: 'PlusMinus',
            title: title,
            name: name,
            onClick: this.functions.onClickPlusMinus,
            minMaxCurr: minMaxCurr,
            visible: visible,
            first: first
         }
      );
   }

   //#endregion
   //================================================================
   //#region === yesNo

   shortYesNo(name: string, visible: boolean = true) {
      let first = this.first;
      this.first = false;
      return this.createYesNo(
         this.language.opts[name],
         this.language.yesNo,
         name,
         this.state.opts[name],
         visible,
         first
      );
   }

   createYesNo(title: string, opts: string[], name: string, yesNo: boolean, visible: boolean, first: boolean) {
      return (
         {
            lineType: 'YesNo',
            title: title,
            opts: opts,
            name: name,
            onClick: this.functions.onClickYesNo,
            yesNo: yesNo,
            visible: visible,
            first: first
         }
      );
   }

   //#endregion
   //================================================================
   //#endregion
   //==================================================================================================================================
}