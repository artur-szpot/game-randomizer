import React from 'react'
import { Game, GameProps, ComponentBehaviors } from '../Game'
import General from '../../general/General'
import { Line } from '../../components/Line'

interface X51stStateResults {
	players: number[][]
	playerOrder: number[]
	hiddenPlayerOrder: boolean
	decks: number[]
	addons: number[]
}

class X51stState extends Game {
	//==================================================================================================================================
	//#region === variable structure (generated)

	constructor(props: GameProps) {
		super(props)
		this.state = {
			showResults: false,
			yesno: {
				randFactions: [{ yes: true }],
				randFactionsBigChoice: [{ yes: true }],
				randFactionsTexas: [{ yes: true }],
				randFactionsMississippi: [{ yes: true }],
				randDeckWinter: [{ yes: true }],
				randDeckNewEra: [{ yes: true }],
				randDeckScavengers: [{ yes: true }],
				randDeckAllies: [{ yes: true }],
				randAddons: [{
					yes: true,
					behaviors: [
						{ type: ComponentBehaviors.HIDELIST, target: 'randAddonsCities', index: 0 },
						{ type: ComponentBehaviors.HIDELIST, target: 'randAddonsBorderTiles', index: 0 },
						{ type: ComponentBehaviors.HIDELIST, target: 'randAddonsArena', index: 0 }
					]
				}],
			},
			plusminus: {
				playerCount: [{
					minMaxCurr: {
						min: 2,
						max: 4,
						current: 2
					}
				}],
			},
			multistate: {
				randAddonsCities: [{
					current: 1,
					showList: false
				}],
				randAddonsBorderTiles: [{
					current: 1,
					showList: false
				}],
				randAddonsArena: [{
					current: 1,
					showList: false
				}],
			},
		}
		this.setLanguage()
	}

	results: X51stStateResults = {
		players: [],
		playerOrder: [],
		hiddenPlayerOrder: false,
		decks: [],
		addons: [],
	}

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() {
		return (
			<>
				<Line {...this.shortCategory('factions')} />
				<Line {...this.shortPlusMinus('playerCount')} />
				<Line {...this.shortYesNo('randFactions')} />
				<Line {...this.shortYesNo('randFactionsBigChoice', this.yesNoValue('randFactions') && this.isBigChoiceAllowed())} />
				<Line {...this.shortYesNo('randFactionsTexas', this.yesNoValue('randFactions'))} />
				<Line {...this.shortYesNo('randFactionsMississippi', this.yesNoValue('randFactions'))} />
				<Line {...this.shortCategory('decks')} />
				<Line {...this.shortYesNo('randDeckWinter')} />
				<Line {...this.shortYesNo('randDeckNewEra')} />
				<Line {...this.shortYesNo('randDeckScavengers')} />
				<Line {...this.shortYesNo('randDeckAllies')} />
				<Line {...this.shortCategory('addons')} />
				<Line {...this.shortYesNo('randAddons')} />
				<Line {...this.shortRandomChance('randAddonsCities', this.yesNoValue('randAddons'))} />
				<Line {...this.shortRandomChance('randAddonsBorderTiles', this.yesNoValue('randAddons'))} />
				<Line {...this.shortRandomChance('randAddonsArena', this.yesNoValue('randAddons'))} />
				{this.createOptionsButtons()}
			</>
		)
	}

	renderResults() {
		let resPlayers: string[][] = this.results.players.map(e => e.map(el => this.language.specificArrays.factions[el]))
		let resPlayerOrder: string[] = this.results.playerOrder.map(e => this.language.specificArrays.factions[e])
		let resPlayerOrderHidden: string = this.results.hiddenPlayerOrder ? this.language.specifics.playerOrderHidden : ''
		let resPlayerOrderUnhide: () => void = () => { 
			this.results.hiddenPlayerOrder = false
			let newState = Object.assign({}, this.state, { showResults: true })
			this.setState(newState)
		}
		let resDecks: string[] = this.results.decks.map(e => this.language.specificArrays.decks[e])
		let resAddons: string[] = this.results.addons.map(e => this.language.specificArrays.addons[e])

		let playersAllLines: JSX.Element[] = []
		for (let i = 0; i < this.language.results.players.length; i++) {
			playersAllLines.push(<Line key={'players-' + i} {...this.shortResult(this.language.results.players[i], resPlayers[i], i < this.plusMinusValue('playerCount').current)} />)
		}

		return (
			<>
				<Line {...this.shortResult(this.commonLanguage.playerOrder[0], resPlayerOrder, true, resPlayerOrderHidden, resPlayerOrderUnhide)} />
				{playersAllLines}
				<Line {...this.shortResult(this.language.results.decks[0], resDecks)} />
				<Line {...this.shortResult(this.language.results.addons[0], resAddons, this.yesNoValue('randAddons'))} />
				{this.createResultsButtons()}
			</>
		)
	}

	//#endregion
	//==================================================================================================================================
	//#region === randomizer

