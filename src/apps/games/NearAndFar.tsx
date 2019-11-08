import React from 'react';
import { Game, GameProps, GameState } from '../Game';
import General from '../../general/General';
import {Line} from '../../components/Line';

interface NearAndFarResults {
	map: number;
	dawnDusk: number;
	addCamps: number;
	bosses: number[];
	quests: (string | number)[];
}

class NearAndFar extends Game {
	//==================================================================================================================================
	//#region === additional variables

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
			opts: {
				longerGV: false,
				randMap: true,
				prioritizeNS: false,
				randBosses: true,
				randCamps: true,
				mapSubset: 1,
				mapSubsetList: false,
				map: 0,
				mapList: false,
				playerCount: [2, 4, 2],
				addCampsMin: [0, 3, 0],
				addCampsMax: [1, 4, 4],
			}
		};
		this.setLanguage();
	}

	results: NearAndFarResults = {
		map: 0,
		dawnDusk: 0,
		addCamps: 0,
		bosses: [],
		quests: []
	};

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() {
		let lastRuinVisible;
		if (this.state.opts.randMap) {
			lastRuinVisible = this.state.opts.mapSubset > 1;
		} else {
			lastRuinVisible = this.state.opts.map === 10;
		}

		return (
			<>
				<Line {...this.shortCategory('general')} />
				<Line {...this.shortPlusMinus('playerCount')} />
				<Line {...this.shortYesNo('longerGV')} />
				<Line {...this.shortCategory('map')} />
				<Line {...this.shortYesNo('randMap')} />
				<Line {...this.shortMultiState('mapSubset', this.state.opts.randMap)} />
				<Line {...this.shortMultiState('map', !this.state.opts.randMap)} />
				<Line {...this.shortYesNo('prioritizeNS')} />
				<Line {...this.shortYesNo('randBosses', lastRuinVisible)} />
				<Line {...this.shortCategory('camps')} />
				<Line {...this.shortYesNo('randCamps')} />
				<Line {...this.shortPlusMinus('addCampsMin', this.state.opts.randCamps)} />
				<Line {...this.shortPlusMinus('addCampsMax', this.state.opts.randCamps)} />
				{this.createMainButtons()}
			</>
		);

	}

	renderResults() {
		let resMap: string = this.language.optArrays.maps[this.results.map - 1];
		let resTown: string = this.language.specificArrays.dawnDusk[this.results.dawnDusk];
		let resQuests: string = this.results.quests.join(', ');
		let resBosses: string = General.listWithIndices(this.language.specificArrays.bosses, this.results.bosses);
		let visBosses: boolean = this.results.map === 11;
		let resAddCamps: string = String(this.results.addCamps);

		return (
			<>
				<Line {...this.shortCategory(this.language.results.map, resMap)} />
				<Line {...this.shortCategory(this.language.results.town, resTown)} />
				<Line {...this.shortCategory(this.language.results.addCamps, resAddCamps,  false, this.state.opts.randCamps)} />
				<Line {...this.shortCategory(this.language.results.quests, resQuests)} />
				<Line {...this.shortCategory(this.language.results.bosses, resBosses, false, visBosses)} />
				{this.createAllButtons()}
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
				this.language.categories = {
					general: 'Ogólne',
					map: 'Mapa',
					camps: 'Dodatkowe obozowiska'
				}
				this.language.opts = {
					playerCount: 'Liczba graczy',
					longerGV: 'Wariant: dłuższa gra',
					randMap: 'Losować mapę?',
					mapSubset: 'Zestaw map do wyboru',
					map: 'Wybrana mapa',
					prioritizeNS: 'Wybierać w pierwszej kolejności nazwane pola?',
					randBosses: 'Ostatnia Ruina: losować bossów?',
					randCamps: 'Dodatkowe losowe obozowiska?',
					addCampsMin: 'Minimum',
					addCampsMax: 'Maksimum',
					randomize: 'Losuj',
					rerandomize: 'Losuj ponownie',
					home: 'Powrót do menu',
					options: 'Zmień opcje',
				}
				this.language.optArrays = {
					mapSubsets: ['Wstęp (mapa 1)',
						'Podróż (mapy 2-10)',
						'Ostatnia Ruina (mapa 11)',
						'Wszystkie mapy'],
					maps: ['1: Glogo Caverns',
						'2: Broken Plains',
						'3: Crimson Forest',
						'4: Meteor Mountain',
						'5: Toxic Desert',
						'6: Cloudy Valley',
						'7: Dried Sea',
						'8: Fire Delta',
						'9: Rocktooth Isles',
						'10: Mammoth Jungle',
						'11: The Last Ruin'],
				};
				//this.language.yesNo = ['TAK', 'NIE'];
				this.language.specificArrays = {
					dawnDusk: ['świt', 'zmierzch'],
					bosses: ['Captain Shreya', 'Zag the Treasure Hunter', 'The Ivory Queen', ' The Red King'],
				}
				this.language.results = {
					map: 'Mapa:',
					town: 'Wariant miasta:',
					addCamps: 'Dodatkowe obozowiska:',
					quests: 'Misje:',
					bosses: 'Bossowie:'
				};
				break;

			case 'English':
			default:
				this.language.categories = {
					general: 'General',
					map: 'Map',
					camps: 'Additional camps'
				};
				this.language.opts = {
					playerCount: 'Player count',
					longerGV: 'Longer game variant',
					randMap: 'Randomize map?',
					mapSubset: 'Map subset',
					map: 'Chosen map',
					prioritizeNS: 'Prioritize named spaces?',
					randBosses: 'Last Ruin: randomize bosses?',
					randCamps: 'Randomize additional camps?',
					addCampsMin: 'Minimum additional camps',
					addCampsMax: 'Maximum additional camps',
					randomize: 'Randomize',
					rerandomize: 'Randomize again',
					home: 'Home',
					options: 'Back to options',
				};
				this.language.optArrays = {
					mapSubsets: ['Introductory (1)',
						'Journey (2-10)',
						'Last Ruin (11)',
						'All maps'],
					maps: ['1: Glogo Caverns',
						'2: Broken Plains',
						'3: Crimson Forest',
						'4: Meteor Mountain',
						'5: Toxic Desert',
						'6: Cloudy Valley',
						'7: Dried Sea',
						'8: Fire Delta',
						'9: Rocktooth Isles',
						'10: Mammoth Jungle',
						'11: The Last Ruin'],
				};
				//this.language.yesNo = ['YES', 'NO'];
				this.language.specificArrays = {
					dawnDusk: ['dawn', 'dusk'],
					bosses: ['Captain Shreya', 'Zag the Treasure Hunter', 'The Ivory Queen', ' The Red King'],
				}
				this.language.results = {
					map: 'Map:',
					town: 'Town:',
					addCamps: 'Additional camps:',
					quests: 'Quests:',
					bosses: 'Bosses:'
				};
				break;
		}
		this.currentLanguage = this.props.language;
	}

	//#endregion
	//==================================================================================================================================
	//#region === special handlers for components

	handleYesNoClickSpecial(newState: GameState, varName: string) {
		switch (varName) {
			case "randMap":
				newState.opts.mapSubsetList = false;
				newState.opts.mapList = false;
				break;
		}
		return newState;
	}

	//#endregion
	//==================================================================================================================================
	//#region === randomizer

	randomize() {
		// select map
		let map: number = 0;
		if (this.state.opts.randMap) {
			switch (this.state.opts.mapSubset) {
				case 0:
					map = 1;
					break;
				case 1:
					map = General.random(2, 10);
					break;
				case 2:
					map = 11;
					break;
				case 3:
					map = General.random(1, 11);
					break;
				default:
					alert("Unexpected value of mapSubset!");
					break;
			}
		}
		else {
			map = this.state.opts.map;
		}

		// select town variant
		let dawnDusk: number = General.random(0, 1);

		// select additional camps
		let addCamps: number = General.random(
			this.state.opts.addCampsMin[2],
			this.state.opts.addCampsMax[2]
		);

		// select bosses
		let choice: (string | number)[] = [0, 1, 2, 3];
		let bosses: number[] = General.randomFromArray(choice, this.state.opts.playerCount[2]);

		// select quests
		let totalQuests: number = 0;
		let quests: (number | string)[] = [];
		switch (this.state.opts.playerCount[2]) {
			case 2: totalQuests = 7; break;
			case 3: totalQuests = 9; break;
			case 4: totalQuests = 11; break;
			default: alert('Unexpected value of playerCount!'); break;
		}
		if (this.state.opts.longerGV) { totalQuests += 2; }

		if (this.state.opts.prioritizeNS) {
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

		// show 'em
		let newState = Object.assign({}, this.state, { showResults: true });
		this.setState(newState);
	}

	//#endregion
	//==================================================================================================================================
	//#region === additional functions

	// n/a

	//#endregion
	//==================================================================================================================================
}

export default NearAndFar;