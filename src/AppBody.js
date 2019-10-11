import React from 'react';
import Navbar from './nav/Navbar';
import GameTile from './components/gameTile/GameTile';
import NearAndFar from './games/NearAndFar';
import X51stState from './games/X51stState';
import SushiGoParty from './games/SushiGoParty';
import './AppBody.css';

/**
 * Container for the main page elements, displaying either the main menu or a chosen sub-application.
 */
class AppBody extends React.Component {

	/** Settings for every supported language. 
	* Abbr relates to a flag picture, which needs to be provided. 
	* The tilde in rnd will be replaced with a game title in sub-application.
	* In the main menu, the title will be used instead.
	*/
	languages = {
		English: { name: 'English', abbr: 'us', rnd: '~ randomizer', title: 'Game Randomizer' },
		Polski: { name: 'Polski', abbr: 'pl', rnd: 'Losowe ustawienie: ~', title: 'Losowe ustawienia gier' },
	}

	/** Functions to be passed on to components. */
	functions = {
		onSubClickLanguage: [],
		onClickHome: () => this.loadGame(null),
	};

	/**
	 * Data of every game/sub-application available from the main menu.
	 * - name: name of the module file
	 * - titles: default name of the game and, if applicable, its different name in any other language(s)
	 * - function: self-explanatory
	 * - image: thumbnail for the game from BoardGameGeek.com
	 */
	games = {
		NearAndFar: {
			name: 'NearAndFar',
			titles: { default: 'Near and Far' },
			function: () => this.loadGame('NearAndFar'),
			image: 'https://cf.geekdo-images.com/thumb/img/PDunwFmZeYRfCXx2B5glMugNofk=/fit-in/200x150/pic3605785.jpg'
		},
		X51stState: {
			name: 'X51stState',
			titles: { default: '51st State: Master Set', Polski: '51. Stan' },
			function: () => this.loadGame('X51stState'),
			image: 'https://cf.geekdo-images.com/thumb/img/lkHbwjQfKhiqWaeQRoK2X9MEphc=/fit-in/200x150/pic2961948.jpg'
		},
		SushiGoParty: {
			name: 'SushiGoParty',
			titles: { default: 'Sushi Go! Party' },
			function: () => this.loadGame('SushiGoParty'),
			image: 'https://cf.geekdo-images.com/thumb/img/A8D6DQy46g02YlMicTyhlJza1jQ=/fit-in/200x150/pic3031286.jpg'
		},
		Sagrada: {
			name: 'Sagrada',
			titles: { default: 'Sagrada' },
			function: () => this.loadGame('Sagrada'),
			image: 'https://cf.geekdo-images.com/thumb/img/Efxb5We3kIolBOHjvnOffct-w0c=/fit-in/200x150/pic3525224.jpg'
		},
		Fresco: {
			name: 'Fresco',
			titles: { default: 'Fresco' },
			function: () => this.loadGame('Fresco'),
			image: 'https://cf.geekdo-images.com/thumb/img/kNVrOTCmpam2YmygS2y3KIovRYs=/fit-in/200x150/pic2592064.jpg'
		},
		KingdomBuilder: {
			name: 'KingdomBuilder',
			titles: { default: 'Kingdom Builder', Polski: 'Królestwo w budowie' },
			function: () => this.loadGame('KingdomBuilder'),
			image: 'https://cf.geekdo-images.com/thumb/img/-QYpVIA0Wa6IO9iwwhsHulOKaCQ=/fit-in/200x150/pic3387491.jpg'
		},
	};

	/** Initialize the application. */
	constructor(props) {
		super(props);
		this.state = {
			chosenGame: null,
			chosenLanguage: this.languages.English,
		};
		/** Create the dropdown list of available languages. */
		for (let i in this.languages) {
			this.functions.onSubClickLanguage[this.languages[i].name] = () => this.handleLanguageSubClick(this.languages[i].name);
		}
	}

	/** React to the user setting a different language. */
	handleLanguageSubClick(langName) {
		let newState;
		newState = Object.assign({}, this.state, { chosenLanguage: this.languages[langName] });
		this.setState(newState);
	}
	
	/** Switch between the different sub-applications and the main menu. */
	loadGame(gameName) {
		let newState;
		if(gameName === null) {
			newState = Object.assign({}, this.state, { chosenGame: null });
		} else {
			newState = Object.assign({}, this.state, { chosenGame: this.games[gameName] });
		}
		this.setState(newState);
		window.scrollTo(0, 0);
	}

	/** The key function of every component. */
	render() {
		let appBody = [];

		if (this.state.chosenGame === null) {
			/** Display the main menu. */

			for (let i in this.games) {
				let gameName;
				if (this.games[i].titles[this.state.chosenLanguage.name] === undefined) {
					gameName = this.games[i].titles['default'];
				} else {
					gameName = this.games[i].titles[this.state.chosenLanguage.name];
				}
				appBody.push(
					<GameTile
						title={gameName}
						onClick={this.games[i].function}
						image={this.games[i].image}
						key={appBody.length}
					/>
				);
			}

			appBody = (<div className='row no-gutters'>
				{appBody}
			</div>);
		} else {
			/** 
			 * Display the chosen game sub-application.
			 * The randomizing sub-applications accept as props:
			 * - language: self-explanatory, allows the component to react to language change
			 * - onClickHome function: necessary for the 'Home' big button to work
			 */

			switch (this.state.chosenGame.name) {
				case 'NearAndFar':
					appBody = <NearAndFar
						language={this.state.chosenLanguage}
						onClickHome={this.functions.onClickHome}
					/>;
					break;
					case 'X51stState':
						appBody = <X51stState
							language={this.state.chosenLanguage}
							onClickHome={this.functions.onClickHome}
						/>;
						break;
					case 'SushiGoParty':
						appBody = <SushiGoParty
						language={this.state.chosenLanguage}
						onClickHome={this.functions.onClickHome}
						/>;
						break;
				default:
			}
		}

		/** The actual return value. */
		return (
			<>
				<Navbar
					gameChosen={this.state.chosenGame}
					onClickHome={this.functions.onClickHome}
					languageChosen={this.state.chosenLanguage}
					languages={this.languages}
					languageClicks={this.functions.onSubClickLanguage}
				/>
				<div className='mainContainer'>
					{appBody}
				</div>
			</>
		);
	}
}

export default AppBody;