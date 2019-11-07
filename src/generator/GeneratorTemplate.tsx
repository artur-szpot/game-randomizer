import { GeneratorLineSelectValues } from "./GeneratorLine";

export interface GeneratedElement {
	name: string;
	type: GeneratorLineSelectValues;
}

export class GeneratorTemplate {
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

	static generate(gameName: string, results: GeneratedElement[], opts: GeneratedElement[]): string {
		let resultsInterface = results.map(this.resultInterfaceMapper).join('\n\t');
		let optsState = opts.filter(e => e.type !== GeneratorLineSelectValues.CATEGORY).map(this.optStateMapper).join('\n\t\t\t\t')
		let resultsInitialization = results.map(this.resultInitializationMapper).join('\n\t\t');
		let optLines = opts.map(this.optLineMapper).join('\n\t\t\t\t');
		let resultsLineInitialization = results.map(this.resultsLineInitializationMapper).join('\n\t\t');
		let resultLines = results.map(e => `<Line {...this.shortCategory(this.language.results.${e.name}, res${e.name.substr(0, 1).toUpperCase() + e.name.substr(1)})} />`).join('\n\t\t\t\t');
		let languageCategories = opts.filter(e => e.type === GeneratorLineSelectValues.CATEGORY).map(e => `${e.name}: 'PLACEHOLDER',`).join('\n\t\t\t\t\t');
		let languageOpts = opts.filter(e => e.type !== GeneratorLineSelectValues.CATEGORY).map(this.optLanguageMapper).join('\n\t\t\t\t\t');
		let languageOptArrays = opts.filter(e => e.type === GeneratorLineSelectValues.MULTISTATE).map(e => `${e.name}s: [],`).join('\n\t\t\t\t\t');
		let languageResults = results.map(e => `${e.name}: 'PLACEHOLDER:',`).join('\n\t\t\t\t\t');
		let resultRandomization = results.map(this.resultRandomizationMapper).join('\n\t\t');
		let resultRandomization2 = results.map(e => `this.results.${e.name} = ${e.name};`).join('\n\t\t');

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
		this.state = {
			showResults: false,
			opts: {
				${optsState}
			}
		};
		this.setLanguage();
	}

	results: ${gameName}Results = {
		${resultsInitialization}
	};

	//#endregion
	//==================================================================================================================================
	//#region === renders

	renderOptions() {
		return (
			<>
				${optLines}
				{this.createMainButtons()}
			</>
		);

	}

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
		switch (this.props.language.name) {
			case 'Polski':
				this.language.categories = {
					${languageCategories}
				}
				this.language.opts = {
					${languageOpts}
				};
				this.language.optArrays = {
					${languageOptArrays}
				}
				this.language.yesNo = ['TAK', 'NIE'];
				this.language.specifics = {}
				this.language.specificArrays = {}
				this.language.results = {
					${languageResults}
				};
				break;

			case 'English':
			default:
				this.language.categories = {
					${languageCategories}
				}
				this.language.opts = {
					${languageOpts}
				};
				this.language.optArrays = {
					${languageOptArrays}
				}
				this.language.yesNo = ['YES', 'NO'];
				this.language.specifics = {}
				this.language.specificArrays = {}
				this.language.results = {
					${languageResults}
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
		${resultRandomization}
		
		${resultRandomization2}

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

export default ${gameName};`
	}
}