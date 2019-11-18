import React from 'react';
import General from '../general/General';
import { LineProps, LineTypes, ComponentProps, CategoryProps } from '../components/Line';
import { TextProps } from '../components/text/Text';
import { MultiStateProps, MultiStateState, MultiStateLanguage } from '../components/multiState/MultiState';
import { PlusMinus, PlusMinusProps, PlusMinusState, PlusMinusLanguage, MinMaxCurrent } from '../components/plusMinus/PlusMinus';
import { YesNoProps, YesNoState, YesNoLanguage } from '../components/yesNo/YesNo';
import { NiceButtonProps, ButtonPanel, NiceButtonIcons, NiceButtonColors } from '../components/buttonPanel/ButtonPanel';

interface GameCommonLanguage {
   labels: { [key: string]: string[] };
}

export interface ComponentLanguage { title: string; };
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
   showResults: boolean;
   yesno: { [key: string]: YesNoState[] };
   plusminus: { [key: string]: PlusMinusState[] };
   multistate: { [key: string]: MultiStateState[] };
}
interface GameStateLanguage {
   categories: { [key: string]: string };
   yesno: { [key: string]: YesNoLanguage[] };
   plusminus: { [key: string]: PlusMinusLanguage[] };
   multistate: { [key: string]: MultiStateLanguage[] };
   results: { [key: string]: string[] };
   specifics: { [key: string]: string };
   specificArrays: { [key: string]: string[] };
}

/** Props passed on to the app from AppBody. */
export interface GameProps {
   language: GamePropsLanguage;
   onClickHome: () => void;
}
export interface GamePropsLanguage {
   name: string;
   abbr: string;
   rnd: string;
   title: string;
}



export class Game extends React.Component<GameProps, GameState> {
   //==================================================================================================================================
   //#region === initialization

   // language 
   currentLanguage: GamePropsLanguage = this.props.language;
   language: GameStateLanguage = {
      categories: {},
      yesno: {},
      plusminus: {},
      multistate: {},
      results: {},
      specifics: {},
      specificArrays: {},
   };
   commonLanguage: GameCommonLanguage = {
      labels: {},
   };

   // line constructor
   first: boolean = true;

   // functions for components

