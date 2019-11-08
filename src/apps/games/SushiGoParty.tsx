import React from 'react';
import { Game, GameProps, GameState } from '../Game';
import General from '../../general/General';
import {Line} from '../../components/Line';

interface SushiGoPartyResults {
	nigiri: number;
	rolls: number;
	appetizers: number[];
	specials: number[];
	dessert: number;
}

class SushiGoParty extends Game {
	//==================================================================================================================================
	//#region === additional variables

	// n/a

	//#endregion
	//==================================================================================================================================
	//#region === variable structure (generated)

	constructor(props: GameProps) {
		super(props);
		this.state = this.randomizeState({
			showResults: false,
			opts: {}
		});
		this.setLanguage();
	}

	results: SushiGoPartyResults = {
		nigiri: 0,
		rolls: 0,
		appetizers: [],
		specials: [],
		dessert: 0,
	};

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() { return this.renderResults(); }

	renderResults() {
		let resNigiri: string = this.language.specificArrays.nigiri[this.results.nigiri];
		let resRolls: string = this.language.specificArrays.rolls[this.results.rolls];
		let resAppetizers: string = this.results.appetizers.map(e => this.language.specificArrays.appetizers[e]).join(', ');
		let resSpecials: string = this.results.specials.map(e => this.language.specificArrays.specials[e]).join(', ');
		let resDessert: string = this.language.specificArrays.desserts[this.results.dessert];

		return (
			<>
				<Line {...this.shortCategory(this.language.results.nigiri, resNigiri)} />
				<Line {...this.shortCategory(this.language.results.rolls, resRolls)} />
				<Line {...this.shortCategory(this.language.results.appetizers, resAppetizers)} />
				<Line {...this.shortCategory(this.language.results.specials, resSpecials)} />
				<Line {...this.shortCategory(this.language.results.dessert, resDessert)} />
				{this.createResultOnlyButtons()}
			</>
		);
	}

	//#endregion
	//==================================================================================================================================
	//#region === language

