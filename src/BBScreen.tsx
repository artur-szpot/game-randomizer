import React, { MouseEvent } from 'react'
import { Info, InfoProps } from './Info'
import { iconBB, BigButton, IBBProps, BBValue, BBValueType, BBICon } from './BigButton'

export interface IBBScreenProps {
   info?: InfoProps[]
   options?: IBBProps[]
   bottomMenu?: BBICon[]
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
      const timeKey = Date.now()
      if (typeof this.props.bottomMenu !== 'undefined') {
         return (
            <div className='bottom-menu'>
               {this.props.bottomMenu!.map((e, i) => <BigButton {...iconBB(e, BBValueType.OK)} onClick={this.handleOnClick} key={`bottom-menu-${i}-${timeKey}`} />)}
            </div>
         )
      } else {
         return (
            <div className='main-div'>
               {this.props.info?.map((e, i) => <Info {...e} key={`info-${i}-${timeKey}`} />)}
               {this.props.options?.map((e, i) => <BigButton {...e} onClick={this.handleOnClick} key={`option-${i}-${timeKey}`} />)}
               {/* {!this.props.mainMenu &&
                  <BigButton {...specialBB('MENU', BBValueType.MENU)} onClick={this.handleOnClick} />
               } */}
            </div>
         )
      }
   }
}