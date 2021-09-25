import React, { MouseEvent } from 'react'
import { GameHandler } from './GameHandler'
import { BBValue } from './BigButton'
import { BBScreen } from './BBScreen'
import { GAME, Language } from './Language'
import { getGameHandler } from './GameLibrary'

interface AppState {
   baseHandler: GameHandler
   handler: GameHandler
   language: Language
   refreshToggler: boolean
}

export default class App extends React.Component<{}, AppState> {
   constructor(props: never) {
      super(props)
      this.handleOnClick = this.handleOnClick.bind(this)
      const language = new Language()
      const handler = new GameHandler(language)
      this.state = {
         baseHandler: handler,
         handler: handler,
         language: language,
         refreshToggler: true
      }
   }

   handleOnClick(event: MouseEvent, value: BBValue): void {
      if (value.isMenu()) {
         this.setState({ handler: this.state.baseHandler })
         return
      }
      if (this.state.baseHandler === this.state.handler) {
         this.setState({ handler: getGameHandler(value.getString() as GAME) })
         return
      }
      this.state.handler.executeAction(value)
      this.setState({ refreshToggler: !this.state.refreshToggler })
   }


   render() {
      return (
         <div id='mainContainer' className='container'>
            <div className='row'>
            <div className='col-lg-3'></div>
            <div className='col-lg-6'>
               {/* <div className='container'> */}
               <BBScreen {...this.state.handler.getScreen()} onClick={this.handleOnClick} />
            </div>
            <div className='col-lg-3'></div>
            </div>
         </div>
      )
   }
}