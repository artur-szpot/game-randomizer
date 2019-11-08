import React from 'react';
import './PlusMinus.css';
import {ComponentProps} from '../Line';

/**
 * An element allowing increasing or decresing the desired amount within set limits.
 */

export interface PlusMinusProps extends ComponentProps {
	minMaxCurr: number[];
	onClick(name: string, change: number): void;
}

export class PlusMinus extends React.Component<PlusMinusProps> {
	render() {
		let minusClasses: string = 'plusminusButton plusminusButton' + ((this.props.minMaxCurr[2] > this.props.minMaxCurr[0]) ? 'On' : 'Off');
		let plusClasses: string = 'plusminusButton plusminusButton' + ((this.props.minMaxCurr[1] > this.props.minMaxCurr[2]) ? 'On' : 'Off');
		return (
			<>
				<button
					className={minusClasses}
					onClick={() => this.props.onClick(this.props.name, -1)}
				>
					<p className='plusminusButtonText'>-</p>
				</button>
				<div className='inline'>
					<p className='plusminusValue'>
						{this.props.minMaxCurr[2]}
					</p>
				</div>
				<button
					className={plusClasses}
					onClick={() => this.props.onClick(this.props.name, 1)}
				>
					<p className='plusminusButtonText'>+</p>
				</button>
			</>
		);
	}
}