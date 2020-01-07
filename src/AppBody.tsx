import React from 'react'
import { Navbar, NavbarProps } from './nav/Navbar'
import GameTile from './components/gameTile/GameTile'
import { GamePropsLanguage, GameProps } from './apps/Game'
import { GameData, Data } from './general/Data'
import NearAndFar from './apps/games/NearAndFar'
import X51stState from './apps/games/X51stState'
import Generator from './apps/generator/Generator'
import SushiGoParty from './apps/games/SushiGoParty'
import Fresco from './apps/games/Fresco'
import Sagrada from './apps/games/Sagrada'
import Ethnos from './apps/games/Ethnos'
import Cartographers from './apps/games/Cartographers'
import './AppBody.css'

/**
 * Container for the main page elements, displaying either the main menu or a chosen sub-application.
 */

interface AppBodyState {
	chosenGame: GameData | null
	chosenLanguage: GamePropsLanguage
}

class AppBody extends React.Component<{}, AppBodyState> {

	/** Settings for every supported language. 
	* Abbr relates to a flag picture, which needs to be provided. 
	* The tilde in rnd will be replaced with a game title in sub-application.
	* In the main menu, the title will be used instead.
	*/
	languages: { [key: string]: GamePropsLanguage } = {
		English: { name: 'English', abbr: 'us', rnd: '~ randomizer', title: 'Game Randomizer' },
		Polski: { name: 'Polski', abbr: 'pl', rnd: 'Losowe ustawienie: ~', title: 'Losowe ustawienia gier' },
	}

	/** Functions to be passed on to components. */
	onClickHome = () => this.loadGame(null)

	/** Initialize the application. */
	constructor(props: never) {
		super(props)
		this.state = {
			chosenGame: null,
			chosenLanguage: this.languages.English,
		}
	}

	/** React to the user setting a different language. */
	handleLanguageSubClick(langName: string) {
		let newState: AppBodyState
		newState = Object.assign({}, this.state, { chosenLanguage: this.languages[langName] })
		this.setState(newState)
	}

	/** Switch between the different sub-applications and the main menu. */
	loadGame(gameName: string | null) {
		let newState: AppBodyState
		if (gameName === null) {
			newState = Object.assign({}, this.state, { chosenGame: null })
		} else {
			newState = Object.assign({}, this.state, { chosenGame: Data.games[gameName] })
		}
		this.setState(newState)
		window.scrollTo(0, 0)
	}

	/** The key function of every component. */
	render() {
		let appBody: JSX.Element | JSX.Element[] = []

		if (this.state.chosenGame === null) {
			/** Display the main menu. */

			for (let i in Data.games) {
				let gameName
				if (Data.games[i].titles[this.state.chosenLanguage.name] === undefined) {
					gameName = Data.games[i].titles['default']
				} else {
					gameName = Data.games[i].titles[this.state.chosenLanguage.name]
				}
				appBody.push(
					<GameTile
						title={gameName}
						onClick={() => this.loadGame(Data.games[i].name)}
						image={Data.games[i].image}
						key={appBody.length}
					/>
				)
			}

			appBody = (<div className='row no-gutters'>
				{appBody}
			</div>)
		} else {
			/** Display the chosen game sub-application. */
			let props: GameProps = { language: this.state.chosenLanguage, onClickHome: this.onClickHome }
			switch (this.state.chosenGame.name) {
				case 'NearAndFar':
					appBody = <NearAndFar {...props} />
					break
				case 'X51stState':
					appBody = <X51stState {...props} />
					break
				case 'Generator':
					appBody = <Generator  {...props} />
					break
				case 'SushiGoParty':
					appBody = <SushiGoParty {...props} />
					break
				case 'Fresco':
					appBody = <Fresco {...props} />
					break
				case 'Sagrada':
					appBody = <Sagrada {...props} />
					break
				case 'Ethnos':
					appBody = <Ethnos {...props} />
					break
				case 'Cartographers':
					appBody = <Cartographers {...props} />
					break
				default:
					break
			}
		}

		/** The actual return value. */
		let navbarProps: NavbarProps = {
			gameChosen: this.state.chosenGame,
			onClickHome: this.onClickHome,
			languageChosen: this.state.chosenLanguage,
			languages: this.languages,
			languageClick: (name: string) => this.handleLanguageSubClick(name),
		}
		return (
			<>
				<Navbar {...navbarProps} />
				<div className='mainContainer'>
					{appBody}
				</div>
			</>
		)
	}
}

export default AppBody