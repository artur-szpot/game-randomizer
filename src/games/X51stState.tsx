import React from 'react';
import { Game, GameProps, GameState } from './Game';
import General from '../general/General';
import Line from '../line/Line';

interface X51stStateResults {
	player1: number[];
	player2: number[];
	player3: number[];
	player4: number[];
	decks: number[];
	addons: number[];
}

class X51stState extends Game {
	//==================================================================================================================================
	//#region === additional variables

	// n/a

	//#endregion
	//==================================================================================================================================
	//#region === variable structure (generated)

	constructor(props: GameProps) {
		super(props);
		this.state = {
			showResults: false,
			opts: {
				randFactions: true,
				randFactionsBigChoice: true,
				randFactionsBigChoiceAllowed: true,
				randFactionsTexas: true,
				randFactionsMississippi: false,
				randDeckWinter: true,
				randDeckNewEra: true,
				randDeckScavengers: true,
				randDeckAllies: true,
				randAddons: false,
				randAddonsCities: true,
				randAddonsBorderTiles: false,
				randAddonsArena: false,
				playerCount: [2, 4, 2],
			}
		};
		this.setLanguage();
	}

	results: X51stStateResults = {
		player1: [],
		player2: [],
		player3: [],
		player4: [],
		decks: [],
		addons: [],
	};

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() {
		return (
			<>
				<Line {...this.shortCategory('factions')} />
				<Line {...this.shortPlusMinus('playerCount')} />
				<Line {...this.shortYesNo('randFactions')} />
 				<Line {...this.shortYesNo('randFactionsBigChoice', this.state.opts.randFactions && this.state.opts.randFactionsBigChoiceAllowed)} />
 				<Line {...this.shortYesNo('randFactionsTexas', this.state.opts.randFactions)} />
 				<Line {...this.shortYesNo('randFactionsMississippi', this.state.opts.randFactions)} />
				<Line {...this.shortCategory('decks')} />
				<Line {...this.shortYesNo('randDeckWinter')} />
				<Line {...this.shortYesNo('randDeckNewEra')} />
				<Line {...this.shortYesNo('randDeckScavengers')} />
				<Line {...this.shortYesNo('randDeckAllies')} />
				<Line {...this.shortCategory('addons')} />
				<Line {...this.shortYesNo('randAddons')} />
				<Line {...this.shortYesNo('randAddonsCities', this.state.opts.randAddons)} />
				<Line {...this.shortYesNo('randAddonsBorderTiles', this.state.opts.randAddons)} />
				<Line {...this.shortYesNo('randAddonsArena', this.state.opts.randAddons)} />
				{this.createMainButtons()}
			</>
		);

	}

	renderResults() {
		let resPlayer1: string[] = this.results.player1.map(value => this.language.specificArrays.factions[value]);
		let resPlayer2: string[] = this.results.player2.map(value => this.language.specificArrays.factions[value]);
		let resPlayer3: string[] = this.results.player3.map(value => this.language.specificArrays.factions[value]);
		let resPlayer4: string[] = this.results.player4.map(value => this.language.specificArrays.factions[value]);
		let resDecks: string[] = this.results.decks.map(value => this.language.specificArrays.decks[value]);
		let resAddons: string[] = this.results.addons.map(value => this.language.specificArrays.addons[value]);

		return (
			<>
				<Line {...this.shortCategory(this.language.results.player1, resPlayer1, true)} />
				<Line {...this.shortCategory(this.language.results.player2, resPlayer2, true)} />
				<Line {...this.shortCategory(this.language.results.player3, resPlayer3, true, this.state.opts.playerCount[2] >= 3)} />
				<Line {...this.shortCategory(this.language.results.player4, resPlayer4, true, this.state.opts.playerCount[2] === 4)} />
				<Line {...this.shortCategory(this.language.results.decks, resDecks, true)} />
				<Line {...this.shortCategory(this.language.results.addons, resAddons, true, this.state.opts.randAddons)} />
				{this.createAllButtons()}
			</>
		);
	}

