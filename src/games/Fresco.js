import React from 'react';
import General from '../general/General';
import Line from '../line/Line';

class Fresco extends React.Component {
	//#region === generated functions

	// game specific
	total_modules = 11;

	// language 
	currentLanguage = this.props.language;
	language = {};

	// functions
	functions = {
		//booleans
		onClickModuleAll: () => this.handleYesNoClick('moduleAll'),
		onClickModule0: () => this.handleModuleYesNoClick(0),
		onClickModule1: () => this.handleModuleYesNoClick(1),
		onClickModule2: () => this.handleModuleYesNoClick(2),
		onClickModule3: () => this.handleModuleYesNoClick(3),
		onClickModule4: () => this.handleModuleYesNoClick(4),
		onClickModule5: () => this.handleModuleYesNoClick(5),
		onClickModule6: () => this.handleModuleYesNoClick(6),
		onClickModule7: () => this.handleModuleYesNoClick(7),
		onClickModule8: () => this.handleModuleYesNoClick(8),
		onClickModule9: () => this.handleModuleYesNoClick(9),
		onClickModule10: () => this.handleModuleYesNoClick(10),

		//multi-states
		onNextClickRandomizingMode: () => this.handleMultiClick('randomizingMode', 1),
		onPrevClickRandomizingMode: () => this.handleMultiClick('randomizingMode', -1),
		onSubClickRandomizingMode: [
			() => this.handleMultiSubClick('randomizingMode', 0),
			() => this.handleMultiSubClick('randomizingMode', 1),
			() => this.handleMultiSubClick('randomizingMode', 2),
		],
		onListClickRandomizingMode: () => this.handleMultiListClick('randomizingMode'),

		//plus-minus
		onClickExactMinus: () => this.handlePlusMinusClick('exact', -1),
		onClickExactPlus: () => this.handlePlusMinusClick('exact', 1),
		onClickNormalBaseMinus: () => this.handlePlusMinusClick('normalBase', -1),
		onClickNormalBasePlus: () => this.handlePlusMinusClick('normalBase', 1),
		onClickNormalVariationMinus: () => this.handlePlusMinusClick('normalVariation', -1),
		onClickNormalVariationPlus: () => this.handlePlusMinusClick('normalVariation', 1),

		//plus-minus
		onClickRangeMinMinus: () => this.handlePlusMinusClick('rangeMin', -1),
		onClickRangeMinPlus: () => this.handlePlusMinusClick('rangeMin', 1),
		onClickRangeMaxMinus: () => this.handlePlusMinusClick('rangeMax', -1),
		onClickRangeMaxPlus: () => this.handlePlusMinusClick('rangeMax', 1),

		// big buttons
		onClickRandomize: () => this.randomize(),
		onClickOptions: () => this.showOptions(),
	};

	//#endregion
	//#region === additional variables

	//results
	results = {
		modules: null,
	};

	//#endregion
	//#region === initial settings

	constructor(props) {
		super(props);
		this.state = {
			// actual state
			showResults: false,

			//booleans
			moduleAll: false,
			module: [
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true,
				true
			],

			//multi-states
			randomizingMode: 0,
			randomizingModeList: false,

			//plus-minus
			exact: [1, 11, 6],
			normalBase: [0, 9, 4],
			normalVariation: [0, 7, 2],

			//plus-minus
			rangeMin: [0, 10, 2],
			rangeMax: [1, 11, 6],
		};
		this.setLanguage();
	}

	//#endregion
	//#region === renders

