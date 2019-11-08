import React from 'react';
import General from '../general/General';
import { Line, LineProps, LineTypes, ComponentProps, CategoryProps, BigButtonProps } from '../components/Line';
import { TextProps } from '../components/text/Text';
import { MultiStateProps } from '../components/multiState/MultiState';
import { PlusMinusProps } from '../components/plusMinus/PlusMinus';
import { YesNoProps } from '../components/yesNo/YesNo';

interface GameCommonLanguage {
   opts: { [key: string]: string };
   optArrays: { [key: string]: string[] };
}

interface GameStateLanguage {
   categories: { [key: string]: string };
   opts: { [key: string]: string };
   optArrays: { [key: string]: string[] };
   results: { [key: string]: string };
   specifics: { [key: string]: string };
   specificArrays: { [key: string]: string[] };
}

export interface GamePropsLanguage {
   name: string;
   abbr: string;
   rnd: string;
   title: string;
}

export interface GameProps {
   language: GamePropsLanguage;
   onClickHome: () => void;
}

export interface GameState {
   showResults: boolean;
   opts: { [key: string]: any };
}

export class Game extends React.Component<GameProps, GameState> {
   //==================================================================================================================================
   //#region === initialization

   // constructor(props: GameProps) {
   //    super(props);
   //    this.shortYesNo = this.shortYesNo.bind(this);
   // }

