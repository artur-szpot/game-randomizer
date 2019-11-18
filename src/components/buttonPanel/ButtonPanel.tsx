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
   ADD_MANY
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
            icon = 'home';
            break;
         case NiceButtonIcons.OPTIONS:
            icon = 'sliders';
            break;
         case NiceButtonIcons.RANDOMIZE:
            icon = 'ok-circled';
            break;
         case NiceButtonIcons.RERANDOMIZE:
            icon = 'arrows-cw';
            break;
         case NiceButtonIcons.ADD_ONE:
            icon = 'check-empty';
            break;
         case NiceButtonIcons.ADD_MANY:
            icon = 'clone';
            break;
      }
      return <button type='button' key={props.label + '-button'} className={`nobutton nice-button nice-button-${color} nice-button-${width}`} onClick={props.function}>
         <p key={props.label + '-icon'} className={'icon icon-button icon-' + icon}></p>
         <p key={props.label + '-label'} className='nice-button-label'>{props.label}</p>
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
                  <button type='button' className='icon icon-large icon-right-open nobutton'></button>
               </div>
            </div>
         </>
      );
   }
}