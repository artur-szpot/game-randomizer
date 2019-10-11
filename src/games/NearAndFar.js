import React from 'react';
import General from '../general/General';
import Line from '../line/Line';

class NearAndFar extends React.Component {
	//#region === generated functions

	// language 
	currentLanguage = this.props.language;
	language = {};

	// functions
	functions = {
		// booleans
		onClickLongerGV: () => this.handleYesNoClick('longerGV'),
		onClickRandMap: () => this.handleYesNoClick('randMap'),
		onClickPrioritizeNS: () => this.handleYesNoClick('prioritizeNS'),
		onClickRandBosses: () => this.handleYesNoClick('randBosses'),
		onClickRandCamps: () => this.handleYesNoClick('randCamps'),

		// multi-states
		onNextClickMapSubset: () => this.handleMultiClick('mapSubset', 1),
		onPrevClickMapSubset: () => this.handleMultiClick('mapSubset', -1),
		onSubClickMapSubset: [
			() => this.handleMultiSubClick('mapSubset', 0),
			() => this.handleMultiSubClick('mapSubset', 1),
			() => this.handleMultiSubClick('mapSubset', 2),
			() => this.handleMultiSubClick('mapSubset', 3)
		],
		onListClickMapSubset: () => this.handleMultiArrowClick('mapSubset'),
		// -----------
		onNextClickChosenMap: () => this.handleMultiClick('chosenMap', 1),
		onPrevClickChosenMap: () => this.handleMultiClick('chosenMap', -1),
		onSubClickChosenMap: [
			() => this.handleMultiSubClick('chosenMap', 0),
			() => this.handleMultiSubClick('chosenMap', 1),
			() => this.handleMultiSubClick('chosenMap', 2),
			() => this.handleMultiSubClick('chosenMap', 3),
			() => this.handleMultiSubClick('chosenMap', 4),
			() => this.handleMultiSubClick('chosenMap', 5),
			() => this.handleMultiSubClick('chosenMap', 6),
			() => this.handleMultiSubClick('chosenMap', 7),
			() => this.handleMultiSubClick('chosenMap', 8),
			() => this.handleMultiSubClick('chosenMap', 9),
			() => this.handleMultiSubClick('chosenMap', 10)
		],
		onListClickChosenMap: () => this.handleMultiArrowClick('chosenMap'),

		// plus-minus
		onClickPlayerCountMinus: () => this.handlePlusMinusClick('playerCount', -1),
		onClickPlayerCountPlus: () => this.handlePlusMinusClick('playerCount', 1),
		onClickAddCampsMinMinus: () => this.handlePlusMinusClick('addCampsMin', -1),
		onClickAddCampsMinPlus: () => this.handlePlusMinusClick('addCampsMin', 1),
		onClickAddCampsMaxMinus: () => this.handlePlusMinusClick('addCampsMax', -1),
		onClickAddCampsMaxPlus: () => this.handlePlusMinusClick('addCampsMax', 1),

		// big buttons
		onClickRandomize: () => this.randomize(),
		onClickOptions: () => this.showOptions(),
	};

	//#endregion
	//#region === additional variables

	// language independent data for randomization
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

	// results
	results = {
		map: 10,
		dawnDusk: 1,
		addCamps: 3,
		bosses: [1, 3],
		quests: [12, 89, 31],
	};

	//#endregion
	//#region === initial settings

	constructor(props) {
		super(props);
		this.state = {
			// actual state
			showResults: false,

			// booleans
			longerGV: false,
			randMap: true,
			prioritizeNS: false,
			randBosses: true,
			randCamps: true,

			// multi-states
			// mapSubsets: LANGUAGE
			mapSubset: 1,
			mapSubsetList: false,
			// -----------
			//chosenMaps: LANGUAGE
			chosenMap: 0,
			chosenMapList: false,

			// plus-minus
			playerCount: [2, 4, 2],
			addCampsMin: [0, 3, 0],
			addCampsMax: [1, 4, 4],
		};
		this.setLanguage();
	}

	//#endregion
	//#region === renders