	setLanguage() {
		this.setCommonLanguage();
		switch (this.props.language.name) {
			case 'Polski':
				this.language.categories = {};
				this.language.opts = {};
				this.language.optArrays = {};
				this.language.specifics = {};
				this.language.specificArrays = {
					nigiri: ['Nigiri'],
					rolls: ['Futomaki', 'Uramaki', 'Temaki'],
					appetizers: ['Tempura', 'Sashimi', 'Pierożek Gyoza', 'Węgorz', 'Edamame', 'Onigiri', 'Tofu', 'Zupa Miso'],
					specials: ['Wasabi', 'Pałeczki', 'Łyżeczka', 'Pudełko na wynos', 'Sos sojowy', 'Herbata', 'Menu', 'Zamówienie specjalne'],
					desserts: ['Pudding', 'Lody herbaciane', 'Owoce']
				}
				this.language.results = {
					nigiri: 'Nigiri',
					rolls: 'Rolki',
					appetizers: 'Przystawki',
					specials: 'Specjalne',
					dessert: 'Deser',
				};
				break;

			case 'English':
			default:
				this.language.categories = {};
				this.language.opts = {};
				this.language.optArrays = {};
				this.language.specifics = {};
				this.language.specificArrays = {
					nigiri: ['Nigiri'],
					rolls: ['Maki', 'Uramaki', 'Temaki'],
					appetizers: ['Tempura', 'Sashimi', 'Dumpling', 'Eel', 'Edamame', 'Onigiri', 'Tofu', 'Miso soup'],
					specials: ['Wasabi', 'Chopsticks', 'Spoon', 'Takeout box', 'Soy sauce', 'Tea', 'Menu', 'Special order'],
					desserts: ['Pudding', 'Green tea ice cream', 'Fruit']
				}
				this.language.results = {
					nigiri: 'Nigiri',
					rolls: 'Rolls',
					appetizers: 'Appetizers',
					specials: 'Specials',
					dessert: 'Dessert',
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
		this.setState(this.randomizeState(this.state));
	}

	randomizeState(currentState: GameState) {
		let nigiri: number = 0;
		let rolls: number = 0;
		let appetizers: number[] = [];
		let specials: number[] = [];
		let dessert: number = 0;

		rolls = General.random(0, 2);
		dessert = General.random(0, 2);

		let indices = [0, 1, 2, 3, 4, 5, 6, 7];
		appetizers = General.randomFromArray(indices, 3);

		indices = [0, 1, 2, 3, 4, 5, 6, 7];
		specials = General.randomFromArray(indices, 3);

		this.results.nigiri = nigiri;
		this.results.rolls = rolls;
		this.results.appetizers = appetizers;
		this.results.specials = specials;
		this.results.dessert = dessert;

		let newState = Object.assign({}, currentState, { showResults: !currentState.showResults });
		return newState;
	}

	//#endregion
	//==================================================================================================================================
	//#region === additional functions

	// n/a

	//#endregion
	//==================================================================================================================================
}

export default SushiGoParty;


// import React from 'react';
// import General from '../general/General';
// import Line from '../line/Line';

// class SushiGoParty extends React.Component {
// 	//#region === generated functions

// 	// language 
// 	currentLanguage = this.props.language;
// 	language = {};

// 	// functions
// 	functions = {
// 		// big buttons
// 		onClickRandomize: () => this.randomize(false),
// 		onClickOptions: () => this.showOptions(),
// 	};

// 	//#endregion
// 	//#region === additional variables

// 	//#endregion
// 	//#region === initial settings

// 	constructor(props) {
// 		super(props);
// 		this.setLanguage();
// 		this.randomize(true);
// 	}

// 	//#endregion
// 	//#region === renders

// 	render() {
// 		if (this.props.language !== this.currentLanguage) {
// 			this.setLanguage();
// 		}
// 		if (this.state.results.nigiri === null) {
// 			return;
// 		}

// 		let resNigiri = this.language.opts.nigiri[this.state.results.nigiri];
// 		let resRolls = this.language.opts.rolls[this.state.results.rolls];
// 		let resAppetizersTemp = [];
// 		for (let i = 0; i < this.state.results.appetizers.length; i++) {
// 			resAppetizersTemp.push(this.language.opts.appetizers[this.state.results.appetizers[i]]);
// 		}
// 		let resAppetizers = resAppetizersTemp.join(', ');
// 		let resSpecialsTemp = [];
// 		for (let i = 0; i < this.state.results.specials.length; i++) {
// 			resSpecialsTemp.push(this.language.opts.specials[this.state.results.specials[i]]);
// 		}
// 		let resSpecials = resSpecialsTemp.join(', ');
// 		let resDessert = this.language.opts.desserts[this.state.results.dessert];

// 		return (
// 			<>
// 				<Line
// 					lineType='Category'
// 					text={this.language.results.nigiri}
// 					subtext={resNigiri}
// 					list={false}
// 					visible={true}
// 				/>
// 				<Line
// 					lineType='Category'
// 					text={this.language.results.rolls}
// 					subtext={resRolls}
// 					list={false}
// 					visible={true}
// 				/>
// 				<Line
// 					lineType='Category'
// 					text={this.language.results.appetizers}
// 					subtext={resAppetizers}
// 					list={false}
// 					visible={true}
// 				/>
// 				<Line
// 					lineType='Category'
// 					text={this.language.results.specials}
// 					subtext={resSpecials}
// 					list={false}
// 					visible={true}
// 				/>
// 				<Line
// 					lineType='Category'
// 					text={this.language.results.dessert}
// 					subtext={resDessert}
// 					list={false}
// 					visible={true}
// 				/>
// 				<Line
// 					lineType='BigButton'
// 					text={this.language.opts.rerandomize}
// 					color='green'
// 					onClick={this.functions.onClickRandomize}
// 					first={true}
// 				/>
// 				<Line
// 					lineType='BigButton'
// 					text={this.language.opts.home}
// 					color='red'
// 					onClick={this.props.onClickHome}
// 				/>
// 			</>
// 		);
// 	}

// 	//#endregion
// 	//#region === language

// 	setLanguage() {
// 		switch (this.props.language.name) {
// 			case "Polski":
// 				this.language.opts = {
// 					rerandomize: 'Losuj ponownie',
// 					home: 'Powrót do menu',
// 					nigiri: ['Nigiri'],
// 					rolls: ['Futomaki', 'Uramaki', 'Temaki'],
// 					appetizers: ['Tempura', 'Sashimi', 'Pierożek Gyoza', 'Węgorz', 'Edamame', 'Onigiri', 'Tofu', 'Zupa Miso'],
// 					specials: ['Wasabi', 'Pałeczki', 'Łyżeczka', 'Pudełko na wynos', 'Sos sojowy', 'Herbata', 'Menu', 'Zamówienie specjalne'],
// 					desserts: ['Pudding', 'Lody herbaciane', 'Owoce']
// 				}
// 				this.language.results = {
// 					nigiri: 'Nigiri',
// 					rolls: 'Rolki',
// 					appetizers: 'Przystawki',
// 					specials: 'Specjalne',
// 					dessert: 'Deser',
// 				}
// 				break;

// 			case "English":
// 			default:
// 				this.language.opts = {
// 					rerandomize: 'Randomize again',
// 					home: 'Home',
// 					nigiri: ['Nigiri'],
// 					rolls: ['Maki', 'Uramaki', 'Temaki'],
// 					appetizers: ['Tempura', 'Sashimi', 'Dumpling', 'Eel', 'Edamame', 'Onigiri', 'Tofu', 'Miso soup'],
// 					specials: ['Wasabi', 'Chopsticks', 'Spoon', 'Takeout box', 'Soy sauce', 'Tea', 'Menu', 'Special order'],
// 					desserts: ['Pudding', 'Green tea ice cream', 'Fruit']
// 				}
// 				this.language.results = {
// 					nigiri: 'Nigiri',
// 					rolls: 'Rolls',
// 					appetizers: 'Appetizers',
// 					specials: 'Specials',
// 					dessert: 'Dessert',
// 				}
// 				break;
// 		}
// 		this.currentLanguage = this.props.language;
// 	}

// 	//#endregion
// 	//#region === randomizer

// 	randomize(firstRun) {
// 		// generate results
// 		let nigiri = 0;
// 		let rolls = General.random(0, 2);
// 		let appetizers;
// 		let specials;
// 		let dessert = General.random(0, 2);

// 		// randomize
// 		let indices = [0, 1, 2, 3, 4, 5, 6, 7];
// 		appetizers = General.randomFromArray(indices, 3);
// 		indices = [0, 1, 2, 3, 4, 5, 6, 7];
// 		specials = General.randomFromArray(indices, 3);

// 		// save them
// 		let results = {
// 			nigiri: null,
// 			rolls: null,
// 			appetizers: null,
// 			specials: null,
// 			dessert: null,
// 		}
// 		results.nigiri = nigiri;
// 		results.rolls = rolls;
// 		results.appetizers = appetizers;
// 		results.specials = specials;
// 		results.dessert = dessert;

// 		// show 'em
// 		if (firstRun) {
// 			this.state = {
// 				results: results
// 			}
// 		} else {
// 			let newState;
// 			newState = Object.assign({}, this.state, { results: results });
// 			this.setState(newState);
// 		}
// 	}

// 	//#endregion
// }

// export default SushiGoParty;