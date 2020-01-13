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
}

class SushiGoParty extends Game {
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
		dessert: 0
	}

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() { return this.renderResults() }

	renderResults() {
		let resNigiri: string = this.language.specificArrays.nigiri[this.results.nigiri].content
		let resRolls: string = this.language.specificArrays.rolls[this.results.rolls].content
		let resAppetizers: string = this.results.appetizers.map(e => this.language.specificArrays.appetizers[e].content).join(', ')
		let resSpecials: string = this.results.specials.map(e => this.language.specificArrays.specials[e].content).join(', ')
		let resDessert: string = this.language.specificArrays.desserts[this.results.dessert].content

		return (
			<>
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

		let newState = Object.assign({}, currentState, { showResults: true })// !currentState.showResults })
		return newState
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
						nigiri: [
							{ content: 'Nigiri', tag: '' },
						],
						rolls: [
							{ content: 'Futomaki', tag: '' },
							{ content: 'Uramaki', tag: '' },
							{ content: 'Temaki', tag: '' },
						],
						appetizers: [
							{ content: 'Tempura', tag: '' },
							{ content: 'Sashimi', tag: '' },
							{ content: 'Pierożek Gyoza', tag: '' },
							{ content: 'Węgorz', tag: '' },
							{ content: 'Edamame', tag: '' },
							{ content: 'Onigiri', tag: '' },
							{ content: 'Tofu', tag: '' },
							{ content: 'Zupa Miso', tag: '' },
						],
						specials: [
							{ content: 'Wasabi', tag: '' },
							{ content: 'Pałeczki', tag: '' },
							{ content: 'Łyżeczka', tag: '' },
							{ content: 'Pudełko na wynos', tag: '' },
							{ content: 'Sos sojowy', tag: '' },
							{ content: 'Herbata', tag: '' },
							{ content: 'Menu', tag: '' },
							{ content: 'Zamówienie specjalne', tag: '' },
						],
						desserts: [
							{ content: 'Pudding', tag: '' },
							{ content: 'Lody herbaciane', tag: '' },
							{ content: 'Owoce', tag: '' },
						]
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
						nigiri: [
							{ content: 'Nigiri', tag: '' },
						],
						rolls: [
							{ content: 'Maki', tag: '' },
							{ content: 'Uramaki', tag: '' },
							{ content: 'Temaki', tag: '' },
						],
						appetizers: [
							{ content: 'Tempura', tag: '' },
							{ content: 'Sashimi', tag: '' },
							{ content: 'Dumpling', tag: '' },
							{ content: 'Eel', tag: '' },
							{ content: 'Edamame', tag: '' },
							{ content: 'Onigiri', tag: '' },
							{ content: 'Tofu', tag: '' },
							{ content: 'Miso soup', tag: '' },
						],
						specials: [
							{ content: 'Wasabi', tag: '' },
							{ content: 'Chopsticks', tag: '' },
							{ content: 'Spoon', tag: '' },
							{ content: 'Takeout box', tag: '' },
							{ content: 'Soy sauce', tag: '' },
							{ content: 'Tea', tag: '' },
							{ content: 'Menu', tag: '' },
							{ content: 'Special order', tag: '' },
						],
						desserts: [
							{ content: 'Pudding', tag: '' },
							{ content: 'Green tea ice cream', tag: '' },
							{ content: 'Fruit', tag: '' },
						]
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
}

export default SushiGoParty