	//#endregion
	//==================================================================================================================================
	//#region === language

	setLanguage() {
		switch (this.props.language.name) {
			case 'Polski':
				this.language.categories = {
					factions: 'Fakcje',
					decks: 'Talie',
					addons: 'Dodatki'
				}
				this.language.opts = {
					playerCount: 'Liczba graczy',
					randomize: 'Losuj',
					rerandomize: 'Losuj ponownie',
					home: 'Powrót do menu',
					options: 'Zmień opcje',
					randFactions: 'Losuj fakcje',
					randFactionsBigChoice: 'Dwie fakcje do wyboru',
					randFactionsTexas: 'Fakcje: Texas i Hegemonia',
					randFactionsMississippi: 'Fakcje: Mississippi i Uniwersytet',
					randDeckWinter: 'Talia: Zima',
					randDeckNewEra: 'Talia: Nowa Era',
					randDeckScavengers: 'Talia: Zgliszcza',
					randDeckAllies: 'Talia: Sojusznicy',
					randAddons: 'Dodatki',
					randAddonsCities: 'Miasta',
					randAddonsBorderTiles: 'Płytki graniczne',
					randAddonsArena: 'Arena',
				};
				this.language.optArrays = {

				}
				this.language.yesNo = ['TAK', 'NIE'];
				this.language.specifics = {}
				this.language.specificArrays = {
					factions: [
						'Federacja Apallachów',
						'Gildia Kupców',
						'Sojusz Mutantów',
						'Nowy Jork',
						'Texas',
						'Hegemonia',
						'Mississippi',
						'Uniwersytet'
					],
					decks: [
						'Podstawka',
						'Nowa Era',
						'Zima',
						'Zgliszcza',
						'Sojusznicy'
					],
					addons: [
						'brak',
						'Miasta',
						'Płytki graniczne',
						'Arena'
					],
				}
				this.language.results = {
					player1: 'Gracz 1',
					player2: 'Gracz 2',
					player3: 'Gracz 3',
					player4: 'Gracz 4',
					decks: 'Talie',
					addons: 'Dodatki',
				};
				break;

			case 'English':
			default:
				this.language.categories = {
					factions: 'Factions',
					decks: 'Decks',
					addons: 'Addons'
				}
				this.language.opts = {
					playerCount: 'Player count',
					randomize: 'Randomize',
					rerandomize: 'Randomize again',
					home: 'Home',
					options: 'Back to options',
					randFactions: 'Randomize factions',
					randFactionsBigChoice: 'Two factions to choose from',
					randFactionsTexas: 'Factions: Texas & Hegemony',
					randFactionsMississippi: 'Factions: Misssissippi & University',
					randDeckWinter: 'Deck: Winter',
					randDeckNewEra: 'Deck: New Era',
					randDeckScavengers: 'Deck: Scavengers',
					randDeckAllies: 'Deck: Allies',
					randAddons: 'Addons',
					randAddonsCities: 'Cities',
					randAddonsBorderTiles: 'Border Tiles',
					randAddonsArena: 'Arena',
				};
				this.language.optArrays = {}
				this.language.yesNo = ['YES', 'NO'];
				this.language.specifics = {}
				this.language.specificArrays = {
					factions: [
						'The Appalachian Federation',
						'The Merchants Guild',
						'Mutants Union',
						'New York',
						'Texas',
						'Hegemony',
						'Mississippi',
						'University'
					],
					decks: [
						'Base',
						'New Era',
						'Winter',
						'Scavengers',
						'Allies'
					],
					addons: [
						'none',
						'Cities',
						'Border Tiles',
						'Arena'
					],
				}
				this.language.results = {
					player1: 'Player 1',
					player2: 'Player 2',
					player3: 'Player 3',
					player4: 'Player 4',
					decks: 'Decks',
					addons: 'Addons',
				};
				break;
		}
		this.currentLanguage = this.props.language;
	}

