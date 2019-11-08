import React, { ChangeEvent } from 'react';
import './Generator.css';

export enum GeneratorLineSelectValues {
   APPNAME = 'appname',
   // component types
   CATEGORY = 'category',
   YESNO = 'yesno',
   MULTISTATE = 'multistate',
   PLUSMINUS = 'plusminus',
   PLUSMINUSMINMAX = 'plusminusminmax',
   // result types
   STRING = 'string',
   STRINGARRAY = 'stringarray',
   NUMBER = 'number',
   NUMBERARRAY = 'numberarray'
}

export enum GeneratorLineType {
   APPNAME,
   COMPONENT,
   RESULT
}

export interface GeneratorLineProps {
   // type of the element
   component: GeneratorLineType;
   // index of the element
   index: number;
   // text to display in the input box
   input: string;
   // chosen option of the select box
   select: GeneratorLineSelectValues;
   // whether this is the first element (thus, unable to go up)
   first?: boolean;
   // whether this is the last element (thus, unable to go down)
   last?: boolean;
   // error message - indicates what is wrong with the contents
   error?: string;
   // function to handle change in select box
   handleSelect(component: GeneratorLineType, index: number, value: string): void;
   // function to handle change in input box
   handleInput(component: GeneratorLineType, index: number, value: string): void;
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
         this.props.handleSelect(this.props.component, this.props.index, event.target.value);
      }
   }

   handleInput(event: ChangeEvent) {
      if (event.target !== null && event.target instanceof HTMLInputElement) {
         this.props.handleInput(this.props.component, this.props.index, event.target.value);
      }
   }

   render() {
      let divClasses = 'col-xs-10 col-lg-10 col-xl-6 genDiv';

      if (this.props.error) {
         divClasses += ' genDivWrong';
      } else {
         divClasses += ' genDivOK';
      }

      let select = null;

      switch (this.props.component) {
         case GeneratorLineType.APPNAME:
            select = <select className='genSelect'>
               <option value='appname'>AppName</option>
            </select>;
            break;
         case GeneratorLineType.COMPONENT:
            select = <select className='genSelect' onChange={this.handleSelect} value={this.props.select}>
               <option value='category'>Category</option>
               <option value='yesno'>YesNo</option>
               <option value='multistate'>MultiState</option>
               <option value='plusminus'>PlusMinus</option>
               <option value='plusminusminmax'>PlusMinusMinMax</option>
            </select>;
            break;
         case GeneratorLineType.RESULT:
            select = <select className='genSelect' onChange={this.handleSelect} value={this.props.select}>
               <option value='number'>number</option>
               <option value='numberarray'>number[]</option>
               <option value='string'>string</option>
               <option value='stringarray'>string[]</option>
            </select>;
            break;
      }

      let upButton = null;
      let downButton = null;
      let deleteButton = null;

      if (this.props.component === GeneratorLineType.APPNAME || this.props.first) {
         upButton = <button className='genButton genButtonDisabled'>^</button>;
      } else {
         upButton = <button className='genButton genButtonEnabled' onClick={() => this.props.moveClick(this.props.component, this.props.index, -1)}>^</button>;
      }
      if (this.props.component === GeneratorLineType.APPNAME || this.props.last) {
         downButton = <button className='genButton genButtonDisabled'>v</button>;
      } else {
         downButton = <button className='genButton genButtonEnabled' onClick={() => this.props.moveClick(this.props.component, this.props.index, 1)}>v</button>;
      }
      if (this.props.component === GeneratorLineType.APPNAME) {
         deleteButton = <button className='genButton genButtonDisabled'>x</button>
      } else {
         deleteButton = <button className='genButton genButtonEnabled' onClick={() => this.props.deleteClick(this.props.component, this.props.index)}>x</button>
      }

      let errorP = null;

      if (this.props.error) {
         errorP = <div>
            <p className='genError'>{this.props.error}</p>
         </div>;
      }

      return (
         <div className='row no-gutters justify-content-center'>
            <div className={divClasses}>
               <div>
                  {select}
                  <input className='genInput' type='text' onChange={this.handleInput} value={this.props.input} />
                  {upButton}
                  {downButton}
                  {deleteButton}
               </div>
               {errorP}
            </div>
         </div>
      );
   }
}