	renderOptions() {
		return (
			<>
				<Line
					lineType='Category'
					text={this.language.categories.randomizingMode}
					title={true}
					visible={true}
				/>
				<Line
					lineType='MultiState'
					title={this.language.opts.randomizingMode}
					onNextClick={this.functions.onNextClickRandomizingMode}
					onPrevClick={this.functions.onPrevClickRandomizingMode}
					onSubClick={this.functions.onSubClickRandomizingMode}
					onListClick={this.functions.onListClickRandomizingMode}
					showList={this.state.randomizingModeList}
					states={this.language.opts.randomizingModes}
					currentState={this.state.randomizingMode}
					visible={true}
					first={true}
				/>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.exact}
					onMinusClick={this.functions.onClickExactMinus}
					onPlusClick={this.functions.onClickExactPlus}
					minMaxCurr={this.state.exact}
					visible={this.state.randomizingMode === 0}
				/>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.rangeMin}
					onMinusClick={this.functions.onClickRangeMinMinus}
					onPlusClick={this.functions.onClickRangeMinPlus}
					minMaxCurr={this.state.rangeMin}
					visible={this.state.randomizingMode === 1}
				/>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.rangeMax}
					onMinusClick={this.functions.onClickRangeMaxMinus}
					onPlusClick={this.functions.onClickRangeMaxPlus}
					minMaxCurr={this.state.rangeMax}
					visible={this.state.randomizingMode === 1}
				/>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.normalBase}
					onMinusClick={this.functions.onClickNormalBaseMinus}
					onPlusClick={this.functions.onClickNormalBasePlus}
					minMaxCurr={this.state.normalBase}
					visible={this.state.randomizingMode === 2}
				/>
				<Line
					lineType='PlusMinus'
					title={this.language.opts.normalVariation}
					onMinusClick={this.functions.onClickNormalVariationMinus}
					onPlusClick={this.functions.onClickNormalVariationPlus}
					minMaxCurr={this.state.normalVariation}
					visible={this.state.randomizingMode === 2}
				/>
				<Line
					lineType='Category'
					text={this.language.categories.modules}
					subtext={this.language.categories.modulesInfo}
					title={true}
					visible={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.opts.moduleAll}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModuleAll}
					yesNo={this.state.moduleAll}
					visible={true}
					first={true}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[0]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule0}
					yesNo={this.state.module[0]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[1]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule1}
					yesNo={this.state.module[1]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[2]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule2}
					yesNo={this.state.module[2]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[3]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule3}
					yesNo={this.state.module[3]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[4]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule4}
					yesNo={this.state.module[4]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[5]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule5}
					yesNo={this.state.module[5]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[6]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule6}
					yesNo={this.state.module[6]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[7]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule7}
					yesNo={this.state.module[7]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[8]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule8}
					yesNo={this.state.module[8]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[9]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule9}
					yesNo={this.state.module[9]}
					visible={!this.state.moduleAll}
				/>
				<Line
					lineType='YesNo'
					title={this.language.modules[10]}
					opts={this.language.yesNo}
					onClick={this.functions.onClickModule10}
					yesNo={this.state.module[10]}
					visible={!this.state.moduleAll}
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
		let resModules = this.results.modules.map(value => this.language.modules[value]);

		return (
			<>
				<Line
					lineType='Category'
					text={this.language.results.modules}
					subtext={resModules}
					list={true}
					visible={true}
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
			case "Polski":
				this.language.categories = {
					randomizingMode: 'Tryb losowania',
					modules: 'Moduły',
					modulesInfo: 'Jeśli wybrana/wylosowana liczba modułów przekroczy liczbę dopuszczonych, nadmiar zostanie dobrany spośród niedozwolonych.',
				}
				this.language.opts = {
					randomizingMode: 'Tryb losowania',
					exact: 'Liczba modułów',
					rangeMin: 'Minimalna liczba modułów',
					rangeMax: 'Maksymalna liczba modułów',
					normalBase: 'Podstawowa wartość',
					normalVariation: 'Dopuszczalne odchylenie',
					moduleAll: 'Wszystkie moduły',
					randomize: 'Losuj',
					rerandomize: 'Losuj ponownie',
					home: 'Powrót do menu',
					options: 'Zmień opcje',
					randomizingModes: ['Dokładna liczba',
						'Zakres',
						'Przybliżona liczba'],
				}
				this.language.modules = [
					'1 - Portrety',
					'2 - Prośba biskupa',
					'3 - Specjalne mieszanki kolorów',
					'4 - Studnia Życzeń',
					'5 - Płatki złota',
					'6 - Szklarze',
					'7 - Zwoje',
					'8 - Dzwony',
					'9 - Fresk naścienny',
					'10 - Medico',
					'Queenie 1 - Przysługi biskupa']
				this.language.yesNo = ['TAK', 'NIE'];
				this.language.results = {
					modules: 'Wybrane moduły',
				}
				break;

			case "English":
			default:
					this.language.categories = {
						randomizingMode: 'Randomizing mode',
						modules: 'Modules',
						modulesInfo: 'If the chosen/randomized number of modules exceeds the number of those allowed, the excess will be drawn from among those disallowed.',
					}
				this.language.opts = {
					randomizingMode: 'Randomizing mode',
					exact: 'Number of modules',
					rangeMin: 'Minimum',
					rangeMax: 'Maximum',
					normalBase: 'Base value',
					normalVariation: 'Allowed variation',
					moduleAll: 'All modules',
					randomize: 'Randomize',
					rerandomize: 'Randomize again',
					home: 'Home',
					options: 'Back to options',
					randomizingModes: ['Exact number',
						'From a range',
						'Normalized random'],
				}
				this.language.modules = [
					'1 – The portraits',
					'2 – The bishop’s request',
					'3 – Special blend colors',
					'4 – The Wishing Well',
					'5 – The Leaf Gold',
					'6 – The Glaziers',
					'7 – The Scrolls',
					'8 – The Bells',
					'9 – The Wall Fresco',
					'10 – The Medico',
					'Queenie – The bishop’s favors'];
				this.language.yesNo = ['YES', 'NO'];
				this.language.results = {
					modules: 'Modules chosen',
				}
				break;
		}
		this.currentLanguage = this.props.language;
	}

	//#endregion
	//#region === generated methods

	handleYesNoClick(varName) {
		let newState;
		switch (varName) {
			case 'moduleAll':
				newState = Object.assign({}, this.state, { moduleAll: !this.state.moduleAll });
				break;
			default:
				alert('handleYesNoClick called for unsupported varName: ' + varName);
				break;
		}
		this.setState(newState);
	}

	handleModuleYesNoClick(index) {
		let newState;
		let newModule = [...this.state.module];
		newModule[index] = !newModule[index];
		newState = Object.assign({}, this.state, { module: newModule });
		this.setState(newState);
	}

	handleMultiClick(varName, change) {
		let newState;
		switch (varName) {
			case 'randomizingMode':
				newState = Object.assign({}, this.state, { randomizingMode: General.validateNewChosen(this.state.randomizingMode, change, this.language.opts.randomizingModes.length) });
				break;
			default:
				alert('handleMultiClick called for unsupported varName: ' + varName);
				break;
		}
		this.setState(newState);
	}

	handleMultiSubClick(varName, value) {
		let newState;
		switch (varName) {
			case 'randomizingMode':
				newState = Object.assign({}, this.state, { randomizingMode: value });
				newState.randomizingModeList = false;
				break;
			default:
				alert('handleMultiSubClick called for unsupported varName: ' + varName);
				break;
		}
		this.setState(newState);
	}

	handleMultiListClick(varName) {
		let newState;
		switch (varName) {
			case 'randomizingMode':
				newState = Object.assign({}, this.state, { randomizingModeList: true });
				break;
			default:
				alert('handleMultiListClick called for unsupported varName: ' + varName);
				break;
		}
		this.setState(newState);
	}

	handlePlusMinusClick(varName, change) {
		let newState;
		switch (varName) {
			case 'exact':
				if (General.validateMinMaxCurr(this.state.exact, change)) {
					let newExact = this.state.exact.slice();
					newExact[2] += change;
					newState = Object.assign({}, this.state, { exact: newExact });
				} else { return; }
				break;
			case 'normalBase':
				if (General.validateMinMaxCurr(this.state.normalBase, change) && this.state.normalBase[2] + this.state.normalVariation[2] + change <= this.total_modules) {
					let newNormalBase = this.state.normalBase.slice();
					newNormalBase[2] += change;
					newState = Object.assign({}, this.state, { normalBase: newNormalBase });
					newState.normalVariation[1] = this.total_modules - newNormalBase[2];
				} else { return; }
				break;
			case 'normalVariation':
				if (General.validateMinMaxCurr(this.state.normalVariation, change) && this.state.normalBase[2] + this.state.normalVariation[2] + change <= this.total_modules) {
					let newNormalVariation = this.state.normalVariation.slice();
					newNormalVariation[2] += change;
					newState = Object.assign({}, this.state, { normalVariation: newNormalVariation });
					newState.normalBase[1] = this.total_modules - newNormalVariation[2];
				} else { return; }
				break;
			case 'rangeMin':
				if (General.validateMinMaxCurr(this.state.rangeMin, change)) {
					let newRangeMin = this.state.rangeMin.slice();
					newRangeMin[2] += change;
					newState = Object.assign({}, this.state, { rangeMin: newRangeMin });
					newState.rangeMax[0] = newRangeMin[2] + 1;
				} else { return; }
				break;
			case 'rangeMax':
				if (General.validateMinMaxCurr(this.state.rangeMax, change)) {
					let newRangeMax = this.state.rangeMax.slice();
					newRangeMax[2] += change;
					newState = Object.assign({}, this.state, { rangeMax: newRangeMax });
					newState.rangeMin[1] = newRangeMax[2] - 1;
				} else { return; }
				break;
			default:
				alert('handlePlusMinusClick called for unsupported varName: ' + varName);
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
		let modules = null;

		let totalModulesToChoose = 0;
		switch (this.state.randomizingMode) {
			case 0:
				totalModulesToChoose = this.state.exact[2];
				break;
			case 1:
				totalModulesToChoose = General.random(this.state.rangeMin[2], this.state.rangeMax[2]);
				break;
			case 2:
				totalModulesToChoose = General.randomNormal(this.state.normalBase[2], this.state.normalVariation[2]);
		}

		let modulesToChooseFrom = this.state.moduleAll ? [...Array(this.language.modules.length).keys()] : this.state.module.map((value, index) => value ? index : -1).filter(value => value > -1);
		if (modulesToChooseFrom.length >= totalModulesToChoose) {
			modules = General.randomFromArray(modulesToChooseFrom, totalModulesToChoose);
		} else {
			let otherModules = this.state.module.map((value, index) => value ? -1 : index).filter(value => value > -1);
			modules = modulesToChooseFrom.concat(General.randomFromArray(otherModules, totalModulesToChoose - modulesToChooseFrom.length));
		}
		modules = modules.sort((a,b) => a - b);

		// save them
		this.results.modules = modules;

		// show 'em
		let newState;
		newState = Object.assign({}, this.state, { showResults: true });
		this.setState(newState);
	}

	//#endregion
}

export default Fresco;