   // language 
   currentLanguage: GamePropsLanguage = this.props.language;
   language: GameStateLanguage = {
      categories: {},
      opts: {},
      optArrays: {},
      results: {},
      specifics: {},
      specificArrays: {},
   };
   commonLanguage: GameCommonLanguage = {
      opts: {},
      optArrays: {},
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

   setLanguage(): void { }

   setCommonLanguage(): void {
      switch (this.props.language.name) {
         case 'Polski':
            this.commonLanguage.opts = {
               randomize: 'Losuj',
               rerandomize: 'Losuj ponownie',
               home: 'Powrót do menu',
               options: 'Zmień opcje',
            }
            this.commonLanguage.optArrays = {
               yesNo: ['TAK', 'NIE'],
            }
            break;

         case 'English':
         default:
            this.commonLanguage.opts = {
               randomize: 'Randomize',
               rerandomize: 'Randomize again',
               home: 'Home',
               options: 'Back to options',
            };
            this.commonLanguage.optArrays = {
               yesNo: ['YES', 'NO'],
            }
            break;
      }
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
   //#region === general

   createDoubleLine(title: string, visible: boolean, first: boolean, lineType: LineTypes, insideProps: ComponentProps): LineProps {
      let titleProps: TextProps = {
         name: '',
         bold: true,
         hideSeparator: false,
         first: first,
         text: title
      };

      return {
         visible: visible,
         title: titleProps,
         lineType: lineType,
         insideProps: insideProps
      };
   }

   createSingleLine(visible: boolean, lineType: LineTypes, insideProps: ComponentProps): LineProps {
      return {
         visible: visible,
         title: null,
         lineType: lineType,
         insideProps: insideProps
      };
   }

   checkFirst(): boolean {
      let first: boolean = this.first;
      this.first = false;
      return first;
   }

   //#endregion
   //================================================================
   //#region === buttons

   createAllButtons() {
      return (
         <>
            <Line {...this.shortBigButton(this.commonLanguage.opts.rerandomize, 'green', this.functions.onClickRandomize, true, true)} />
            <Line {...this.shortBigButton(this.commonLanguage.opts.options, 'blue', this.functions.onClickOptions)} />
            <Line {...this.shortBigButton(this.commonLanguage.opts.home, 'red', this.props.onClickHome)} />
         </>
      );
   }

   createMainButtons() {
      return (
         <>
            <Line {...this.shortBigButton(this.commonLanguage.opts.randomize, 'green', this.functions.onClickRandomize, true, true)} />
            <Line {...this.shortBigButton(this.commonLanguage.opts.home, 'red', this.props.onClickHome)} />
         </>
      );
   }

   createResultOnlyButtons() {
      return (
         <>
            <Line {...this.shortBigButton(this.commonLanguage.opts.rerandomize, 'green', this.functions.onClickRandomize, true, true)} />
            <Line {...this.shortBigButton(this.commonLanguage.opts.home, 'red', this.props.onClickHome)} />
         </>
      );
   }

   shortBigButton(text: string, color: string, onClick: () => void, visible: boolean = true, first: boolean = false): LineProps {
      return this.createBigButton(
         text,
         color,
         onClick,
         visible,
         first
      );
   }

   createBigButton(text: string, color: string, onClick: () => void, visible: boolean, first: boolean): LineProps {
      let insideProps: BigButtonProps = {
         name: '',
         color: color,
         onClick: onClick,
         text: text,
         first: first
      };
      return this.createSingleLine(visible, LineTypes.BIGBUTTON, insideProps);
   }

   //#endregion
   //================================================================
   //#region === category

   shortCategory(text: string, subtext: string | string[] | null = null, list: boolean = false, visible: boolean = true): LineProps {
      this.first = true;
      let actualSubtext: string[];
      if (subtext === null) {
         actualSubtext = [];
      } else if (!Array.isArray(subtext)) {
         actualSubtext = [subtext];
      } else {
         actualSubtext = subtext;
      }
      return this.createCategory(
         text.split(' ')[0],
         text,
         actualSubtext,
         false,
         list,
         visible
      );
   }

   createCategory(name: string, text: string, subtext: string[], error: boolean, list: boolean, visible: boolean): LineProps {
      let insideProps: CategoryProps = {
         name: name,
         text: text,
         subtext: subtext,
         error: error,
         list: list,
      };
      return this.createSingleLine(visible, LineTypes.CATEGORY, insideProps);
   }

   //#endregion
   //================================================================
   //#region === multiState

   shortMultiState(name: string, visible: boolean = true) {
      return this.createMultiState(
         this.language.opts[name],
         name,
         this.state.opts[name + 'List'],
         this.language.optArrays[name + 's'],
         this.state.opts[name],
         visible,
         this.checkFirst()
      );
   }

   createMultiState(title: string, name: string, showList: boolean, states: string[], currentState: number, visible: boolean, first: boolean): LineProps {
      let insideProps: MultiStateProps = {
         name: name,
         onClick: this.functions.onClickMulti,
         showList: showList,
         states: states,
         currentState: currentState,
      };
      return this.createDoubleLine(title, visible, first, LineTypes.MULTISTATE, insideProps);
   }

   //#endregion
   //================================================================
   //#region === plusMinus

   shortPlusMinus(name: string, visible: boolean = true) {
      return this.createPlusMinus(
         this.language.opts[name],
         name,
         this.state.opts[name],
         visible,
         this.checkFirst()
      );
   }

   createPlusMinus(title: string, name: string, minMaxCurr: number[], visible: boolean, first: boolean): LineProps {
      let insideProps: PlusMinusProps = {
         name: name,
         onClick: this.functions.onClickPlusMinus,
         minMaxCurr: minMaxCurr,
      };
      return this.createDoubleLine(title, visible, first, LineTypes.PLUSMINUS, insideProps);
   }

   //#endregion
   //================================================================
   //#region === yesNo

   shortYesNo(name: string, visible: boolean = true) {
      return this.createYesNo(
         this.language.opts[name],
         this.commonLanguage.optArrays.yesNo,
         name,
         this.state.opts[name],
         visible,
         this.checkFirst()
      );
   }

   createYesNo(title: string, display: string[], name: string, yes: boolean, visible: boolean, first: boolean): LineProps {
      let insideProps: YesNoProps = {
         name: name,
         display: display,
         onClick: this.functions.onClickYesNo,
         yes: yes,
      };
      return this.createDoubleLine(title, visible, first, LineTypes.YESNO, insideProps);
   }

   //#endregion
   //================================================================
   //#endregion
   //==================================================================================================================================
}