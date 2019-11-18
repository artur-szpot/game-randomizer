import React, { ChangeEvent } from 'react';
import './Generator.css';

export enum GeneratorLineSelectValues {
   APPNAME = 'appname',
   // component types
   CATEGORY = 'category',
   YESNO = 'yesno',
   MULTISTATE = 'multistate',
   PLUSMINUS = 'plusminus',
   MINMAX = 'minmax',
   // result types
   STRING = 'string',
   STRINGARRAY = 'stringarray',
   NUMBER = 'number',
   NUMBERARRAY = 'numberarray',
   // yesNo initial state
   YES = 'true',
   NO = 'false',
}

export enum GeneratorLineType {
   APPNAME,
   COMPONENT,
   RESULT
}

export enum GeneratorLineFields {
   NAME,
   INDEX,
   CATEGORY_SUBTEXT,
   MULTISTATE_CURRENT,
   MULTISTATE_TOTAL,
   PLUSMINUS_MIN,
   PLUSMINUS_MAX,
   PLUSMINUS_CURRENT,
   MINMAX_MIN,
   MINMAX_MAX,
   MINMAX_MIN_CURRENT,
   MINMAX_MAX_CURRENT,
   // selects
   TYPE,
   YESNO_INITIAL,
}

export interface GeneratorLineInput {
   value: string;
   error: string;
}

export interface GeneratorLineProps {
   // type of the element
   component: GeneratorLineType;
   // index of the element to be passed to methods
   index: number;
   // text to display in the input box
   componentNameInput: GeneratorLineInput;
   // chosen option of the select box
   componentTypeSelect: GeneratorLineSelectValues;
   // total indices to be used
   componentInstancesInput: GeneratorLineInput;
   // additional properties of different components
   categorySubtext: GeneratorLineInput;
   yesNoInitial: GeneratorLineSelectValues;
   multiStateCurrent: GeneratorLineInput;
   multiStateTotal: GeneratorLineInput;
   plusMinusValues: GeneratorLineInput[];
   minMaxValues: GeneratorLineInput[];
   // whether this is the first element (thus, unable to go up)
   first: boolean;
   // whether this is the last element (thus, unable to go down)
   last: boolean;
   // function to handle change in select box
   handleSelect(component: GeneratorLineType, index: number, field: GeneratorLineFields, value: string): void;
   // function to handle change in input box
   handleInput(component: GeneratorLineType, index: number, field: GeneratorLineFields, value: string): void;
   // function to handle the element moving in the list
   moveClick(component: GeneratorLineType, index: number, direction: number): void;
   // function to handle the element getting deleted
   deleteClick(component: GeneratorLineType, index: number): void;
}

export class GeneratorLine extends React.Component<GeneratorLineProps> {
   constructor(props: GeneratorLineProps) {
      super(props);
      this.handleSelect = this.handleSelect.bind(this);
      this.handleInput = this.handleInput.bind(this);
   }

   handleSelect(event: ChangeEvent) {
      if (event.target !== null && event.target instanceof HTMLSelectElement) {
         let field: GeneratorLineFields
         switch (event.target.name) {
            case "type":
               field = GeneratorLineFields.TYPE;
               break;
            case "yesno_initial":
               field = GeneratorLineFields.YESNO_INITIAL;
               break;
            default:
               alert('handleSelect called for an unsopported field name: ' + event.target.name);
               return;
         }
         this.props.handleSelect(this.props.component, this.props.index, field, event.target.value);
      }
   }

   handleInput(event: ChangeEvent) {
      if (event.target !== null && event.target instanceof HTMLInputElement) {
         let field: GeneratorLineFields
         switch (event.target.name) {
            case "name":
               field = GeneratorLineFields.NAME;
               break;
            case "index":
               field = GeneratorLineFields.INDEX;
               break;
            case "category_subtext":
               field = GeneratorLineFields.CATEGORY_SUBTEXT;
               break;
            case "multistate_current":
               field = GeneratorLineFields.MULTISTATE_CURRENT;
               break;
            case "multistate_total":
               field = GeneratorLineFields.MULTISTATE_TOTAL;
               break;
            case "plusminus_min":
               field = GeneratorLineFields.PLUSMINUS_MIN;
               break;
            case "plusminus_max":
               field = GeneratorLineFields.PLUSMINUS_MAX;
               break;
            case "plusminus_curr":
               field = GeneratorLineFields.PLUSMINUS_CURRENT;
               break;
            case "minmax_min":
               field = GeneratorLineFields.MINMAX_MIN;
               break;
            case "minmax_max":
               field = GeneratorLineFields.MINMAX_MAX;
               break;
            case "minmax_min_current":
               field = GeneratorLineFields.MINMAX_MIN_CURRENT;
               break;
            case "minmax_max_current":
               field = GeneratorLineFields.MINMAX_MAX_CURRENT;
               break;
            default:
               alert('handleInput called for an unsopported field name: ' + event.target.name);
               return;
         }
         this.props.handleInput(this.props.component, this.props.index, field, event.target.value);
      }
   }

