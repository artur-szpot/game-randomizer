import React, { MouseEvent } from 'react'
import { CodenamesHandler } from './codenames/handler'
import { emptyCodenamesState } from './codenames/state'
import { AppActions } from './game/actions'
import { GameHandler } from './game/handler'
import { emptyGameState, gameState } from './game/state'
import { IstanbulHandler } from './istanbul/handler'
import { emptyIstanbulState } from './istanbul/state'
import { MuertosHandler } from './muertos/handler'
import { emptyMuertosState } from './muertos/state'
import { specialValue, SuperButton, SuperButtonProps, SuperButtonValue, SuperButtonValueType } from './SuperButton'

export interface ButtonScreenState {
   handler: GameHandler
   state: gameState
}

export enum ButtonScreenInfoType { NONE, TEXT_LEFT, TEXT_CENTER, BLOCK_CONTAINER, BLOCK }
export interface ButtonScreenInfo {
   type: ButtonScreenInfoType
   value: string
   blocks?: ButtonScreenInfo[]
}

export interface ButtonScreenDisplay {
   info?: ButtonScreenInfo[]
   options: SuperButtonProps[]
}
export const infoBlock = (values: string[]) => {
   return {
      type: ButtonScreenInfoType.BLOCK_CONTAINER,
      value: '',
      blocks: values.map(e => { return { type: ButtonScreenInfoType.BLOCK, value: e } })
   }
}
export const infoLeft = (value: string) => { return { type: ButtonScreenInfoType.TEXT_LEFT, value: value } }
export const infoCenter = (value: string) => { return { type: ButtonScreenInfoType.TEXT_CENTER, value: value } }

export class ButtonScreen extends React.Component<{}, ButtonScreenState> {
   constructor(props: never) {
      super(props)
      this.handleOnClick = this.handleOnClick.bind(this)
      this.state = {
         handler: new GameHandler(),
         state: emptyGameState()
      }
   }

   handleOnClick(event: MouseEvent, value?: SuperButtonValue): void {
      if (this.state.state.appAction && this.state.state.action === AppActions.MENU) {
         switch (value!.value.string!) {
            case 'muertos':
               this.setState({
                  handler: new MuertosHandler(),
                  state: emptyMuertosState()
               })
               break
            case 'codenames':
               this.setState({
                  handler: new CodenamesHandler(),
                  state: emptyCodenamesState()
               })
               break
            case 'istanbul':
               this.setState({
                  handler: new IstanbulHandler(),
                  state: emptyIstanbulState()
               })
               break
         }
         return
      }
      this.setState({ state: this.state.handler.executeAction(this.state.state, value) })
   }

   render() {
      const display: ButtonScreenDisplay = this.state.handler.getScreen(this.state.state)

      return (
         <div className='button-screen'>
            {display.info?.map(e => this.renderInfo(e))}
            {display.options.map(e => <SuperButton {...e} onClick={this.handleOnClick} />)}
            {(this.state.state.appAction && this.state.state.action === AppActions.MENU) ||
               <SuperButton {...specialValue('MENU', SuperButtonValueType.MENU)} onClick={this.handleOnClick} />
            }
         </div>
      )
   }

   renderInfo(info: ButtonScreenInfo): JSX.Element | undefined {
      switch (info.type) {
         case ButtonScreenInfoType.TEXT_LEFT:
            return <p className='info info-left'>{info.value}</p>
         case ButtonScreenInfoType.TEXT_CENTER:
            return <p className='info info-center'>{info.value}</p>
         case ButtonScreenInfoType.BLOCK_CONTAINER:
            return <div className='info info-block-container'>
               {info.blocks?.map(e => <div className='info info-block'>{e.value}</div>)}
            </div>
      }
   }
}