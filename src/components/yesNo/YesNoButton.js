import React from 'react';
import './YesNo.css';

/**
 * A boolean visualisation: a big YES or NO button.
 */
class YesNoButton extends React.Component {
	render() {
		/** The label is being passed on by the main application because it is language-dependent. */
		let label = this.props.opts[1];
		/** The styling depends on the button's state. */
		let classlabel = 'yesnoButtonNo';
		if (this.props.yes) {
			label = this.props.opts[0];
			classlabel = 'yesnoButtonYes';
		}
		let myClass = 'yesnoButton ' + classlabel;
		/** The actual rendering. */
		return (
			<button
				className={myClass}
				onClick={() => this.props.onClick()}
			>
				{label}
			</button>
		);
	}
}

export default YesNoButton;