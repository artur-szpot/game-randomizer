import { GeneratorLineSelectValues } from "./GeneratorLine";

export interface GeneratedElement {
	name: string;
	type: GeneratorLineSelectValues;
}

export class GeneratorTemplate {

	// content of the interface dictating results' structure
	static resultInterfaceMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.NUMBER:
				return `${input.name}: number;`
			case GeneratorLineSelectValues.STRING:
				return `${input.name}: string;`
			case GeneratorLineSelectValues.NUMBERARRAY:
				return `${input.name}: number[];`
			case GeneratorLineSelectValues.STRINGARRAY:
				return `${input.name}: string[];`
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// content of the state initialization in constructor
	static optStateMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.YESNO:
				return `${input.name}: false,`;
			case GeneratorLineSelectValues.PLUSMINUS:
				return `${input.name}: [0, 1, 0], // [min, max, current]`;
			case GeneratorLineSelectValues.PLUSMINUSMINMAX:
				return `${input.name}Min: [0, 1, 0], // [absolute min for min, absolute max for min, current min]\n\t\t${input.name}Max: [1, 2, 2], // [absolute min for max, absolute max for max, current max]`;
			case GeneratorLineSelectValues.MULTISTATE:
				return `${input.name}: 0,
		${input.name}List: false,`;
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// content of the results object in the constructor
	static resultInitializationMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.NUMBER:
				return `${input.name}: 0,`
			case GeneratorLineSelectValues.NUMBERARRAY:
			case GeneratorLineSelectValues.STRINGARRAY:
				return `${input.name}: [],`
			case GeneratorLineSelectValues.STRING:
				return `${input.name}: '',`
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// lines to render in renderOptions
	static optLineMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.CATEGORY:
				return `<Line {...this.shortCategory('${input.name}')} />`;
			case GeneratorLineSelectValues.YESNO:
				return `<Line {...this.shortYesNo('${input.name}')} />`;
			case GeneratorLineSelectValues.PLUSMINUS:
				return `<Line {...this.shortPlusMinus('${input.name}')} />`;
			case GeneratorLineSelectValues.PLUSMINUSMINMAX:
				return `<Line {...this.shortPlusMinus('${input.name}Min')} />\n\t\t\t\t<Line {...this.shortPlusMinus('${input.name}Max')} />`;
			case GeneratorLineSelectValues.MULTISTATE:
				return `<Line {...this.shortMultiState('${input.name}')} />`;
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// results being read into variables in renderResults
	static resultsLineInitializationMapper(input: GeneratedElement): string {
		let name: string = input.name.substr(0, 1).toUpperCase() + input.name.substr(1);
		switch (input.type) {
			case GeneratorLineSelectValues.NUMBER:
			case GeneratorLineSelectValues.STRING:
				return `let res${name}: string = '';`
			case GeneratorLineSelectValues.NUMBERARRAY:
			case GeneratorLineSelectValues.STRINGARRAY:
				return `let res${name}: string[] = [];`
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// names of components stored in language
	static optLanguageMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.YESNO:
			case GeneratorLineSelectValues.PLUSMINUS:
			case GeneratorLineSelectValues.MULTISTATE:
				return `${input.name}: 'PLACEHOLDER',`;
			case GeneratorLineSelectValues.PLUSMINUSMINMAX:
				return `${input.name}Min: 'Minimum',\n\t\t\t\t\t${input.name}Max: 'Maximum',`;
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// initialization of variables used during randomization
	static resultRandomizationMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.NUMBER:
				return `let ${input.name}: number = 0;`
			case GeneratorLineSelectValues.NUMBERARRAY:
				return `let ${input.name}: number[] = [];`
			case GeneratorLineSelectValues.STRINGARRAY:
				return `let ${input.name}: string[] = [];`
			case GeneratorLineSelectValues.STRING:
				return `let ${input.name}: string = '';`
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// helper to break braces apart only when there is content to place in them
	static addBreaks(input: string): string {
		if (input) {
			return '\n' + input + '\n';
		}
		return input;
	}

	static generate(gameName: string, results: GeneratedElement[], opts: GeneratedElement[]): string {
		let resultsOnly: boolean = opts.length > 0;

		// content of the interface dictating results' structure
		let resultsInterface: string = results.map(this.resultInterfaceMapper).join('\n\t');

		// content of the state initialization in constructor
		let optsState: string = opts.filter(e => e.type !== GeneratorLineSelectValues.CATEGORY).map(this.optStateMapper).join('\n\t\t\t\t')

		// state initialization in constructor itself
		let stateInitialization: string = '';
		if (resultsOnly) {
			stateInitialization = `this.state = {
			showResults: false,
			opts: {
				${optsState}
			}
		};`;
		} else {
			stateInitialization = `this.state = this.randomizeState({
				showResults: false,
				opts: {}
			});`;
		}

		// content of the results object in the constructor
		let resultsInitialization: string = results.map(this.resultInitializationMapper).join('\n\t\t');

		// lines to render in renderOptions
		let optLines: string = opts.map(this.optLineMapper).join('\n\t\t\t\t');

		// renderOptions itself
		let renderOptions: string = '';
		if (resultsOnly) {
			renderOptions = `renderOptions() {
			return (
				<>
					${optLines}
					{this.createMainButtons()}
				</>
			);
		}`;
		} else {
			renderOptions = 'renderOptions() { return this.renderResults(); }';
		}

		// results being read into variables in renderResults
		let resultsLineInitialization: string = results.map(this.resultsLineInitializationMapper).join('\n\t\t');

		// results being displayed in renderResults
		let resultLines: string = results.map(e => `<Line {...this.shortCategory(this.language.results.${e.name}, res${e.name.substr(0, 1).toUpperCase() + e.name.substr(1)})} />`).join('\n\t\t\t\t');

		// names of categories stored in language
		let languageCategories: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.CATEGORY).map(e => `${e.name}: 'PLACEHOLDER',`).join('\n\t\t\t\t\t'));

		// names of components stored in language
		let languageOpts: string = this.addBreaks(opts.filter(e => e.type !== GeneratorLineSelectValues.CATEGORY).map(this.optLanguageMapper).join('\n\t\t\t\t\t'));

		// contents of MultiStates stored in language
		let languageOptArrays: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.MULTISTATE).map(e => `${e.name}s: [],`).join('\n\t\t\t\t\t'));

		// names of results stored in language
		let languageResults: string = this.addBreaks(results.map(e => `${e.name}: 'PLACEHOLDER:',`).join('\n\t\t\t\t\t'));

		// initialization of variables used during randomization
		let resultRandomization: string = results.map(this.resultRandomizationMapper).join('\n\t\t');

		// randomized results being saved in the results object
		let resultRandomization2: string = results.map(e => `this.results.${e.name} = ${e.name};`).join('\n\t\t');

		// randomizer function(s) themselves
		let randomize:string = '';
		if(resultsOnly){
			randomize = `randomize() {
				this.setState(this.randomizeState(this.state));
			}
		
			randomizeState(currentState:GameState) {
				${resultRandomization}
		
				// perform randomization
		
				${resultRandomization2}
		
				let newState = Object.assign({}, currentState, { showResults: !currentState.showResults });
				return newState;
			}`;
		} else {
			randomize = `randomize() {
				${resultRandomization}

				// perform randomization
				
				${resultRandomization2}
		
				let newState = Object.assign({}, this.state, { showResults: true });
				this.setState(newState);
			}`;
		}

		return `import React from 'react';
import { Game, GameProps, GameState } from './Game';
import General from '../general/General';
import Line from '../line/Line';

interface ${gameName}Results {
	${resultsInterface}
}

class ${gameName} extends Game {
	//==================================================================================================================================
	//#region === additional variables

	// n/a

	//#endregion
	//==================================================================================================================================
	//#region === variable structure (generated)

	constructor(props: GameProps) {
		super(props);
		${stateInitialization}
		this.setLanguage();
	}

	results: ${gameName}Results = {
		${resultsInitialization}
	};

	//#endregion
	//==================================================================================================================================
	//#region === renders

	${renderOptions}

	renderResults() {
		${resultsLineInitialization}

		return (
			<>
				${resultLines}
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
				this.language.categories = {${languageCategories}};
				this.language.opts = {${languageOpts}};
				this.language.optArrays = {${languageOptArrays}};
				this.language.specifics = {};
				this.language.specificArrays = {};
				this.language.results = {${languageResults}};
				break;

			case 'English':
			default:
				this.language.categories = {${languageCategories}};
				this.language.opts = {${languageOpts}};
				this.language.optArrays = {${languageOptArrays}};
				this.language.specifics = {};
				this.language.specificArrays = {};
				this.language.results = {${languageResults}};
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

	${randomize}

	//#endregion
	//==================================================================================================================================
	//#region === additional functions

	// n/a

	//#endregion
	//==================================================================================================================================
}

export default ${gameName};`
	}
}