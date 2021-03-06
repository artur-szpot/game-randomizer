import React, { MouseEvent } from 'react'
import { Info, InfoProps } from './Info'
import { specialBB, BigButton, IBBProps, BBValue, BBValueType } from './BigButton'

export interface IBBScreenProps {
   mainMenu?: boolean
   info?: InfoProps[]
   options: IBBProps[]
}

export interface BBScreenProps extends IBBScreenProps {
   onClick: (event: MouseEvent, value: BBValue)=>void
}

export class BBScreen extends React.Component<BBScreenProps, {}> {
   constructor(props: never) {
      super(props)
      this.handleOnClick = this.handleOnClick.bind(this)
   }

   handleOnClick(event: MouseEvent, value: BBValue): void {
      this.props.onClick(event, value)
   }

   render() {
      return (
         <div className='button-screen'>
            {this.props.info?.map(e => <Info {...e} />)}
            {this.props.options.map(e => <BigButton {...e} onClick={this.handleOnClick} />)}
            {!this.props.mainMenu &&
               <BigButton {...specialBB('MENU', BBValueType.MENU)} onClick={this.handleOnClick} />
            }
         </div>
      )
   }
}