   plusminusInputDiv(input: GeneratorLineInput, label: string, name: string): JSX.Element {
      const errorClass = input.error ? ' genInputWrong' : ' genInputOK';
      const finalLabel = (input.error && input.error !== '`') ? input.error : label;
      return (
         <div className={'genInput genInputThird' + errorClass}>
            <input type='text' onChange={this.handleInput} value={input.value} name={name} />
            <div><p>{finalLabel}</p></div>
         </div>);
   }

   minmaxInputDiv(input: GeneratorLineInput, label: string, name: string): JSX.Element {
      const errorClass = input.error ? ' genInputWrong' : ' genInputOK';
      const finalLabel = (input.error && input.error !== '`') ? input.error : label;
      return (
         <div className={'genInput genInputFourth' + errorClass}>
            <input type='text' onChange={this.handleInput} value={input.value} name={name} />
            <div><p>{finalLabel}</p></div>
         </div>);
   }

   multistateInputDiv(total: boolean): JSX.Element {
      const state: GeneratorLineInput = total ? this.props.multiStateTotal : this.props.multiStateCurrent;
      const name: string = total ? 'multistate_total' : 'multistate_current';
      const divClass = state.error ? ' genInputWrong' : ' genInputOK';
      const normalLabel: string = total ? 'total options' : 'initial option';
      const label = (state.error && state.error !== '`') ? state.error : normalLabel;
      return (
         <div className={'genInput genInputHalf' + divClass}>
            <input type='text' onChange={this.handleInput} value={state.value} name={name} />
            <div><p>{label}</p></div>
         </div>);
   }

