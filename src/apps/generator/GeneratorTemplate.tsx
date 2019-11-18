import { GeneratorLineSelectValues } from "./GeneratorLine";

export interface GeneratedElement {
	name: string;
	type: GeneratorLineSelectValues;
	initial: string[];
	initial2: string[];
	instances: number;
	// INITIAL:
	// yesno: 'true'/'false'
	// plusminus: '[x, x, x]' (min/max: min)
	// multistate: current, total options
	// INITIAL2:
	// plusminus: min/max: max
}

export class GeneratorTemplate {

	// content of the interface dictating results' structure
	static resultInterfaceMapper(input: GeneratedElement): string {
		const resultArray: string = input.instances === 1 ? '' : '[]';
		switch (input.type) {
			case GeneratorLineSelectValues.NUMBER:
				return `${input.name}: number${resultArray};`
			case GeneratorLineSelectValues.STRING:
				return `${input.name}: string${resultArray};`
			case GeneratorLineSelectValues.NUMBERARRAY:
				return `${input.name}: number[]${resultArray};`
			case GeneratorLineSelectValues.STRINGARRAY:
				return `${input.name}: string[]${resultArray};`
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// content of the state initialization in constructor
	static optStateMapper(input: GeneratedElement): string {
		let inside: string[] = [];
		let inside2: string[] = [];
		switch (input.type) {
			case GeneratorLineSelectValues.YESNO:
				for (let i: number = 0; i < input.instances; i++) {
					inside.push(`{ yes: ${input.initial[0]} }`);
				}
				return `${input.name}: [${inside.join(',\n')}],`;
			case GeneratorLineSelectValues.PLUSMINUS:
				for (let i: number = 0; i < input.instances; i++) {
					inside.push(`{ minMaxCurr: {min: ${input.initial[0]}, max: ${input.initial[1]}, current: ${input.initial[2]}} }`);
				}
				return `${input.name}: [${inside.join(',\n')}],`;
			case GeneratorLineSelectValues.MINMAX:
				for (let i: number = 0; i < input.instances; i++) {
					inside.push(`{
							minMaxCurr: {min: ${input.initial[0]}, max: ${input.initial[1]}, current: ${input.initial[2]}},
							behaviors: [{ type: ComponentBehaviors.MINMAX_MIN, target: '${input.name}Max', index: ${i} }]
						}`);
					inside2.push(`{
							minMaxCurr: {min: ${input.initial2[0]}, max: ${input.initial2[1]}, current: ${input.initial2[2]}},
							behaviors: [{ type: ComponentBehaviors.MINMAX_MAX, target: '${input.name}Min', index: ${i} }]
						}`);
				}
				return `${input.name}Min: [${inside.join(',\n')}],
				${input.name}Max: [${inside2.join(',\n')}],`;
			case GeneratorLineSelectValues.MULTISTATE:
				for (let i: number = 0; i < input.instances; i++) {
					inside.push(`{ current: ${input.initial[0]}, showList: false }`);
				}
				return `${input.name}: [${inside.join(',\n')}],`;
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

	// pre-rendered indexed lines to rander in renderOptions
	static optMultiLineInitializationMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.MULTISTATE:
			case GeneratorLineSelectValues.PLUSMINUS:
			case GeneratorLineSelectValues.YESNO:
				let functionName: string = '';
				switch (input.type) {
					case GeneratorLineSelectValues.MULTISTATE:
						functionName = 'MultiState';
						break;
					case GeneratorLineSelectValues.PLUSMINUS:
						functionName = 'PlusMinus';
						break;
					case GeneratorLineSelectValues.YESNO:
						functionName = 'YesNo';
						break;
				}
				return `let ${input.name}AllLines: JSX.Element[] = [];
		       const ${input.name}AllProps = this.short${functionName}Array('${input.name}');
		       for (let i: number = 0; i < ${input.name}AllProps.length; i++) {
		          ${input.name}AllLines.push(<Line key={'${input.name}-' + i} {...${input.name}AllProps[i]} />);
				 }`;
			case GeneratorLineSelectValues.MINMAX:
				return `let ${input.name}AllLines: JSX.Element[] = [];
						 const ${input.name}MinAllProps = this.shortPlusMinusArray('${input.name}Min');
						 const ${input.name}MaxAllProps = this.shortPlusMinusArray('${input.name}Max');
						 for (let i: number = 0; i < ${input.name}MinAllProps.length; i++) {
							 ${input.name}AllLines.push(<Line key={'${input.name}Min-' + i} {...${input.name}MinAllProps[i]} />);
							 ${input.name}AllLines.push(<Line key={'${input.name}Max-' + i} {...${input.name}MaxAllProps[i]} />);
						 }`;
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// lines to render in renderOptions
	static optLineMapper(input: GeneratedElement): string {
		if (input.instances === 1) {
			switch (input.type) {
				case GeneratorLineSelectValues.CATEGORY:
					return `<Line {...this.shortCategory('${input.name}')} />`;
				case GeneratorLineSelectValues.YESNO:
					return `<Line {...this.shortYesNo('${input.name}')} />`;
				case GeneratorLineSelectValues.PLUSMINUS:
					return `<Line {...this.shortPlusMinus('${input.name}')} />`;
				case GeneratorLineSelectValues.MINMAX:
					return `<Line {...this.shortPlusMinus('${input.name}Min')} />
				<Line {...this.shortPlusMinus('${input.name}Max')} />`;
				case GeneratorLineSelectValues.MULTISTATE:
					return `<Line {...this.shortMultiState('${input.name}')} />`;
				default:
					return `// type not implemented: ${input.type}`;
			}
		} else {
			return `{${input.name}AllLines}`;
		}
	}

	// results being read into variables in renderResults
	static resultsLineInitializationMapper(input: GeneratedElement): string {
		let name: string = input.name.substr(0, 1).toUpperCase() + input.name.substr(1);
		switch (input.type) {
			case GeneratorLineSelectValues.NUMBER:
				if (input.instances === 1) {
					return `let res${name}: string = String(this.results.${input.name});`
				}
				else {
					return `let res${name}: string[] = this.results.${input.name}.map(e => String(e));`;
				}
			case GeneratorLineSelectValues.STRING:
				if (input.instances === 1) {
					return `let res${name}: string = this.results.${input.name};`
				}
				else {
					return `let res${name}: string[] = this.results.${input.name};`;
				}
			case GeneratorLineSelectValues.NUMBERARRAY:
				if (input.instances === 1) {
					return `let res${name}: string[] = this.results.${input.name}.map(e => String(e));`;
				}
				else {
					return `let res${name}: string[][] = this.results.${input.name}.map(e => e.map(el => String(el)));`;
				}
			case GeneratorLineSelectValues.STRINGARRAY:
				if (input.instances === 1) {
					return `let res${name}: string[] = this.results.${input.name};`
				}
				else {
					return `let res${name}: string[][] = this.results.${input.name};`;
				}
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// indexed result lines being prerendered
	static resultsMultiLineInitializationMapper(input: GeneratedElement): string {
		let name: string = input.name.substr(0, 1).toUpperCase() + input.name.substr(1);
		return `let ${input.name}AllLines: JSX.Element[] = [];
		for (let i: number = 0; i < this.language.results.${input.name}.length; i++) {
			${input.name}AllLines.push(<Line key={'${input.name}-' + i} {...this.shortResult(this.language.results.${input.name}[i], res${name}[i])} />);
		}`;
	}

	// final render of the result lines
	static resultLineMapper(input: GeneratedElement): string {
		if (input.instances === 1) {
			let name: string = input.name.substr(0, 1).toUpperCase() + input.name.substr(1);
			return `<Line {...this.shortResult(this.language.results.${input.name}[0], res${name})} />`
		} else {
			return `{${input.name}AllLines}`;
		}
	}

	// names of components stored in language
	static optLanguageMapper(input: GeneratedElement): string {
		let inside: string[] = [];
		let inside2: string[] = [];
		switch (input.type) {
			case GeneratorLineSelectValues.YESNO:
			case GeneratorLineSelectValues.PLUSMINUS:
				for (let i: number = 0; i < input.instances; i++) {
					inside.push(`{ title: 'PLACEHOLDER' }`);
				}
				return `${input.name}: [${inside.join(',\n')}],`;
			case GeneratorLineSelectValues.MINMAX:
				for (let i: number = 0; i < input.instances; i++) {
					inside.push(`{ title: 'PLACEHOLDER' }`);
				}
				return `${input.name}Min: [${inside.join(',\n')}],
							${input.name}Max: [${inside.join(',\n')}],`;
			case GeneratorLineSelectValues.MULTISTATE:
				for (let i: number = 0; i < input.instances; i++) {
					inside2 = [];
					for (let j: number = 0; j < Number(input.initial[1]); j++) {
						inside2.push('PLACEHOLDER');
					}
					inside.push(`{ 
						title: 'PLACEHOLDER',
						contents: [
							${inside2.join(',\n')}
						]
					 }`);
				}
				return `${input.name}: [${inside.join(',\n')}],`;
			default:
				return `// type not implemented: ${input.type}`;
		}
	}

	// names of results stored in language
	static resultLanguageMapper(input: GeneratedElement): string {
		if (input.instances === 1) {
			return `${input.name}: ['PLACEHOLDER'],`;
		} else {
			let inside: string[] = [];
			for (let i: number = 0; i < input.instances; i++) {
				inside.push("'PLACEHOLDER'");
			}
			return `${input.name}: [${inside.join(',\n')}],`;
		}
	}

	// initialization of variables used during randomization
	static randomizerInitializationMapper(input: GeneratedElement): string {
		switch (input.type) {
			case GeneratorLineSelectValues.NUMBER:
				if (input.instances === 1) {
					return `let ${input.name}: number = 0;`;
				} else {
					return `let ${input.name}: number[] = [];`;
				}
			case GeneratorLineSelectValues.NUMBERARRAY:
				if (input.instances === 1) {
					return `let ${input.name}: number[] = [];`;
				} else {
					return `let ${input.name}: number[][] = [];`;
				}
			case GeneratorLineSelectValues.STRINGARRAY:
				if (input.instances === 1) {
					return `let ${input.name}: string[] = [];`;
				} else {
					return `let ${input.name}: string[][] = [];`;
				}
			case GeneratorLineSelectValues.STRING:
				if (input.instances === 1) {
					return `let ${input.name}: string = '';`;
				} else {
					return `let ${input.name}: string[] = [];`;
				}
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
		const resultsOnly: boolean = opts.length === 0;

		// relevant imports
		let gameImports = '';
		if (resultsOnly) { gameImports += ', GameState'; }
		if (opts.filter(e => e.type === GeneratorLineSelectValues.MINMAX).length) { gameImports += ', ComponentBehaviors'; }

		// content of the interface dictating results' structure
		const resultsInterface: string = results.map(this.resultInterfaceMapper).join('\n');

		// content of the state initialization in constructor
		const yesnoState: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.YESNO).map(this.optStateMapper).join('\n'));
		const _plusminusStateBasic: string = opts.filter(e => e.type === GeneratorLineSelectValues.PLUSMINUS).map(this.optStateMapper).join('\n');
		const _plusminusStateMinMax: string = opts.filter(e => e.type === GeneratorLineSelectValues.MINMAX).map(this.optStateMapper).join('\n');
		let _plusminusStates: string[] = [];
		if (_plusminusStateBasic) { _plusminusStates.push(_plusminusStateBasic); }
		if (_plusminusStateMinMax) { _plusminusStates.push(_plusminusStateMinMax); }
		const plusminusState: string = this.addBreaks(_plusminusStates.join('\n'));
		let multistateState: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.MULTISTATE).map(this.optStateMapper).join('\n'));

		// state initialization in constructor itself
		let stateInitialization: string = '';
		if (!resultsOnly) {
			stateInitialization = `this.state = {
			showResults: false,
			yesno: {${yesnoState}},
			plusminus: {${plusminusState}},
			multistate: {${multistateState}},
		};`;
		} else {
			stateInitialization = `this.state = this.randomizeState({
				showResults: false,
				yesno: {},
				plusminus: {},
				multistate: {},
			});`;
		}

		// content of the results object in the constructor
		const resultsInitialization: string = results.map(this.resultInitializationMapper).join('\n');

		// indexed lines to prerender in renderOptions
		const indexedOptLines: string = this.addBreaks(opts.filter(e => e.instances > 1).map(this.optMultiLineInitializationMapper).join('\n'));

		// lines to render in renderOptions
		const optLines: string = opts.map(this.optLineMapper).join('\n');

		// renderOptions itself
		let renderOptions: string = '';
		if (!resultsOnly) {
			renderOptions = `renderOptions() {${indexedOptLines}
			return (
				<>
					${optLines}
					{this.createOptionsButtons()}
				</>
			);
		}`;
		} else {
			renderOptions = 'renderOptions() { return this.renderResults(); }';
		}

		// results being read into variables in renderResults
		const resultsLineInitialization: string = results.map(this.resultsLineInitializationMapper).join('\n');

		// indexed results being prerendered for displaying in renderResults
		const indexedResultLinesInitialization: string = this.addBreaks(results.filter(e => e.instances > 1).map(this.resultsMultiLineInitializationMapper).join('\n'));

		// results being displayed in renderResults
		const resultLines: string = results.map(this.resultLineMapper).join('\n');

		// result buttons depend on whether there are options
		const resultButtons: string = resultsOnly ? '{this.createResultsOnlyButtons()}' : '{this.createResultsButtons()}';

		// names of categories stored in language
		const languageCategories: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.CATEGORY).map(e => `${e.name}: 'PLACEHOLDER',`).join('\n'));

		// names of components stored in language
		const languageYesNo: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.YESNO).map(this.optLanguageMapper).join('\n'));
		const languagePlusMinus: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.PLUSMINUS || e.type === GeneratorLineSelectValues.MINMAX)
			.map(this.optLanguageMapper).join('\n'));
		const languageMultiState: string = this.addBreaks(opts.filter(e => e.type === GeneratorLineSelectValues.MULTISTATE).map(this.optLanguageMapper).join('\n'));

		// names of results stored in language
		const languageResults: string = this.addBreaks(results.map(this.resultLanguageMapper).join('\n'));

		// initialization of variables used during randomization
		const randomizerInitialization: string = results.map(this.randomizerInitializationMapper).join('\n');

		// randomized results being saved in the results object
		const randomizerAscription: string = results.map(e => `this.results.${e.name} = ${e.name};`).join('\n');

		// randomizer function(s) themselves
		let randomizer: string = '';
		if (resultsOnly) {
			randomizer = `randomize() {
				this.setState(this.randomizeState(this.state));
			}
		
			randomizeState(currentState:GameState) {
				${randomizerInitialization}
		
				// perform randomization
		
				${randomizerAscription}
		
				let newState = Object.assign({}, currentState, { showResults: !currentState.showResults });
				return newState;
			}`;
		} else {
			randomizer = `randomize() {
				${randomizerInitialization}

				// perform randomization
				
				${randomizerAscription}
		
				let newState = Object.assign({}, this.state, { showResults: true });
				this.setState(newState);
			}`;
		}

		return `import React from 'react';
		import { Game, GameProps${gameImports} } from '../Game';
		import General from '../../general/General';
		import { Line } from '../../components/Line';

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
		${indexedResultLinesInitialization}
		return (
			<>
				${resultLines}
				${resultButtons}
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
					this.language = {
						categories: {${languageCategories}},
						yesno: {${languageYesNo}},
						plusminus: {${languagePlusMinus}},
						multistate: {${languageMultiState}},
						specifics: {},
						specificArrays: {},
						results: {${languageResults}},
					};
					break;

			case 'English':
			default:
					this.language = {
						categories: {${languageCategories}},
						yesno: {${languageYesNo}},
						plusminus: {${languagePlusMinus}},
						multistate: {${languageMultiState}},
						specifics: {},
						specificArrays: {},
						results: {${languageResults}},
					};
				break;
		}
		this.currentLanguage = this.props.language;
	}

	//#endregion
	//==================================================================================================================================
	//#region === randomizer

	${randomizer}

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