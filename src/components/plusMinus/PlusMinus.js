import React from 'react';
import './PlusMinus.css';

/**
 * An element allowing increasing or decresing the desired amount within set limits.
 */
class PlusMinus extends React.Component {
	render() {
		let minusClasses = 'plusminusButton';
		if (this.props.minMaxCurr[2] > this.props.minMaxCurr[0]) {
			minusClasses += ' plusminusButtonOn';
		} else {
			minusClasses += ' plusminusButtonOff';
		}

		let plusClasses = 'plusminusButton';
		if (this.props.minMaxCurr[1] > this.props.minMaxCurr[2]) {
			plusClasses += ' plusminusButtonOn';
		} else {
			plusClasses += ' plusminusButtonOff';
		}

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

export default PlusMinus;