   functions = {
      onClickYesNo: (name: string, index: number) => this.handleYesNoClick(name, index),
      onClickMulti: {
         mainClick: (name: string, index: number, change: number) => this.handleMultiClick(name, index, change),
         subClick: (name: string, index: number, subIndex: number) => this.handleMultiSubClick(name, index, subIndex),
         listClick: (name: string, index: number) => this.handleMultiListClick(name, index),
      },
      onClickPlusMinus: (name: string, index: number, change: number) => this.handlePlusMinusClick(name, index, change),

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
   //#region === component value access

   yesNoValue(name: string, index: number = 0): boolean {
      if (!this.state.yesno.hasOwnProperty(name) || this.state.yesno[name].length <= index) {
         alert(`yesNoValue called for non-existent entry ${name}[${index}]`);
      }
      return this.state.yesno[name][index].yes;
   }

   plusMinusValue(name: string, index: number = 0): MinMaxCurrent {
      if (!this.state.plusminus.hasOwnProperty(name) || this.state.plusminus[name].length <= index) {
         alert(`plusMinusValue called for non-existent entry ${name}[${index}]`);
      }
      return this.state.plusminus[name][index].minMaxCurr;
   }

   multiStateValue(name: string, index: number = 0): MultiStateState {
      if (!this.state.multistate.hasOwnProperty(name) || this.state.multistate[name].length <= index) {
         alert(`multiStateValue called for non-existent entry ${name}[${index}]`);
      }
      return this.state.multistate[name][index];
   }

   //#endregion
   //==================================================================================================================================
   //#region === handlers

   handleYesNoClick(varName: string, index: number) {
      if (!this.state.yesno.hasOwnProperty(varName)) {
         alert("handleYesNoClick called for unsupported varName: " + varName);
         return;
      }
      let newState: GameState = Object.assign({}, this.state);
      const yesNoState = this.state.yesno[varName][index];
      newState.yesno[varName][index].yes = !yesNoState.yes;

      if (yesNoState.behaviors !== undefined) {
         for (let i = 0; i < yesNoState.behaviors.length; i++) {
            let target: ComponentState | null = null;
            switch (yesNoState.behaviors[i].type) {
               case ComponentBehaviors.HIDELIST:
                  target = newState.multistate[yesNoState.behaviors[i].target][yesNoState.behaviors[i].index];
                  break;
               default:
                  alert(`unhandled behavior ascribed to YesNo: ${yesNoState.behaviors[i].type}`)
                  break;
            }
            switch (yesNoState.behaviors[i].type) {
               case ComponentBehaviors.HIDELIST:
                  (target as MultiStateState).showList = false;
                  break;
               default:
                  alert(`unhandled behavior ascribed to YesNo: ${yesNoState.behaviors[i].type}`)
                  break;
            }
         }
      }

      this.setState(newState);
   }

   handleMultiClick(varName: string, index: number, change: number) {
      if (!this.state.multistate.hasOwnProperty(varName)) {
         alert("handleMultiClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      const multistateState = this.state.multistate[varName][index];
      newState.multistate[varName][index].current = General.validateNewChosen(multistateState.current, change, this.language.multistate[varName][index].contents.length);
      if (multistateState.behaviors !== undefined) {
         for (let i = 0; i < multistateState.behaviors.length; i++) {
            // let target: ComponentState | null = null;
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break;
            }
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break;
            }
         }
      }
      this.setState(newState);
   }

   handleMultiSubClick(varName: string, index: number, subIndex: number) {
      if (!this.state.multistate.hasOwnProperty(varName)) {
         alert("handleMultiSubClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      const multistateState = this.state.multistate[varName][index];
      newState.multistate[varName][index] = { current: subIndex, showList: false };
      if (multistateState.behaviors !== undefined) {
         for (let i = 0; i < multistateState.behaviors.length; i++) {
            // let target: ComponentState | null = null;
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break;
            }
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break;
            }
         }
      }
      this.setState(newState);
   }

   handleMultiListClick(varName: string, index: number) {
      if (!this.state.multistate.hasOwnProperty(varName)) {
         alert("handleMultiListClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      const multistateState = this.state.multistate[varName][index];
      newState.multistate[varName][index].showList = !multistateState.showList;
      if (multistateState.behaviors !== undefined) {
         for (let i = 0; i < multistateState.behaviors.length; i++) {
            // let target: ComponentState | null = null;
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break;
            }
            switch (multistateState.behaviors[i].type) {
               default:
                  alert(`unhandled behavior ascribed to MultiState: ${multistateState.behaviors[i].type}`)
                  break;
            }
         }
      }
      this.setState(newState);
   }

   handlePlusMinusClick(varName: string, index: number, change: number) {
      if (!this.state.plusminus.hasOwnProperty(varName)) {
         alert("handlePlusMinusClick called for unsupported varName: " + varName);
         return;
      }
      let newState = Object.assign({}, this.state);
      const plusminusState = this.state.plusminus[varName][index];
      if (PlusMinus.validateMinMaxCurr(plusminusState.minMaxCurr, change)) {
         let newValue = { ...plusminusState.minMaxCurr };
         newValue.current += change;
         newState.plusminus[varName][index].minMaxCurr = newValue;
         if (plusminusState.behaviors !== undefined) {
            for (let i = 0; i < plusminusState.behaviors.length; i++) {
               let target: ComponentState | null = null;
               switch (plusminusState.behaviors[i].type) {
                  case ComponentBehaviors.MINMAX_MIN:
                  case ComponentBehaviors.MINMAX_MAX:
                     target = newState.plusminus[plusminusState.behaviors[i].target][plusminusState.behaviors[i].index];
                     break;
                  default:
                     alert(`unhandled behavior ascribed to PlusMinus: ${plusminusState.behaviors[i].type}`)
                     break;
               }
               switch (plusminusState.behaviors[i].type) {
                  case ComponentBehaviors.MINMAX_MIN:
                     (target as PlusMinusState).minMaxCurr.min = newValue.current + 1;
                     break;
                  case ComponentBehaviors.MINMAX_MAX:
                     (target as PlusMinusState).minMaxCurr.max = newValue.current - 1;
                     break;
                  default:
                     alert(`unhandled behavior ascribed to PlusMinus: ${plusminusState.behaviors[i].type}`)
                     break;
               }
            }
         }
      } else { return; }
      this.setState(newState);
   }

   //#endregion
   //==================================================================================================================================
   //#region === render

   setLanguage(): void { }

   setCommonLanguage(): void {
      switch (this.props.language.name) {
         case 'Polski':
            this.commonLanguage.labels = {
               randomize: ['Losuj'],
               rerandomize: ['Losuj ponownie'],
               home: ['Powrót do menu'],
               options: ['Zmień opcje'],
               yesNo: ['TAK', 'NIE'],
            }
            break;

         case 'English':
         default:
            this.commonLanguage.labels = {
               randomize: ['Randomize'],
               rerandomize: ['Randomize again'],
               home: ['Home'],
               options: ['Back to options'],
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
         index: -1,
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

   createResultsButtons() {
      let buttons: NiceButtonProps[] = [];
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.RERANDOMIZE,
         label: this.commonLanguage.labels.rerandomize[0],
         function: this.functions.onClickRandomize
      });
      buttons.push({
         color: NiceButtonColors.BLUE,
         icon: NiceButtonIcons.OPTIONS,
         label: this.commonLanguage.labels.options[0],
         function: this.functions.onClickOptions
      });
      buttons.push({
         color: NiceButtonColors.RED,
         icon: NiceButtonIcons.HOME,
         label: this.commonLanguage.labels.home[0],
         function: this.props.onClickHome
      });

      return (
         <ButtonPanel buttons={buttons} />
      );
   }

   createOptionsButtons() {
      let buttons: NiceButtonProps[] = [];
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.RANDOMIZE,
         label: this.commonLanguage.labels.randomize[0],
         function: this.functions.onClickRandomize
      });
      buttons.push({
         color: NiceButtonColors.RED,
         icon: NiceButtonIcons.HOME,
         label: this.commonLanguage.labels.home[0],
         function: this.props.onClickHome
      });

      return (
         <ButtonPanel buttons={buttons} />
      );
   }

   createResultsOnlyButtons() {
      let buttons: NiceButtonProps[] = [];
      buttons.push({
         color: NiceButtonColors.GREEN,
         icon: NiceButtonIcons.RERANDOMIZE,
         label: this.commonLanguage.labels.rerandomize[0],
         function: this.functions.onClickRandomize
      });
      buttons.push({
         color: NiceButtonColors.RED,
         icon: NiceButtonIcons.HOME,
         label: this.commonLanguage.labels.home[0],
         function: this.props.onClickHome
      });

      return (
         <ButtonPanel buttons={buttons} />
      );
   }

   //#endregion
   //================================================================
   //#region === category

   shortCategory(text: string, subtext: string | string[] | null = null, visible: boolean = true, error: boolean = false): LineProps {
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
         0,
         text,
         actualSubtext,
         error,
         false,
         visible
      );
   }