	renderOptions() {
		let lastRuinVisible;
		if (this.state.randMap) {
			lastRuinVisible = this.state.mapSubset > 1;
		} else {
			lastRuinVisible = this.state.chosenMap === 10;
		}

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
					title={this.language.opts.longerGV}
					opts={this.language.yesNo}
					onClick={this.functions.onClickLongerGV}
					yesNo={this.state.longerGV}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randMap}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandMap}
					yesNo={this.state.randMap}
					visible={true}
				/>
				<Line
					lineType='MultiState'
					title={this.language.opts.mapSubset}
					onNextClick={this.functions.onNextClickMapSubset}
					onPrevClick={this.functions.onPrevClickMapSubset}
					onSubClick={this.functions.onSubClickMapSubset}
					onListClick={this.functions.onListClickMapSubset}
					showList={this.state.mapSubsetList}
					states={this.language.opts.mapSubsets}
					currentState={this.state.mapSubset}
					visible={this.state.randMap}
				/>
				<Line
					lineType='MultiState'
					title={this.language.opts.chosenMap}
					onNextClick={this.functions.onNextClickChosenMap}
					onPrevClick={this.functions.onPrevClickChosenMap}
					onSubClick={this.functions.onSubClickChosenMap}
					onListClick={this.functions.onListClickChosenMap}
					showList={this.state.chosenMapList}
					states={this.language.maps}
					currentState={this.state.chosenMap}
					visible={!this.state.randMap}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.prioritizeNS}
					opts={this.language.yesNo}
					onClick={this.functions.onClickPrioritizeNS}
					yesNo={this.state.prioritizeNS}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.randBosses}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandBosses}
					yesNo={this.state.randBosses}
					visible={lastRuinVisible}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.addCamps}
					opts={this.language.yesNo}
					onClick={this.functions.onClickRandCamps}
					yesNo={this.state.randCamps}
					visible={true}
				/>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.addCampsMin}
					onMinusClick={this.functions.onClickAddCampsMinMinus}
					onPlusClick={this.functions.onClickAddCampsMinPlus}
					minMaxCurr={this.state.addCampsMin}
					visible={this.state.randCamps}
				/>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.addCampsMax}
					onMinusClick={this.functions.onClickAddCampsMaxMinus}
					onPlusClick={this.functions.onClickAddCampsMaxPlus}
					minMaxCurr={this.state.addCampsMax}
					visible={this.state.randCamps}
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
		let resMap = this.language.maps[this.results.map-1];
		let resTown = this.language.dawnDusk[this.results.dawnDusk];
		let resQuests = General.list(this.results.quests);
		let resBosses = General.listWithIndices(this.language.bosses, this.results.bosses);
		let visBosses = this.results.map === 11;

		return (
			<>
				<Line
					lineType='Text'
					title={this.language.results.map}
					text={resMap}
					visible={true}
					first={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.town}
					text={resTown}
					visible={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.addCamps}
					text={this.results.addCamps}
					visible={this.state.randCamps}
				/>
				<Line
					lineType='Text'
					title={this.language.results.quests}
					text={resQuests}
					visible={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.bosses}
					text={resBosses}
					visible={true}
					hidden={!visBosses}
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
					longerGV: 'Wariant: dłuższa gra',
					randMap: 'Losować mapę?',
					mapSubset: 'Zestaw map do wyboru',
					chosenMap: 'Wybrana mapa',
					prioritizeNS: 'Wybierać w pierwszej kolejności nazwane pola?',
					randBosses: 'Ostatnia Ruina: losować bossów?',
					addCamps: 'Dodatkowe losowe obozowiska?',
					addCampsMin: 'Minimum',
					addCampsMax: 'Maksimum',
					randomize: 'Losuj',
					rerandomize: 'Losuj ponownie',
					home: 'Powrót do menu',
					options: 'Zmień opcje',
					mapSubsets: ['Wstęp (mapa 1)',
						'Podróż (mapy 2-10)',
						'Ostatnia Ruina (mapa 11)',
						'Wszystkie mapy'],
				};
				this.language.maps = ['1: Glogo Caverns',
					'2: Broken Plains',
					'3: Crimson Forest',
					'4: Meteor Mountain',
					'5: Toxic Desert',
					'6: Cloudy Valley',
					'7: Dried Sea',
					'8: Fire Delta',
					'9: Rocktooth Isles',
					'10: Mammoth Jungle',
					'11: The Last Ruin'];
				this.language.yesNo = ['TAK', 'NIE'];
				this.language.dawnDusk = ['świt', 'zmierzch'];
				this.language.bosses = ['Captain Shreya', 'Zag the Treasure Hunter', 'The Ivory Queen', ' The Red King'];
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
				this.language.opts = {
					playerCount: 'Player count',
					longerGV: 'Longer game variant',
					randMap: 'Randomize map?',
					mapSubset: 'Map subset',
					chosenMap: 'Chosen map',
					prioritizeNS: 'Prioritize named spaces?',
					randBosses: 'Last Ruin: randomize bosses?',
					addCamps: 'Randomize additional camps?',
					addCampsMin: 'Minimum additional camps',
					addCampsMax: 'Maximum additional camps',
					randomize: 'Randomize',
					rerandomize: 'Randomize again',
					home: 'Home',
					options: 'Back to options',
					mapSubsets: ['Introductory (1)',
						'Journey (2-10)',
						'Last Ruin (11)',
						'All maps'],
				};
				this.language.maps = ['1: Glogo Caverns',
					'2: Broken Plains',
					'3: Crimson Forest',
					'4: Meteor Mountain',
					'5: Toxic Desert',
					'6: Cloudy Valley',
					'7: Dried Sea',
					'8: Fire Delta',
					'9: Rocktooth Isles',
					'10: Mammoth Jungle',
					'11: The Last Ruin'];
				this.language.yesNo = ['YES', 'NO'];
				this.language.dawnDusk = ['dawn', 'dusk'];
				this.language.bosses = ['Captain Shreya', 'Zag the Treasure Hunter', 'The Ivory Queen', ' The Red King'];
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
	//#region === generated methods

	handleYesNoClick(varName) {
		let newState;
		switch (varName) {
			case "longerGV":
				newState = Object.assign({}, this.state, { longerGV: !this.state.longerGV });
				break;
			case "randMap":
				newState = Object.assign({}, this.state, { randMap: !this.state.randMap });
				break;
			case "prioritizeNS":
				newState = Object.assign({}, this.state, { prioritizeNS: !this.state.prioritizeNS });
				break;
			case "randBosses":
				newState = Object.assign({}, this.state, { randBosses: !this.state.randBosses });
				break;
			case "randCamps":
				newState = Object.assign({}, this.state, { randCamps: !this.state.randCamps });
				break;
			default:
				alert("handleYesNoClick called for unsupported varName: " + varName);
				break;
		}
		switch (varName) {
			case "randMap":
					newState.mapSubsetList = false;
					newState.chosenMapList = false;
					break;
		}
		this.setState(newState);
	}

	handleMultiClick(varName, change) {
		let newState;
		switch (varName) {
			case "mapSubset":
				newState = Object.assign({}, this.state, { mapSubset: General.validateNewChosen(this.state.mapSubset, change, this.language.opts.mapSubsets.length) });
				break;
			case "chosenMap":
				newState = Object.assign({}, this.state, { chosenMap: General.validateNewChosen(this.state.chosenMap, change, this.language.maps.length) });
				break;
			default:
				alert("handleMultiClick called for unsupported varName: " + varName);
				break;
		}
		this.setState(newState);
	}

	handleMultiSubClick(varName, value) {
		let newState;
		switch (varName) {
			case "mapSubset":
				newState = Object.assign({}, this.state, { mapSubset: value });
				newState.mapSubsetList = false;
				break;
			case "chosenMap":
				newState = Object.assign({}, this.state, { chosenMap: value });
				newState.chosenMapList = false;
				break;
			default:
				alert("handleMultiSubClick called for unsupported varName: " + varName);
				break;
		}
		this.setState(newState);
	}

	handleMultiArrowClick(varName) {
		let newState;
		switch (varName) {
			case "mapSubset":
				newState = Object.assign({}, this.state, { mapSubsetList: !this.state.mapSubsetList });
				break;
			case "chosenMap":
				newState = Object.assign({}, this.state, { chosenMapList: !this.state.chosenMapList });
				break;
			default:
				alert("handleMultiArrowClick called for unsupported varName: " + varName);
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
			case 'addCampsMin':
				if (General.validateMinMaxCurr(this.state.addCampsMin, change)) {
					let newAddCampsMin = this.state.addCampsMin.slice();
					newAddCampsMin[2] += change;
					newState = Object.assign({}, this.state, { addCampsMin: newAddCampsMin });
					newState.addCampsMax[0] = newAddCampsMin[2] + 1;
				} else { return; }
				break;
			case 'addCampsMax':
				if (General.validateMinMaxCurr(this.state.addCampsMax, change)) {
					let newAddCampsMax = this.state.addCampsMax.slice();
					newAddCampsMax[2] += change;
					newState = Object.assign({}, this.state, { addCampsMax: newAddCampsMax });
					newState.addCampsMin[1] = newAddCampsMax[2] - 1;
				} else { return; }
				break;
			default:
				alert("handlePlusMinusClick called for unsupported varName: " + varName);
				break;
		}
		this.setState(newState);
	}

	showOptions() {
		let newState;
		newState = Object.assign({}, this.state, { showResults: false });
		this.setState(newState);
	}

	//#endregion
	//#region === randomizer

	randomize() {
		// generate results

		// select map
		let map;
		if (this.state.randMap) {
			switch (this.state.mapSubset) {
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
			map = this.state.chosenMap;
		}

		// select town variant
		let dawnDusk = General.random(0, 1);

		// select additional camps
		let addCamps = General.random(
			this.state.addCampsMin[2],
			this.state.addCampsMax[2]
		);

		// select bosses
		let choice = [0, 1, 2, 3];
		let bosses = General.randomFromArray(choice, this.state.playerCount[2]);

		// select quests
		let totalQuests;
		let quests = [];
		switch (this.state.playerCount[2]) {
			case 2: totalQuests = 7; break;
			case 3: totalQuests = 9; break;
			case 4: totalQuests = 11; break;
			default: alert('Unexpected value of playerCount!'); break;
		}
		if (this.state.longerGV) { totalQuests += 2; }

		if (this.state.prioritizeNS) {
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
			quests = quests.sort(function (a, b) { return a - b });
		}

		this.results.map = map;
		this.results.dawnDusk = dawnDusk;
		this.results.addCamps = addCamps;
		this.results.bosses = bosses;
		this.results.quests = quests;

		// show 'em
		let newState;
		newState = Object.assign({}, this.state, { showResults: true });
		this.setState(newState);
	}

	//#endregion
}

export default NearAndFar;