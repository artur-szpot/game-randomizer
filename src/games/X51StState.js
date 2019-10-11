import React from 'react';
import General from '../general/General';
import Line from '../line/Line';

class X51stState extends React.Component {
	//#region === generated functions
	// language
	currentLanguage = this.props.language;
	language = {};

	// functions
	functions = {
		// yesNo
		onClickRandFactions: () => this.handleYesNoClick('randFactions'),
		onClickRandFactionsBigChoice: () => this.handleYesNoClick('randFactionsBigChoice'),
		onClickRandFactionsTexas: () => this.handleYesNoClick('randFactionsTexas'),
		onClickRandFactionsMississippi: () => this.handleYesNoClick('randFactionsMississippi'),
		onClickRandDeckWinter: () => this.handleYesNoClick('randDeckWinter'),
		onClickRandDeckNewEra: () => this.handleYesNoClick('randDeckNewEra'),
		onClickRandDeckScavengers: () => this.handleYesNoClick('randDeckScavengers'),
		onClickRandDeckAllies: () => this.handleYesNoClick('randDeckAllies'),
		onClickRandAddons: () => this.handleYesNoClick('randAddons'),
		onClickRandAddonsCities: () => this.handleYesNoClick('randAddonsCities'),
		onClickRandAddonsBorderTiles: () => this.handleYesNoClick('randAddonsBorderTiles'),
		onClickRandAddonsArena: () => this.handleYesNoClick('randAddonsArena'),
		// plusMinusSolo 
		onClickPlayerCountMinus: () => this.handlePlusMinusClick('playerCount', -1),
		onClickPlayerCountPlus: () => this.handlePlusMinusClick('playerCount', 1),
		// big buttons
		onClickRandomize: () => this.randomize(),
		onClickOptions: () => this.showOptions(),
	};

	//#endregion
	//#region === additional variables

	// results
	results = {
		player1: null,
		player2: null,
		player3: null,
		player4: null,
		decks: null,
		addons: null,
	};

	//#endregion
	//#region === initial settings

	constructor(props) {
		super(props);
		this.state = {
			// actual state
			showResults: false,
			// yesNo
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
			// plusMinusSolo
			playerCount: [2, 4, 2],
		};
		this.setLanguage();
	}

	//#endregion
	//#region === renders

