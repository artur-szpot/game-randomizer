import React from 'react';
import { Game, GameProps, ComponentBehaviors } from '../Game';
import General from '../../general/General';
import { Line } from '../../components/Line';

interface NearAndFarResults {
	map: number
	dawnDusk: number
	addCamps: number
	bosses: number[]
	quests: (string | number)[]
	playerOrder: string[]
}

class NearAndFar extends Game {
	//==================================================================================================================================
	//#region === additional variables

	playerColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00']

	questBase = [
		[["B", "D", "H", "M"], ["A", "C", "E", "F", "G", "I", "J", "K", "L", "N", "O", "P"]],
		[[1, 3, 4, 10, 13, 15], [2, 5, 6, 7, 8, 9, 11, 12, 14, 16]],
		[[20, 23, 27, 28], [17, 18, 19, 21, 22, 24, 25, 26, 29, 30, 31, 32]],
		[[33, 34, 37, 40, 43, 44, 48], [35, 36, 38, 39, 41, 42, 45, 46, 47]],
		[[51, 54, 59, 60, 63], [49, 50, 52, 53, 55, 56, 57, 58, 61, 62, 64]],
		[[69, 70, 72, 76, 78, 79, 80], [65, 66, 67, 68, 71, 73, 74, 75, 77]],
		[[81, 85, 87, 88, 89, 94], [82, 83, 84, 86, 90, 91, 92, 93, 95, 96]],
		[[98, 105, 106, 108, 110, 111], [97, 99, 100, 101, 102, 103, 104, 107, 109, 112]],
		[[115, 117, 118, 119, 123, 126, 128], [113, 114, 116, 120, 121, 122, 124, 125, 127]],
		[[133, 138, 141, 145], [130, 131, 132, 134, 135, 136, 137, 139, 140, 142, 143, 144]],
		[[146, 147, 148, 150, 152, 153, 158], [149, 151, 154, 155, 156, 157, 159, 160, 161]]
	];

	//#endregion
	//==================================================================================================================================
	//#region === variable structure (generated)

	constructor(props: GameProps) {
		super(props);
		this.state = {
			showResults: false,
			yesno: {
				longerGV: [{ yes: false }],
				randMap: [{
					yes: true,
					behaviors: [
						{ type: ComponentBehaviors.HIDELIST, target: 'mapSubset', index: 0 },
						{ type: ComponentBehaviors.HIDELIST, target: 'map', index: 0 }
					]
				}],
				prioritizeNS: [{ yes: false }],
				randBosses: [{ yes: true }],
				randCamps: [{ yes: true }],
			},
			plusminus: {
				playerCount: [{ minMaxCurr: { min: 2, max: 4, current: 2 } }],
				addCampsMin: [{
					minMaxCurr: { min: 0, max: 3, current: 0 },
					behaviors: [{ type: ComponentBehaviors.MINMAX_MIN, target: 'addCampsMax', index: 0 }]
				}],
				addCampsMax: [{
					minMaxCurr: { min: 1, max: 4, current: 4 },
					behaviors: [{ type: ComponentBehaviors.MINMAX_MAX, target: 'addCampsMin', index: 0 }],
				}],
			},
			multistate: {
				mapSubset: [{ current: 1, showList: false }],
				map: [{ current: 0, showList: false }],
			}
		};
		this.setLanguage();
	}

	results: NearAndFarResults = {
		map: 0,
		dawnDusk: 0,
		addCamps: 0,
		bosses: [],
		quests: [],
		playerOrder: []
	};

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() {
		let lastRuinVisible;
		if (this.state.yesno.randMap[0].yes) {
			lastRuinVisible = this.multiStateValue('mapSubset').current > 1;
		} else {
			lastRuinVisible = this.multiStateValue('map').current === 10;
		}

		return (
			<>
				<Line {...this.shortCategory('general')} />
				<Line {...this.shortPlusMinus('playerCount')} />
				<Line {...this.shortYesNo('longerGV')} />
				<Line {...this.shortCategory('map')} />
				<Line {...this.shortYesNo('randMap')} />
				<Line {...this.shortMultiState('mapSubset', this.yesNoValue('randMap'))} />
				<Line {...this.shortMultiState('map', !this.yesNoValue('randMap'))} />
				<Line {...this.shortYesNo('prioritizeNS')} />
				<Line {...this.shortYesNo('randBosses', lastRuinVisible)} />
				<Line {...this.shortCategory('camps')} />
				<Line {...this.shortYesNo('randCamps')} />
				<Line {...this.shortPlusMinus('addCampsMin', this.yesNoValue('randCamps'))} />
				<Line {...this.shortPlusMinus('addCampsMax', this.yesNoValue('randCamps'))} />
				{this.createOptionsButtons()}
			</>
		);

	}

