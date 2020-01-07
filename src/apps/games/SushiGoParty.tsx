import React from 'react'
import { Game, GameProps, GameState } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface SushiGoPartyResults {
	nigiri: number
	rolls: number
	appetizers: number[]
	specials: number[]
	dessert: number
	playerOrder: string[]
}

class SushiGoParty extends Game {
	//==================================================================================================================================
	//#region === additional variables

	playerColors = ['red','green','blue']

	//#endregion
	//==================================================================================================================================
	//#region === variable structure (generated)

	constructor(props: GameProps) {
		super(props)
		this.state = this.randomizeState({
			showResults: true,
			yesno: {},
			plusminus: {},
			multistate: {},
		})
		this.setLanguage()
	}

	results: SushiGoPartyResults = {
		nigiri: 0,
		rolls: 0,
		appetizers: [],
		specials: [],
		dessert: 0,
      playerOrder: []
	}

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() { return this.renderResults() }

	renderResults() {
		let resNigiri: string = this.language.specificArrays.nigiri[this.results.nigiri]
		let resRolls: string = this.language.specificArrays.rolls[this.results.rolls]
		let resAppetizers: string = this.results.appetizers.map(e => this.language.specificArrays.appetizers[e]).join(', ')
		let resSpecials: string = this.results.specials.map(e => this.language.specificArrays.specials[e]).join(', ')
		let resDessert: string = this.language.specificArrays.desserts[this.results.dessert]

		return (
			<>
			<Line {...this.colorsResult(this.commonLanguage.playerOrder[0], this.results.playerOrder)} />
				<Line {...this.shortResult(this.language.results.nigiri[0], resNigiri)} />
				<Line {...this.shortResult(this.language.results.rolls[0], resRolls)} />
				<Line {...this.shortResult(this.language.results.appetizers[0], resAppetizers)} />
				<Line {...this.shortResult(this.language.results.specials[0], resSpecials)} />
				<Line {...this.shortResult(this.language.results.dessert[0], resDessert)} />
				{this.createResultsOnlyButtons()}
			</>
		)
	}

	//#endregion
	//==================================================================================================================================
	//#region === language

	setLanguage() {
		this.setCommonLanguage()
		switch (this.props.language.name) {
			case 'Polski':
				this.language = {
					categories: {},
					yesno: {},
					plusminus: {},
					multistate: {},
					specifics: {},
					specificArrays: {
						nigiri: ['Nigiri'],
						rolls: ['Futomaki', 'Uramaki', 'Temaki'],
						appetizers: ['Tempura', 'Sashimi', 'Pierożek Gyoza', 'Węgorz', 'Edamame', 'Onigiri', 'Tofu', 'Zupa Miso'],
						specials: ['Wasabi', 'Pałeczki', 'Łyżeczka', 'Pudełko na wynos', 'Sos sojowy', 'Herbata', 'Menu', 'Zamówienie specjalne'],
						desserts: ['Pudding', 'Lody herbaciane', 'Owoce']
					},
					results: {
						nigiri: ['Nigiri'],
						rolls: ['Rolki'],
						appetizers: ['Przystawki'],
						specials: ['Specjalne'],
						dessert: ['Deser'],
					},
				}
				break

			case 'English':
			default:
				this.language = {
					categories: {},
					yesno: {},
					plusminus: {},
					multistate: {},
					specifics: {},
					specificArrays: {
						nigiri: ['Nigiri'],
						rolls: ['Maki', 'Uramaki', 'Temaki'],
						appetizers: ['Tempura', 'Sashimi', 'Dumpling', 'Eel', 'Edamame', 'Onigiri', 'Tofu', 'Miso soup'],
						specials: ['Wasabi', 'Chopsticks', 'Spoon', 'Takeout box', 'Soy sauce', 'Tea', 'Menu', 'Special order'],
						desserts: ['Pudding', 'Green tea ice cream', 'Fruit']
					},
					results: {
						nigiri: ['Nigiri'],
						rolls: ['Rolls'],
						appetizers: ['Appetizers'],
						specials: ['Specials'],
						dessert: ['Dessert'],
					},
				}
				break
		}
		this.currentLanguage = this.props.language
	}

	//#endregion
	//==================================================================================================================================
	//#region === randomizer

	randomize() {
		this.setState(this.randomizeState(this.state))
	}

	randomizeState(currentState: GameState) {
		let nigiri: number = 0
		let rolls: number = 0
		let appetizers: number[] = []
		let specials: number[] = []
		let dessert: number = 0

		rolls = General.random(0, 2)
		dessert = General.random(0, 2)

		let indices = [0, 1, 2, 3, 4, 5, 6, 7]
		appetizers = General.randomFromArray(indices, 3)

		indices = [0, 1, 2, 3, 4, 5, 6, 7]
		specials = General.randomFromArray(indices, 2)

		this.results.nigiri = nigiri
		this.results.rolls = rolls
		this.results.appetizers = appetizers
		this.results.specials = specials
		this.results.dessert = dessert

		// randomize player order
		this.results.playerOrder = General.randomizeArray(this.playerColors.slice())

		let newState = Object.assign({}, currentState, { showResults: true })// !currentState.showResults })
		return newState
	}

	//#endregion
	//==================================================================================================================================
	//#region === additional functions

	// n/a

	//#endregion
	//==================================================================================================================================
}

export default SushiGoParty