	randomize() {
		let players: number[][] = []
		let playerOrder: number[] = []
		let hiddenPlayerOrder: boolean = false
		let decks: number[] = []
		let addons: number[] = []

		// player factions
		let choice: number[] = []
		for (let i = 0; i < 4; i++) {
			choice.push(i)
		}
		if (this.yesNoValue('randFactionsTexas')) {
			choice.push(4)
			choice.push(5)
		}
		if (this.yesNoValue('randFactionsMississippi')) {
			choice.push(6)
			choice.push(7)
		}
		if (this.yesNoValue('randFactionsBigChoice') && this.isBigChoiceAllowed()) {
			hiddenPlayerOrder = true
			for (let i = 0; i < 4; i++) {
				players[i] = General.randomFromArray(choice, 2)
			}
		}
		else {
			let chosenPlayers: number[] = General.randomFromArray(choice, 4)
			for (let i = 0; i < 4; i++) {
				players[i] = [chosenPlayers[i]]
			}
		}

		// player order
		choice = []
		for (let i = 0; i < this.plusMinusValue('playerCount').current; i++) {
			for (let j of players[i]) {
				choice.push(j)
			}
		}
		playerOrder = General.randomizeArray(choice)

		//deck
		choice = []
		if (this.yesNoValue('randDeckNewEra')) { choice.push(1) }
		if (this.yesNoValue('randDeckWinter')) { choice.push(2) }
		if (this.yesNoValue('randDeckScavengers')) { choice.push(3) }
		if (this.yesNoValue('randDeckAllies')) { choice.push(4) }
		decks = [0, General.random(1, choice.length)]

		// addons
		if (this.randomChanceEvaluate('randAddonsCities')) { addons.push(1) }
		if (this.randomChanceEvaluate('randAddonsBorderTiles')) { addons.push(2) }
		if (this.randomChanceEvaluate('randAddonsArena')) { addons.push(3) }
		if (addons.length === 0) { addons.push(0) }

		this.results.players = players
		this.results.playerOrder = playerOrder
		this.results.hiddenPlayerOrder = hiddenPlayerOrder
		this.results.decks = decks
		this.results.addons = addons

		this.showResults()
	}

	//#endregion
	//==================================================================================================================================
	//#region === additional functions

	isBigChoiceAllowed() {
		let totalFactions = 4
		if (this.yesNoValue('randFactionsTexas')) { totalFactions += 2 }
		if (this.yesNoValue('randFactionsMississippi')) { totalFactions += 2 }
		return totalFactions >= this.plusMinusValue('playerCount').current * 2
	}

	//#endregion
	//==================================================================================================================================
	//#region === language

	setLanguage() {
		this.setCommonLanguage()
		switch (this.props.language.name) {
			case 'Polski':
				this.language = {
					categories: {
						factions: 'Fakcje',
						decks: 'Talie',
						addons: 'Dodatki'
					},
					yesno: {
						randFactions: [{ title: 'Losuj fakcje' }],
						randFactionsBigChoice: [{ title: 'Dwie fakcje do wyboru' }],
						randFactionsTexas: [{ title: 'Fakcje: Texas i Hegemonia' }],
						randFactionsMississippi: [{ title: 'Fakcje: Mississippi i Uniwersytet' }],
						randDeckWinter: [{ title: 'Talia: Zima' }],
						randDeckNewEra: [{ title: 'Talia: Nowa Era' }],
						randDeckScavengers: [{ title: 'Talia: Zgliszcza' }],
						randDeckAllies: [{ title: 'Talia: Sojusznicy' }],
						randAddons: [{ title: 'Dodatki' }],
					},
					plusminus: {
						playerCount: [{ title: 'Liczba graczy' }],
					},
					multistate: {
						randAddonsCities: [{
							title: 'Miasta',
							contents: []
						}],
						randAddonsBorderTiles: [{
							title: 'Płytki graniczne',
							contents: []
						}],
						randAddonsArena: [{
							title: 'Arena',
							contents: []
						}],
					},
					specifics: {
						playerOrderHidden: 'Kliknij tutaj, aby wylosować pierwszeństwo po wyborze fakcji przez graczy.'
					},
					specificArrays: {
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
					},
					results: {
						players: [
							'Gracz 1',
							'Gracz 2',
							'Gracz 3',
							'Gracz 4'
						],
						decks: ['Talie'],
						addons: ['Dodatki'],
					},
				}
				break

			case 'English':
			default:
				this.language = {
					categories: {
						factions: 'Factions',
						decks: 'Decks',
						addons: 'Addons'
					},
					yesno: {
						randFactions: [{ title: 'Randomize factions' }],
						randFactionsBigChoice: [{ title: 'Two factions to choose from' }],
						randFactionsTexas: [{ title: 'Factions: Texas & Hegemony' }],
						randFactionsMississippi: [{ title: 'Factions: Misssissippi & University' }],
						randDeckWinter: [{ title: 'Deck: Winter' }],
						randDeckNewEra: [{ title: 'Deck: New Era' }],
						randDeckScavengers: [{ title: 'Deck: Scavengers' }],
						randDeckAllies: [{ title: 'Deck: Allies' }],
						randAddons: [{ title: 'Addons' }],
					},
					plusminus: {
						playerCount: [{ title: 'Player count' }],
					},
					multistate: {
						randAddonsCities: [{
							title: 'Cities',
							contents: []
						}],
						randAddonsBorderTiles: [{
							title: 'Border Tiles',
							contents: []
						}],
						randAddonsArena: [{
							title: 'Arena',
							contents: []
						}],
					},
					specifics: {
						playerOrderHidden: 'Click here to randomize player order once factions have been chosen.'
					},
					specificArrays: {
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
					},
					results: {
						players: [
							'Player 1',
							'Player 2',
							'Player 3',
							'Player 4'
						],
						decks: ['Decks'],
						addons: ['Addons'],
					},
				}
				break
		}
		this.currentLanguage = this.props.language
	}

	//#endregion
	//==================================================================================================================================
}

export default X51stState