	renderResults() {
		const resMap: string = this.language.multistate.map[0].contents[this.results.map - 1]
		const resTown: string = this.language.specificArrays.dawnDusk[this.results.dawnDusk]
		const resQuests: string = this.results.quests.join(', ')
		const resBosses: string = General.listWithIndices(this.language.specificArrays.bosses, this.results.bosses)
		const visBosses: boolean = this.results.map === 11
		const resAddCamps: string = String(this.results.addCamps)

		return (
			<>
				<Line {...this.colorsResult(this.commonLanguage.playerOrder[0], this.results.playerOrder)} />
				<Line {...this.shortResult(this.language.results.map[0], resMap)} />
				<Line {...this.shortResult(this.language.results.town[0], resTown)} />
				<Line {...this.shortResult(this.language.results.addCamps[0], resAddCamps, this.yesNoValue('randCamps'))} />
				<Line {...this.shortResult(this.language.results.quests[0], resQuests)} />
				<Line {...this.shortResult(this.language.results.bosses[0], resBosses, visBosses)} />
				{this.createResultsButtons()}
			</>
		);
	}

	//#endregion
	//==================================================================================================================================
	//#region === randomizer

	randomize() {
		// select map
		let map: number = 0;
		if (this.yesNoValue('randMap')) {
			switch (this.multiStateValue('mapSubset').current) {
				case 0: map = 1; break;
				case 1: map = General.random(2, 10); break;
				case 2: map = 11; break;
				case 3: map = General.random(1, 11); break;
				default: alert("Unexpected value of mapSubset!"); break;
			}
		}
		else {
			map = this.multiStateValue('map').current;
		}

		// select town variant
		let dawnDusk: number = General.random(0, 1);

		// select additional camps
		let addCamps: number = General.random(
			this.plusMinusValue('addCampsMin').current,
			this.plusMinusValue('addCampsMax').current,
		);

		// select bosses
		let choice: (string | number)[] = [0, 1, 2, 3];
		let bosses: number[] = General.randomFromArray(choice, this.plusMinusValue('playerCount').current);

		// select quests
		let totalQuests: number = 0;
		let quests: (number | string)[] = [];
		switch (this.plusMinusValue('playerCount').current) {
			case 2: totalQuests = 7; break;
			case 3: totalQuests = 9; break;
			case 4: totalQuests = 11; break;
			default: alert('Unexpected value of playerCount!'); break;
		}
		if (this.yesNoValue('longerGV')) { totalQuests += 2; }

		if (this.yesNoValue('prioritizeNS')) {
			quests = [...this.questBase[map - 1][0]];
			choice = [...this.questBase[map - 1][1]];
		}
		else {
			choice = [...this.questBase[map - 1][0]].concat(this.questBase[map - 1][1]);
		}
		quests = quests.concat(General.randomFromArray(choice, totalQuests - quests.length));
		if (map === 1) {
			quests = quests.sort();
		} else {
			quests = (quests as number[]).sort((a, b) => a - b);
		}

		this.results.map = map;
		this.results.dawnDusk = dawnDusk;
		this.results.addCamps = addCamps;
		this.results.bosses = bosses;
		this.results.quests = quests;

		// randomize player order
		this.results.playerOrder = General.randomizeArray(this.playerColors.slice())

		this.showResults()
	}

	//#endregion
	//==================================================================================================================================
	//#region === additional functions

	// n/a