	//#endregion
	//==================================================================================================================================
	//#region === special handlers for components

	handleYesNoClickSpecial(newState: GameState, varName: string) {
		return newState;
	}

	handleMultiClickSpecial(newState: GameState, varName: string) {
		return newState;
	}

	handleMultiSubClickSpecial(newState: GameState, varName: string, value: number) {
		return newState;
	}

	handleMultiListClickSpecial(newState: GameState, varName: string) {
		return newState;
	}

	handlePlusMinusClickSpecial(newState: GameState, varName: string, change: number) {
		return newState;
	}

	//#endregion
	//==================================================================================================================================
	//#region === randomizer

	randomize() {
		let player1: number[] = [];
		let player2: number[] = [];
		let player3: number[] = [];
		let player4: number[] = [];
		let decks: number[] = [];
		let addons: number[] = [];

		// player factions
		let choice = [];
		for (let i = 0; i < 4; i++) {
			choice.push(i);
		}
		if (this.state.opts.randFactionsTexas) {
			choice.push(4);
			choice.push(5);
		}
		if (this.state.opts.randFactionsMississippi) {
			choice.push(6);
			choice.push(7);
		}
		if (this.state.opts.randFactionsBigChoiceAllowed && this.state.opts.randFactionsBigChoice) {
			player1 = General.randomFromArray(choice, 2);
			player2 = General.randomFromArray(choice, 2);
			player3 = General.randomFromArray(choice, 2);
			player4 = General.randomFromArray(choice, 2);
		}
		else {
			let players = General.randomFromArray(choice, 4);
			player1 = [players[0]];
			player2 = [players[1]];
			player3 = [players[2]];
			player4 = [players[3]];
		}

		// deck
		choice = [];
		if (this.state.opts.randDeckNewEra) {
			choice.push(1);
		}
		if (this.state.opts.randDeckWinter) {
			choice.push(2);
		}
		if (this.state.opts.randDeckScavengers) {
			choice.push(3);
		}
		if (this.state.opts.randDeckAllies) {
			choice.push(4);
		}
		let chosen = General.random(1, choice.length);
		decks = [0, chosen];

		// addons
		if (this.state.opts.randAddonsCities && General.randomBool()) {
			addons.push(1);
		}
		if (this.state.opts.randAddonsBorderTiles && General.randomBool()) {
			addons.push(2);
		}
		if (this.state.opts.randAddonsArena && General.randomBool()) {
			addons.push(3);
		}
		if (addons.length == 0) {
			addons.push(0);
		}

		this.results.player1 = player1;
		this.results.player2 = player2;
		this.results.player3 = player3;
		this.results.player4 = player4;
		this.results.decks = decks;
		this.results.addons = addons;

		// show 'em
		let newState = Object.assign({}, this.state, { showResults: true });
		this.setState(newState);
	}

	//#endregion
	//==================================================================================================================================
	//#region === additional functions

	isBigChoiceAllowed(newState: GameState) {
		let totalFactions = 4;
		if (newState.opts.randFactionsTexas) { totalFactions += 2; }
		if (newState.opts.randFactionsMississippi) { totalFactions += 2; }
		return totalFactions >= newState.opts.playerCount[2] * 2;
	}

	//#endregion
	//==================================================================================================================================
}

export default X51stState;


// import React from 'react';
// import General from '../general/General';
// import Game from './Game';
// import Line from '../line/Line';

// class X51stState extends Game {
// 	//==================================================================================================================================
// 	//#region === additional variables

// 	// none

// 	//#endregion
// 	//==================================================================================================================================
// 	//#region === variable structure (generated)

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			showResults: false,
// 			randFactions: true,
// 			randFactionsBigChoice: true,
// 			randFactionsBigChoiceAllowed: true,
// 			randFactionsTexas: true,
// 			randFactionsMississippi: false,
// 			randDeckWinter: true,
// 			randDeckNewEra: true,
// 			randDeckScavengers: true,
// 			randDeckAllies: true,
// 			randAddons: false,
// 			randAddonsCities: true,
// 			randAddonsBorderTiles: false,
// 			randAddonsArena: false,
// 			playerCount: [2, 4, 2],
// 		};
// 		this.setLanguage();
// 	}

