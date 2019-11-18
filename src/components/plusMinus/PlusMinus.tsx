import React from 'react';
import './PlusMinus.css';
import { ComponentProps } from '../Line';
import { ComponentState, ComponentLanguage } from '../../apps/Game';

/**
 * An element allowing increasing or decresing the desired amount within set limits.
 */

export interface PlusMinusProps extends ComponentProps {
	minMaxCurr: MinMaxCurrent;
	onClick(name: string, index: number, change: number): void;
}
export interface PlusMinusState extends ComponentState {
	minMaxCurr: MinMaxCurrent
}
export interface PlusMinusLanguage extends ComponentLanguage { };

export interface MinMaxCurrent {
	min: number;
	max: number;
	current: number;
}

export class PlusMinus extends React.Component<PlusMinusProps> {
	/** Checks whether applying a given change to the current value of the [min, max, current] array would cause it to be invalid. */
	static validateMinMaxCurr(values: MinMaxCurrent, change: number): boolean {
		if (values.current + change < values.min) { return false; }
		if (values.current + change > values.max) { return false; }
		return true;
	}

	render() {
		let minusClasses: string = 'plusminusButton plusminusButton' + ((this.props.minMaxCurr.current > this.props.minMaxCurr.min) ? 'On' : 'Off');
		let plusClasses: string = 'plusminusButton plusminusButton' + ((this.props.minMaxCurr.max > this.props.minMaxCurr.current) ? 'On' : 'Off');
		return (
			<>
				<button
					className={minusClasses}
					onClick={() => this.props.onClick(this.props.name, this.props.index, -1)}
				>
					<p className='plusminusButtonText'>-</p>
				</button>
				<div className='inline'>
					<p className='plusminusValue'>
						{this.props.minMaxCurr.current}
					</p>
				</div>
				<button
					className={plusClasses}
					onClick={() => this.props.onClick(this.props.name, this.props.index, 1)}
				>
					<p className='plusminusButtonText'>+</p>
				</button>
			</>
		);
	}
}