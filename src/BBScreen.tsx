import React, { MouseEvent } from 'react'
import { Info, InfoProps } from './Info'
import { specialBB, BigButton, IBBProps, BBValue, BBValueType } from './BigButton'

export interface IBBScreenProps {
   mainMenu?: boolean
   info?: InfoProps[]
   options: IBBProps[]
}

export interface BBScreenProps extends IBBScreenProps {
   onClick: (event: MouseEvent, value: BBValue) => void
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
         <div key='screen'>
            {this.props.info?.map((e, i) => <Info {...e} key={`${i}`} />)}
            {this.props.options.map((e, i) => <BigButton {...e} key={`${i}`} onClick={this.handleOnClick} />)}
            {!this.props.mainMenu &&
               <BigButton {...specialBB('MENU', BBValueType.MENU)} onClick={this.handleOnClick} />
            }
         </div>
      )
   }
}