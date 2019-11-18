import React from 'react';
import './YesNo.css';
import { ComponentProps } from '../Line';
import { ComponentState, ComponentLanguage } from '../../apps/Game';

/**
 * A boolean visualisation: a big YES or NO button.
 */

export interface YesNoProps extends ComponentProps {
	onClick(name: string, index: number): void;
	yes: boolean;
	display: string[];
}
export interface YesNoState extends ComponentState {
	yes: boolean
}
export interface YesNoLanguage extends ComponentLanguage { };

export class YesNo extends React.Component<YesNoProps> {
	render() {
		/** The display values are passed on from the main application because they are language-dependent. */
		let display: string = this.props.display[this.props.yes ? 0 : 1];

		/** The styling depends on the button's state. */
		let classes: string = 'yesnoButton ' + (this.props.yes ? 'yesnoButtonYes' : 'yesnoButtonNo');

		/** The actual rendering. */
		return (
			<button
				className={classes}
				onClick={() => this.props.onClick(this.props.name, this.props.index)}
			>
				{display}
			</button>
		);
	}
}