   render() {
      let rowDivClasses = 'col-12 col-lg-10 col-xl-6 genRow';
      let mainInputClasses = 'genInput genInputMain';
      let indexInputClasses = 'genInput genInputIndex ';
      let errorP = null;

      if (this.props.componentNameInput.error) {
         mainInputClasses += ' genInputWrong';
         errorP = <p>{this.props.componentNameInput.error}</p>;
      } else {
         mainInputClasses += ' genInputOK';
      }

      if (this.props.componentInstancesInput.value) {
         indexInputClasses += ' genInputOK';
      } else {
         indexInputClasses += ' genInputEmpty';
      }

      let select = null;

      switch (this.props.component) {
         case GeneratorLineType.APPNAME:
            select = <select className='genSelect'>
               <option value='appname'>AppName</option>
            </select>;
            indexInputClasses += ' invisible';
            break;
         case GeneratorLineType.COMPONENT:
            select = <select className='genSelect' onChange={this.handleSelect} value={this.props.componentTypeSelect} name='type'>
               <option value='category'>&#xe80e;&nbsp;&nbsp; Category</option>
               <option value='yesno'>&#xf205;&nbsp;&nbsp; YesNo</option>
               <option value='multistate'>&#xe80d;&nbsp;&nbsp; MultiState</option>
               <option value='plusminus'>&#xf292;&nbsp;&nbsp; PlusMinus</option>
               <option value='minmax'>&#xe80b;&nbsp;&nbsp; MinMax</option>
            </select>;
            break;
         case GeneratorLineType.RESULT:
            select = <select className='genSelect' onChange={this.handleSelect} value={this.props.componentTypeSelect} name='type'>
               <option value='number'>number</option>
               <option value='numberarray'>number[]</option>
               <option value='string'>string</option>
               <option value='stringarray'>string[]</option>
            </select>;
            break;
      }

      select = <div className='genSelectMain'>{select}</div>;

      let detailSection: JSX.Element | null = null;
      let upButton: JSX.Element | null = null;
      let downButton: JSX.Element | null = null;
      let deleteButton: JSX.Element | null = null;

      switch (this.props.componentTypeSelect) {
         case GeneratorLineSelectValues.CATEGORY:
            const categorySubtextDivClasses = 'genInput' + (this.props.categorySubtext.value ? ' genInputOK' : ' genInputEmpty');
            detailSection = (
               <>
                  <div className={categorySubtextDivClasses}>
                     <input type='text' onChange={this.handleInput} value={this.props.categorySubtext.value} name='category_subtext' />
                     <div>
                        <p>subtext</p>
                     </div>
                  </div>
               </>
            );
            break;
         case GeneratorLineSelectValues.YESNO:
            detailSection = (
               <>
                  <div className='genInput'>
                     <select className='genSelect' onChange={this.handleSelect} value={this.props.yesNoInitial} name='yesno_initial'>
                        <option value='true'>&#xe804;&nbsp;&nbsp; yes</option>
                        <option value='false'>&#xe80c;&nbsp;&nbsp; no</option>
                     </select>
                     <div><p>initial value</p></div>
                  </div>
               </>
            );
            break;
         case GeneratorLineSelectValues.MULTISTATE:
            detailSection = (
               <>
                  {this.multistateInputDiv(true)}
                  {this.multistateInputDiv(false)}
               </>
            );
            break;
         case GeneratorLineSelectValues.PLUSMINUS:
            detailSection = (
               <>
                  {this.plusminusInputDiv(this.props.plusMinusValues[0], 'min', 'plusminus_min')}
                  {this.plusminusInputDiv(this.props.plusMinusValues[1], 'max', 'plusminus_max')}
                  {this.plusminusInputDiv(this.props.plusMinusValues[2], 'current', 'plusminus_curr')}
               </>
            );
            break;
         case GeneratorLineSelectValues.MINMAX:
            detailSection = (
               <>
                  {this.minmaxInputDiv(this.props.minMaxValues[0], 'min', 'minmax_min')}
                  {this.minmaxInputDiv(this.props.minMaxValues[1], 'max', 'minmax_max')}
                  {this.minmaxInputDiv(this.props.minMaxValues[2], 'current min', 'minmax_min_current')}
                  {this.minmaxInputDiv(this.props.minMaxValues[3], 'current max', 'minmax_max_current')}
               </>
            );
            break;
      }

      if (this.props.component === GeneratorLineType.APPNAME || this.props.first) {
         upButton = <button type='button' className='genButton genButtonDisabled icon icon-generator icon-up-open'></button>;
      } else {
         upButton = <button type='button' className='genButton genButtonEnabled icon icon-generator icon-up-open' onClick={() => this.props.moveClick(this.props.component, this.props.index, -1)}></button>;
      }
      if (this.props.component === GeneratorLineType.APPNAME || this.props.last) {
         downButton = <button type='button' className='genButton genButtonDisabled icon icon-generator icon-down-open'></button>;
      } else {
         downButton = <button type='button' className='genButton genButtonEnabled icon icon-generator icon-down-open' onClick={() => this.props.moveClick(this.props.component, this.props.index, 1)}></button>;
      }
      if (this.props.component === GeneratorLineType.APPNAME) {
         deleteButton = <button type='button' className='genButton genButtonDisabled icon icon-generator icon-trash-empty'></button>
      } else {
         deleteButton = <button type='button' className='genButton genButtonEnabled icon icon-generator icon-trash-empty' onClick={() => this.props.deleteClick(this.props.component, this.props.index)}></button>
      }

      let details: JSX.Element | null = null;
      if (this.props.componentTypeSelect !== GeneratorLineSelectValues.APPNAME) {
         details = (<div className={rowDivClasses + ' genDetails'}>
            <div className='genDetailsMain'>
               {detailSection}
            </div>
            <div className='genDetailsButtons'>
               {deleteButton}
               {downButton}
               {upButton}
            </div>
         </div >);
      }

      return (
         <div className='genLine'>
            <div className='row no-gutters justify-content-center'>
               <div className={rowDivClasses}>
                  {select}
                  <div className={mainInputClasses}>
                     <input type='text' onChange={this.handleInput} value={this.props.componentNameInput.value} name='name' />
                     <div>
                        {errorP}
                     </div>
                  </div>
                  <div className={indexInputClasses}>
                     <input type='text' onChange={this.handleInput} value={this.props.componentInstancesInput.value} name='index' />
                     <div>
                        <p>[ ]</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className='row no-gutters justify-content-center'>
               {details}
            </div>
         </div>
      );
   }
}