// 	results = {
// 		player1: null,
// 		player2: null,
// 		player3: null,
// 		player4: null,
// 		decks: null,
// 		addons: null,
// 	};

// 	//#endregion
// 	//==================================================================================================================================
// 	//#region === renders

// 	renderOptions() {
// 		return (
// 			<>
// 				<Line {...this.addCategory('factions')} />
// 				<Line {...this.addPlusMinus('playerCount')} />
// 				<Line {...this.addYesNo('randFactions')} />
// 				<Line {...this.addYesNo('randFactionsBigChoice', this.state.randFactions && this.state.randFactionsBigChoiceAllowed)} />
// 				<Line {...this.addYesNo('randFactionsTexas', this.state.randFactions)} />
// 				<Line {...this.addYesNo('randFactionsMississippi', this.state.randFactions)} />
// 				<Line {...this.addCategory('decks')} />
// 				<Line {...this.addYesNo('randDeckWinter')} />
// 				<Line {...this.addYesNo('randDeckNewEra')} />
// 				<Line {...this.addYesNo('randDeckScavengers')} />
// 				<Line {...this.addYesNo('randDeckAllies')} />
// 				<Line {...this.addCategory('addons')} />
// 				<Line {...this.addYesNo('randAddons')} />
// 				<Line {...this.addYesNo('randAddonsCities', this.state.randAddons)} />
// 				<Line {...this.addYesNo('randAddonsBorderTiles', this.state.randAddons)} />
// 				<Line {...this.addYesNo('randAddonsArena', this.state.randAddons)} />
// 				{this.createMainButtons()}
// 			</>
// 		);

// 	}

// 	renderResults() {
// 		let resPlayer1 = this.results.player1.map(value => this.language.opts.factions[value]);
// 		let resPlayer2 = this.results.player2.map(value => this.language.opts.factions[value]);
// 		let resPlayer3 = this.results.player3.map(value => this.language.opts.factions[value]);
// 		let resPlayer4 = this.results.player4.map(value => this.language.opts.factions[value]);
// 		let resDecks = this.results.decks.map(value => this.language.opts.decks[value]);
// 		let resAddons = this.results.addons.map(value => this.language.opts.addons[value]);

// 		return (
// 			<>
// 				<Line {...this.addCategory(this.language.results.player1, resPlayer1, true)} />
// 				<Line {...this.addCategory(this.language.results.player2, resPlayer2, true)} />
// 				<Line {...this.addCategory(this.language.results.player3, resPlayer3, true, this.state.playerCount[2] >= 3)} />
// 				<Line {...this.addCategory(this.language.results.player4, resPlayer4, true, this.state.playerCount[2] === 4)} />
// 				<Line {...this.addCategory(this.language.results.decks, resDecks, true)} />
// 				<Line {...this.addCategory(this.language.results.addons, resAddons, true, this.state.randAddons)} />
// 				{this.createAllButtons()}
// 			</>
// 		);
// 	}

// 	//#endregion
// 	//==================================================================================================================================
// 	//#region === language