   shortResult(text: string, subtext: string | string[], visible: boolean = true): LineProps {
      this.first = true;
      let actualSubtext: string[];
      if (!Array.isArray(subtext)) {
         actualSubtext = [subtext];
      } else {
         actualSubtext = subtext;
      }
      return this.createCategory(
         text.split(' ')[0],
         0,
         text,
         actualSubtext,
         false,
         true,
         visible
      );
   }

   createCategory(name: string, index: number, text: string, subtext: string[], error: boolean, result: boolean, visible: boolean): LineProps {
      let insideProps: CategoryProps = {
         name: name,
         index: -1,
         text: text,
         subtext: subtext,
         error: error,
         result: result,
      };
      return this.createSingleLine(visible, LineTypes.CATEGORY, insideProps);
   }

   //#endregion
   //================================================================
   //#region === multiState

   shortMultiStateArray(name: string, visible: boolean = true) {
      return this.state.multistate[name].map((e, index) => this.createMultiState(
         this.language.multistate[name][index].title,
         name,
         index,
         e.showList,
         this.language.multistate[name][index].contents,
         e.current,
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
         visible,
         this.checkFirst()
      );
   }

   createMultiState(title: string, name: string, index: number, showList: boolean, states: string[], currentState: number, visible: boolean, first: boolean): LineProps {
      let insideProps: MultiStateProps = {
         name: name,
         index: index,
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

   shortPlusMinusArray(name: string, visible: boolean = true) {
      return this.state.plusminus[name].map((e, index) => this.createPlusMinus(
         this.language.plusminus[name][index].title,
         name,
         index,
         this.state.plusminus[name][index].minMaxCurr,
         visible,
         this.checkFirst()
      ));
   }

   shortPlusMinus(name: string, visible: boolean = true) {
      return this.createPlusMinus(
         this.language.plusminus[name][0].title,
         name,
         0,
         this.state.plusminus[name][0].minMaxCurr,
         visible,
         this.checkFirst()
      );
   }

   createPlusMinus(title: string, name: string, index: number, minMaxCurr: MinMaxCurrent, visible: boolean, first: boolean): LineProps {
      let insideProps: PlusMinusProps = {
         name: name,
         index: index,
         onClick: this.functions.onClickPlusMinus,
         minMaxCurr: minMaxCurr,
      };
      return this.createDoubleLine(title, visible, first, LineTypes.PLUSMINUS, insideProps);
   }

   //#endregion
   //================================================================
   //#region === yesNo

   shortYesNoArray(name: string, visible: boolean = true): LineProps[] {
      return this.state.yesno[name].map((e, index) => this.createYesNo(
         this.language.yesno[name][index].title,
         this.commonLanguage.labels.yesNo,
         name,
         index,
         this.state.yesno[name][index].yes,
         visible,
         this.checkFirst()
      ));
   }

   shortYesNo(name: string, visible: boolean = true): LineProps {
      return this.createYesNo(
         this.language.yesno[name][0].title,
         this.commonLanguage.labels.yesNo,
         name,
         0,
         this.state.yesno[name][0].yes,
         visible,
         this.checkFirst()
      );
   }

   createYesNo(title: string, display: string[], name: string, index: number, yes: boolean, visible: boolean, first: boolean): LineProps {
      let insideProps: YesNoProps = {
         name: name,
         index: index,
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