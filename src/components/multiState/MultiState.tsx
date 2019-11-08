import React from 'react';
import { MultiStateSub, MultiStateSubProps } from './MultiStateSub';
import './MultiState.css';
import {ComponentProps} from '../Line';

/**
 * The multi state button is actually a two-in-one.
 * It holds a list of its possible values, allowing the user to choose from between them in one of two ways:
 * - in the button mode, it has a 'next' and 'previous' buttons to switch the value by 1
 * - in the list mode (accesible by pressing the central part of the button), any value from the list can be chosen.
 */

export interface MultiStateProps extends ComponentProps {
	showList: boolean;
	currentState: number;
	onClick: MultiStateClickFunctions;
	states: string[];
}

interface MultiStateClickFunctions {
	subClick(name: string, index: number): void;
	listClick(name: string): void;
	mainClick(name: string, change: number): void;
}

export class MultiState extends React.Component<MultiStateProps> {
	miniSub(index: number): MultiStateSubProps {
		return {
			mini: true,
			active: index === this.props.currentState,
			text: null,
		}
	}

	listSub(index: number): MultiStateSubProps {
		return {
			mini: false,
			active: index === this.props.currentState,
			onClick: () => this.props.onClick.subClick(this.props.name, index),
			text: this.props.states[index],
		}
	}

	render() {
		/** Prepare a list of progress dots and list items based on props. */
		let subButtons:JSX.Element[] = [];
		let bigSubButtons:JSX.Element[] = [];
		for (let i = 0; i < this.props.states.length; i++) {
			subButtons.push(<MultiStateSub key={this.props.name + i} {...this.miniSub(i)} />);
			bigSubButtons.push(<MultiStateSub key={this.props.name + i} {...this.listSub(i)} />);
		}

		/** Set the classes, including hiding the currently unused part of the multi. */
		let subListClasses = 'multiListContainer';
		let mainClasses = 'multiCell';
		if (this.props.showList) {
			mainClasses += ' hidden';
		} else {
			subListClasses += ' hidden';
		}

		/** Actual rendering part. */
		return (
			<>
				<div className={mainClasses}>
					<button
						className='multiButton multiButtonPrev'
						onClick={() => this.props.onClick.mainClick(this.props.name, -1)}
					>
						&lt;
					</button>
					<button
						className='multiButton multiButtonMain'
						onClick={() => this.props.onClick.listClick(this.props.name)}
					>
						<div className='multiButtonContainer'>
							<p className='multiButtonTitle'>{this.props.states[this.props.currentState]}</p>
							{subButtons}
						</div>
					</button>
					<button
						className='multiButton multiButtonNext'
						onClick={() => this.props.onClick.mainClick(this.props.name, 1)}
					>
						&gt;
						</button>
				</div>
				<div className={subListClasses}>
					{bigSubButtons}
				</div>
			</>
		);
	}
}