	//#endregion
	//==================================================================================================================================
	//#region === language

	setLanguage() {
		this.setCommonLanguage();
		switch (this.props.language.name) {
			case 'Polski':
				this.language = {
					categories: {
						general: 'Ogólne',
						map: 'Mapa',
						camps: 'Dodatkowe obozowiska'
					},
					yesno: {
						longerGV: [{ title: 'Wariant: dłuższa gra' }],
						randMap: [{ title: 'Losować mapę?' }],
						prioritizeNS: [{ title: 'Wybierać w pierwszej kolejności nazwane pola?' }],
						randBosses: [{ title: 'Ostatnia Ruina: losować bossów?' }],
						randCamps: [{ title: 'Dodatkowe losowe obozowiska?' }],
					},
					plusminus: {
						playerCount: [{ title: 'Liczba graczy' }],
						addCampsMin: [{ title: 'Minimum' }],
						addCampsMax: [{ title: 'Maksimum' }],
					},
					multistate: {
						mapSubset: [{
							title: 'Zestaw map do wyboru',
							contents: ['Wstęp (mapa 1)',
								'Podróż (mapy 2-10)',
								'Ostatnia Ruina (mapa 11)',
								'Wszystkie mapy']
						}],
						map: [{
							title: 'Wybrana mapa',
							contents: ['1: Glogo Caverns',
								'2: Broken Plains',
								'3: Crimson Forest',
								'4: Meteor Mountain',
								'5: Toxic Desert',
								'6: Cloudy Valley',
								'7: Dried Sea',
								'8: Fire Delta',
								'9: Rocktooth Isles',
								'10: Mammoth Jungle',
								'11: The Last Ruin']
						}]
					},
					specifics: {},
					specificArrays: {
						dawnDusk: ['świt', 'zmierzch'],
						bosses: ['Captain Shreya', 'Zag the Treasure Hunter', 'The Ivory Queen', ' The Red King'],
					},
					results: {
						map: ['Mapa:'],
						town: ['Wariant miasta:'],
						addCamps: ['Dodatkowe obozowiska:'],
						quests: ['Misje:'],
						bosses: ['Bossowie:']
					}
				};
				break;

			case 'English':
			default:
				this.language = {
					categories: {
						general: 'General',
						map: 'Map',
						camps: 'Additional camps'
					},
					yesno: {
						longerGV: [{ title: 'Longer game variant' }],
						randMap: [{ title: 'Randomize map?' }],
						prioritizeNS: [{ title: 'Prioritize named spaces?' }],
						randBosses: [{ title: 'Last Ruin: randomize bosses?' }],
						randCamps: [{ title: 'Randomize additional camps?' }],
					},
					plusminus: {
						playerCount: [{ title: 'Player count' }],
						addCampsMin: [{ title: 'Minimum' }],
						addCampsMax: [{ title: 'Maximum' }],
					},
					multistate: {
						mapSubset: [{
							title: 'Map subset',
							contents: ['Introductory (1)',
								'Journey (2-10)',
								'Last Ruin (11)',
								'All maps']
						}],
						map: [{
							title: 'Chosen map',
							contents: ['1: Glogo Caverns',
								'2: Broken Plains',
								'3: Crimson Forest',
								'4: Meteor Mountain',
								'5: Toxic Desert',
								'6: Cloudy Valley',
								'7: Dried Sea',
								'8: Fire Delta',
								'9: Rocktooth Isles',
								'10: Mammoth Jungle',
								'11: The Last Ruin']
						}]
					},
					specifics: {},
					specificArrays: {
						dawnDusk: ['dawn', 'dusk'],
						bosses: ['Captain Shreya', 'Zag the Treasure Hunter', 'The Ivory Queen', ' The Red King'],
					},
					results: {
						map: ['Map:'],
						town: ['Town:'],
						addCamps: ['Additional camps:'],
						quests: ['Quests:'],
						bosses: ['Bosses:']
					}
				};
				break;
		}
		this.currentLanguage = this.props.language;
	}

	//#endregion
	//==================================================================================================================================
}

export default NearAndFar;