// 	setLanguage() {
// 		switch (this.props.language.name) {
// 			case 'Polski':
// 				this.language.categories = {
// 					factions: 'Fakcje',
// 					decks: 'Talie',
// 					addons: 'Dodatki'
// 				}
// 				this.language.opts = {
// 					playerCount: 'Liczba graczy',
// 					randomize: 'Losuj',
// 					rerandomize: 'Losuj ponownie',
// 					home: 'Powrót do menu',
// 					options: 'Zmień opcje',
// 					randFactions: 'Losuj fakcje',
// 					randFactionsBigChoice: 'Dwie fakcje do wyboru',
// 					randFactionsTexas: 'Fakcje: Texas i Hegemonia',
// 					randFactionsMississippi: 'Fakcje: Mississippi i Uniwersytet',
// 					randDeckWinter: 'Talia: Zima',
// 					randDeckNewEra: 'Talia: Nowa Era',
// 					randDeckScavengers: 'Talia: Zgliszcza',
// 					randDeckAllies: 'Talia: Sojusznicy',
// 					randAddons: 'Dodatki',
// 					randAddonsCities: 'Miasta',
// 					randAddonsBorderTiles: 'Płytki graniczne',
// 					randAddonsArena: 'Arena',
// 					factions: [
// 						'Federacja Apallachów',
// 						'Gildia Kupców',
// 						'Sojusz Mutantów',
// 						'Nowy Jork',
// 						'Texas',
// 						'Hegemonia',
// 						'Mississippi',
// 						'Uniwersytet'
// 					],
// 					decks: [
// 						'Podstawka',
// 						'Nowa Era',
// 						'Zima',
// 						'Zgliszcza',
// 						'Sojusznicy'
// 					],
// 					addons: [
// 						'brak',
// 						'Miasta',
// 						'Płytki graniczne',
// 						'Arena'
// 					],
// 				};
// 				this.language.yesNo = ['TAK', 'NIE'];
// 				this.language.results = {
// 					player1: 'Gracz 1',
// 					player2: 'Gracz 2',
// 					player3: 'Gracz 3',
// 					player4: 'Gracz 4',
// 					decks: 'Talie',
// 					addons: 'Dodatki',
// 				};
// 				break;

// 			case 'English':
// 			default:
// 					this.language.categories = {
// 						factions: 'Factions',
// 						decks: 'Decks',
// 						addons: 'Addons'
// 					}
// 				this.language.opts = {
// 					playerCount: 'Player count',
// 					randomize: 'Randomize',
// 					rerandomize: 'Randomize again',
// 					home: 'Home',
// 					options: 'Back to options',
// 					randFactions: 'Randomize factions',
// 					randFactionsBigChoice: 'Two factions to choose from',
// 					randFactionsTexas: 'Factions: Texas & Hegemony',
// 					randFactionsMississippi: 'Factions: Misssissippi & University',
// 					randDeckWinter: 'Deck: Winter',
// 					randDeckNewEra: 'Deck: New Era',
// 					randDeckScavengers: 'Deck: Scavengers',
// 					randDeckAllies: 'Deck: Allies',
// 					randAddons: 'Addons',
// 					randAddonsCities: 'Cities',
// 					randAddonsBorderTiles: 'Border Tiles',
// 					randAddonsArena: 'Arena',
// 					factions: [
// 						'The Appalachian Federation',
// 						'The Merchants Guild',
// 						'Mutants Union',
// 						'New York',
// 						'Texas',
// 						'Hegemony',
// 						'Mississippi',
// 						'University'
// 					],
// 					decks: [
// 						'Base',
// 						'New Era',
// 						'Winter',
// 						'Scavengers',
// 						'Allies'
// 					],
// 					addons: [
// 						'none',
// 						'Cities',
// 						'Border Tiles',
// 						'Arena'
// 					],
// 				};
// 				this.language.yesNo = ['YES', 'NO'];
// 				this.language.results = {
// 					player1: 'Player 1',
// 					player2: 'Player 2',
// 					player3: 'Player 3',
// 					player4: 'Player 4',
// 					decks: 'Decks',
// 					addons: 'Addons',
// 				};
// 				break;
// 		}
// 		this.currentLanguage = this.props.language;
// 	}

// 	//#endregion
// 	//==================================================================================================================================
// 	//#region === special handlers for components

// 	 /** Handle special cases after normal processing of YesNoClick. */
// 	 handleYesNoClickSpecial(newState, varName) {
// 		switch (varName) {
// 			case 'randFactionsTexas':
// 			case 'randFactionsMississippi':
// 				newState.randFactionsBigChoiceAllowed = this.isBigChoiceAllowed(newState);
// 				break;
// 		}
//       return newState;
//    }