	renderOptions() {
		return (
			<>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.playerCount}
					onMinusClick={this.functions.onClickPlayerCountMinus}
					onPlusClick={this.functions.onClickPlayerCountPlus}
					minMaxCurr={this.state.playerCount}
					visible={true}
					first={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randFactions}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandFactions}
					yesNo={this.state.randFactions}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randFactionsBigChoice}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandFactionsBigChoice}
					yesNo={this.state.randFactionsBigChoice}
					visible={this.state.randFactions && this.state.randFactionsBigChoiceAllowed}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randFactionsTexas}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandFactionsTexas}
					yesNo={this.state.randFactionsTexas}
					visible={this.state.randFactions}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randFactionsMississippi}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandFactionsMississippi}
					yesNo={this.state.randFactionsMississippi}
					visible={this.state.randFactions}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randDeckWinter}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandDeckWinter}
					yesNo={this.state.randDeckWinter}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randDeckNewEra}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandDeckNewEra}
					yesNo={this.state.randDeckNewEra}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randDeckScavengers}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandDeckScavengers}
					yesNo={this.state.randDeckScavengers}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randDeckAllies}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandDeckAllies}
					yesNo={this.state.randDeckAllies}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randAddons}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandAddons}
					yesNo={this.state.randAddons}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randAddonsCities}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandAddonsCities}
					yesNo={this.state.randAddonsCities}
					visible={this.state.randAddons}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randAddonsBorderTiles}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandAddonsBorderTiles}
					yesNo={this.state.randAddonsBorderTiles}
					visible={this.state.randAddons}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randAddonsArena}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandAddonsArena}
					yesNo={this.state.randAddonsArena}
					visible={this.state.randAddons}
				/>
				<Line
					lineType='BigButton'
					text={this.language.opts.randomize}
					color='green'
					onClick={this.functions.onClickRandomize}
					first={true}
				/>
				<Line
					lineType='BigButton'
					text={this.language.opts.home}
					color='red'
					onClick={this.props.onClickHome}
				/>
			</>
		);
	}

	renderResults() {
		let resPlayer1 = this.results.player1;
		let resPlayer2 = this.results.player2;
		let resPlayer3 = this.results.player3;
		let resPlayer4 = this.results.player4;
		let resDecks = this.results.decks;
		let resAddons = this.results.addons;

		return (
			<>
				<Line
					lineType='Text'
					title={this.language.results.player1}
					text={resPlayer1}
					visible={true}
					first={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.player2}
					text={resPlayer2}
					visible={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.player3}
					text={resPlayer3}
					visible={this.state.playerCount[2] >= 3}
				/>
				<Line
					lineType='Text'
					title={this.language.results.player4}
					text={resPlayer4}
					visible={this.state.playerCount[2] === 4}
				/>
				<Line
					lineType='Text'
					title={this.language.results.decks}
					text={resDecks}
					visible={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.addons}
					text={resAddons}
					visible={this.state.randAddons}
				/>
				<Line
					lineType='BigButton'
					text={this.language.opts.rerandomize}
					color='green'
					onClick={this.functions.onClickRandomize}
					first={true}
				/>
				<Line
					lineType='BigButton'
					text={this.language.opts.options}
					color='blue'
					onClick={this.functions.onClickOptions}
				/>
				<Line
					lineType='BigButton'
					text={this.language.opts.home}
					color='red'
					onClick={this.props.onClickHome}
				/>
			</>
		);
	}

	render() {
		if (this.props.language !== this.currentLanguage) {
			this.setLanguage();
		}

		if (this.state.showResults) {
			return this.renderResults();
		} else {
			return this.renderOptions();
		}
	}

	//#endregion
	//#region === language

	setLanguage() {
		switch (this.props.language.name) {
			case 'Polski':
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
				this.language.yesNo = ['TAK', 'NIE'];
				this.language.results = {
					player1: 'Gracz 1',
					player2: 'Gracz 2',
					player3: 'Gracz 3',
					player4: 'Gracz 4',
					decks: 'Talie',
					addons: 'Dodatki',
				};
				this.language.factions = [
					'Federacja Apallachów',
					'Gildia Kupców',
					'Sojusz Mutantów',
					'Nowy Jork',
					'Texas',
					'Hegemonia',
					'Mississippi',
					'Uniwersytet'
				];
				this.language.decks = [
					'Podstawka',
					'Nowa Era',
					'Zima',
					'Zgliszcza',
					'Sojusznicy'
				];
				this.language.addons = [
					'brak',
					'Miasta',
					'Płytki graniczne',
					'Arena'
				];
				break;

			case 'English':
			default:
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
				this.language.yesNo = ['YES', 'NO'];
				this.language.results = {
					player1: 'Player 1',
					player2: 'Player 2',
					player3: 'Player 3',
					player4: 'Player 4',
					decks: 'Decks',
					addons: 'Addons',
				};
				this.language.factions = [
					'The Appalachian Federation',
					'The Merchants Guild',
					'Mutants Union',
					'New York',
					'Texas',
					'Hegemony',
					'Mississippi',
					'University'
				];
				this.language.decks = [
					'Base',
					'New Era',
					'Winter',
					'Scavengers',
					'Allies'
				];
				this.language.addons = [
					'none',
					'Cities',
					'Border Tiles',
					'Arena'
				];
				break;
		}
		this.currentLanguage = this.props.language;
	}

	//#endregion
	//#region === generated methods

	handleYesNoClick(varName) {
		let newState;
		switch (varName) {
			case 'randFactions':
				newState = Object.assign({}, this.state, { randFactions: !this.state.randFactions });
				break;
			case 'randFactionsBigChoice':
				newState = Object.assign({}, this.state, { randFactionsBigChoice: !this.state.randFactionsBigChoice });
				break;
			case 'randFactionsTexas':
				newState = Object.assign({}, this.state, { randFactionsTexas: !this.state.randFactionsTexas });
				break;
			case 'randFactionsMississippi':
				newState = Object.assign({}, this.state, { randFactionsMississippi: !this.state.randFactionsMississippi });
				break;
			case 'randDeckWinter':
				newState = Object.assign({}, this.state, { randDeckWinter: !this.state.randDeckWinter });
				break;
			case 'randDeckNewEra':
				newState = Object.assign({}, this.state, { randDeckNewEra: !this.state.randDeckNewEra });
				break;
			case 'randDeckScavengers':
				newState = Object.assign({}, this.state, { randDeckScavengers: !this.state.randDeckScavengers });
				break;
			case 'randDeckAllies':
				newState = Object.assign({}, this.state, { randDeckAllies: !this.state.randDeckAllies });
				break;
			case 'randAddons':
				newState = Object.assign({}, this.state, { randAddons: !this.state.randAddons });
				break;
			case 'randAddonsCities':
				newState = Object.assign({}, this.state, { randAddonsCities: !this.state.randAddonsCities });
				break;
			case 'randAddonsBorderTiles':
				newState = Object.assign({}, this.state, { randAddonsBorderTiles: !this.state.randAddonsBorderTiles });
				break;
			case 'randAddonsArena':
				newState = Object.assign({}, this.state, { randAddonsArena: !this.state.randAddonsArena });
				break;
			default:
				alert('handleYesNoClick called for unsupported varName: ' + varName);
				break;
		}

		switch (varName) {
			case 'randFactionsTexas':
			case 'randFactionsMississippi':
				newState = Object.assign({}, newState, { randFactionsBigChoiceAllowed: this.isBigChoiceAllowed(newState) });
				break;
		}

		this.setState(newState);
	}

	handlePlusMinusClick(varName, change) {
		let newState;
		switch (varName) {
			case 'playerCount':
				if (General.validateMinMaxCurr(this.state.playerCount, change)) {
					let newPlayerCount = this.state.playerCount.slice();
					newPlayerCount[2] += change;
					newState = Object.assign({}, this.state, { playerCount: newPlayerCount });
				} else { return; }
				break;
			default:
				alert('handlePlusMinusClick called for unsupported varName: ' + varName);
				break;
		}

		switch (varName) {
			case 'playerCount':
				newState = Object.assign({}, newState, { randFactionsBigChoiceAllowed: this.isBigChoiceAllowed(newState) });
				break;
		}

		this.setState(newState);
	}

	showOptions() {
		let newState;
		newState = Object.assign({}, this.state, { showResults: false });
		this.setState(newState);
	}

	isBigChoiceAllowed(newState) {
		let totalFactions = 4;
		if (newState.randFactionsTexas) { totalFactions += 2; }
		if (newState.randFactionsMississippi) { totalFactions += 2; }
		return totalFactions >= newState.playerCount[2] * 2;
	}

	//#endregion
	//#region === randomizer

	randomize() {
		// generate results
		var player1;
		var player2;
		var player3;
		var player4;
		var decks;
		var addons;

		// player factions
		var choice = [];
		for (let i = 0; i < 4; i++) {
			choice.push(this.language.factions[i]);
		}
		if (this.state.randFactionsTexas) {
			choice.push(this.language.factions[4]);
			choice.push(this.language.factions[5]);
		}
		if (this.state.randFactionsMississippi) {
			choice.push(this.language.factions[6]);
			choice.push(this.language.factions[7]);
		}
		if (this.state.randFactionsBigChoiceAllowed && this.state.randFactionsBigChoice) {
			player1 = General.list(General.randomFromArray(choice, 2));
			player2 = General.list(General.randomFromArray(choice, 2));
			player3 = General.list(General.randomFromArray(choice, 2));
			player4 = General.list(General.randomFromArray(choice, 2));
		}
		else {
			var players = General.randomFromArray(choice, 4);
			player1 = players[0];
			player2 = players[1];
			player3 = players[2];
			player4 = players[3];
		}

		// deck
		choice = [];
		if (this.state.randDeckNewEra) {
			choice.push(this.language.decks[1]);
		}
		if (this.state.randDeckWinter) {
			choice.push(this.language.decks[2]);
		}
		if (this.state.randDeckScavengers) {
			choice.push(this.language.decks[3]);
		}
		if (this.state.randDeckAllies) {
			choice.push(this.language.decks[4]);
		}
		var chosen = General.random(1, choice.length);
		decks = General.list([this.language.decks[0], this.language.decks[chosen]]);

		// addons
		var tempAddons = [];
		if (this.state.randAddonsCities && General.randomBool()) {
			tempAddons.push(this.language.addons[1]);
		}
		if (this.state.randAddonsBorderTiles && General.randomBool()) {
			tempAddons.push(this.language.addons[2]);
		}
		if (this.state.randAddonsArena && General.randomBool()) {
			tempAddons.push(this.language.addons[3]);
		}
		if (tempAddons.length == 0) {
			tempAddons.push(this.language.addons[0]);
		}
		addons = General.list(tempAddons);

		this.results.player1 = player1;
		this.results.player2 = player2;
		this.results.player3 = player3;
		this.results.player4 = player4;
		this.results.decks = decks;
		this.results.addons = addons;

		// show 'em
		let newState;
		newState = Object.assign({}, this.state, { showResults: true });
		this.setState(newState);
	}

	//#endregion
}

export default X51stState;