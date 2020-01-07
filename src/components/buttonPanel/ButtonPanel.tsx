import React from 'react';
import './ButtonPanel.css';

/**
 * A container with the navigtion/action buttons.
 */

export enum NiceButtonColors {
   RED,
   GREEN,
   BLUE
}

export enum NiceButtonIcons {
   RANDOMIZE,
   RERANDOMIZE,
   OPTIONS,
   HOME,
   ADD_ONE,
   ADD_MANY,
   GENERATE
}

export interface NiceButtonProps {
   color: NiceButtonColors;
   icon: NiceButtonIcons;
   label: string;
   function: () => void;
}

interface ButtonPanelProps {
   buttons: NiceButtonProps[];
}

export class ButtonPanel extends React.Component<ButtonPanelProps> {
   createButton(props: NiceButtonProps, width: number): JSX.Element {
      let color: string = '';
      let icon: string = '';
      switch (props.color) {
         case NiceButtonColors.BLUE:
            color = 'blue';
            break;
         case NiceButtonColors.RED:
            color = 'red';
            break;
         case NiceButtonColors.GREEN:
            color = 'green';
            break;
      }
      switch (props.icon) {
         case NiceButtonIcons.HOME:
            icon = 'fas fa-home';
            break;
         case NiceButtonIcons.OPTIONS:
            icon = 'fas fa-sliders-h';
            break;
         case NiceButtonIcons.RANDOMIZE:
         case NiceButtonIcons.RERANDOMIZE:
            icon = 'fas fa-dice';
            break;
         case NiceButtonIcons.GENERATE:
            icon = 'fas fa-play-circle';
            break;
         case NiceButtonIcons.ADD_ONE:
            icon = 'far fa-plus';
            break;
         case NiceButtonIcons.ADD_MANY:
            icon = 'fas fa-plus-square';
            break;
      }
      return <button type='button' key={props.label + '-button'} className={`nobutton nice-button nice-button-${color} nice-button-${width}`} onClick={props.function}>
         <i key={props.label + '-icon'} className={'icon-button ' + icon}></i>
         <i key={props.label + '-label'} className='nice-button-label'>{props.label}</i>
      </button>
   }
   render() {
      let buttons: JSX.Element[] = [<p key='niceButtonError'>The ButtonPanel is only designed to hold between two and six buttons!</p>];
      let totalButtons: number = this.props.buttons.length;
      if (totalButtons > 1 && totalButtons < 7) {
         buttons = [];
         for (let i = 0; i < totalButtons; i++) {
            buttons.push(this.createButton(this.props.buttons[i], totalButtons));
         }
      }
      return (
         <>
            <div className='row no-gutters justify-content-center'>
               <div className='col-xs-10 col-lg-10 col-xl-6 button-container'>
                  {buttons}
               </div>
               <div className='button-container-fake'>
                  <button type='button' className='icon-large nobutton'>
                     <i className='fas fa-copyright'></i>
                  </button>
               </div>
            </div>
         </>
      );
   }
}