//    /** Handle special cases after normal processing of YesNoClick. */
//    handleMultiClickSpecial(newState, varName) {
//       return newState;
//    }

//    /** Handle special cases after normal processing of YesNoClick. */
//    handleMultiSubClickSpecial(newState, varName, value) {
//       return newState;
//    }

//    /** Handle special cases after normal processing of YesNoClick. */
//    handleMultiListClickSpecial(newState, varName) {
//       return newState;
//    }

//    /** Handle special cases after normal processing of YesNoClick. */
//    handlePlusMinusClickSpecial(newState, varName, change) {
// 		switch (varName) {
// 			case 'playerCount':
// 				newState.randFactionsBigChoiceAllowed = this.isBigChoiceAllowed(newState);
// 				break;
// 		}
//       return newState;
//    }

// 	//#endregion
// 	//==================================================================================================================================
// 	//#region === randomizer

// 	randomize() {
// 		// generate results
// 		let player1;
// 		let player2;
// 		let player3;
// 		let player4;
// 		let decks;
// 		let addons = [];

// 		// player factions
// 		let choice = [];
// 		for (let i = 0; i < 4; i++) {
// 			choice.push(i);
// 		}
// 		if (this.state.randFactionsTexas) {
// 			choice.push(4);
// 			choice.push(5);
// 		}
// 		if (this.state.randFactionsMississippi) {
// 			choice.push(6);
// 			choice.push(7);
// 		}
// 		if (this.state.randFactionsBigChoiceAllowed && this.state.randFactionsBigChoice) {
// 			player1 = General.randomFromArray(choice, 2);
// 			player2 = General.randomFromArray(choice, 2);
// 			player3 = General.randomFromArray(choice, 2);
// 			player4 = General.randomFromArray(choice, 2);
// 		}
// 		else {
// 			let players = General.randomFromArray(choice, 4);
// 			player1 = [players[0]];
// 			player2 = [players[1]];
// 			player3 = [players[2]];
// 			player4 = [players[3]];
// 		}

// 		// deck
// 		choice = [];
// 		if (this.state.randDeckNewEra) {
// 			choice.push(1);
// 		}
// 		if (this.state.randDeckWinter) {
// 			choice.push(2);
// 		}
// 		if (this.state.randDeckScavengers) {
// 			choice.push(3);
// 		}
// 		if (this.state.randDeckAllies) {
// 			choice.push(4);
// 		}
// 		let chosen = General.random(1, choice.length);
// 		decks = [0, chosen];

// 		// addons
// 		if (this.state.randAddonsCities && General.randomBool()) {
// 			addons.push(1);
// 		}
// 		if (this.state.randAddonsBorderTiles && General.randomBool()) {
// 			addons.push(2);
// 		}
// 		if (this.state.randAddonsArena && General.randomBool()) {
// 			addons.push(3);
// 		}
// 		if (addons.length == 0) {
// 			addons.push(0);
// 		}

// 		this.results.player1 = player1;
// 		this.results.player2 = player2;
// 		this.results.player3 = player3;
// 		this.results.player4 = player4;
// 		this.results.decks = decks;
// 		this.results.addons = addons;

// 		// show 'em
// 		let newState;
// 		newState = Object.assign({}, this.state, { showResults: true });
// 		this.setState(newState);
// 	}

// 	//#endregion
// 	//==================================================================================================================================
// 	//#region === additional functions

// 	isBigChoiceAllowed(newState) {
// 		let totalFactions = 4;
// 		if (newState.randFactionsTexas) { totalFactions += 2; }
// 		if (newState.randFactionsMississippi) { totalFactions += 2; }
// 		return totalFactions >= newState.playerCount[2] * 2;
// 	}

// 	//#endregion
// 	//==================================================================================================================================
// }

// export default X51stState;