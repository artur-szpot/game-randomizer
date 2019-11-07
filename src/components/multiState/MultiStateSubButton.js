import React from 'react';
import './MultiState.css';

/**
 * The sub-button serves a dual purpose:
 * - while in button mode, it shows how far into the list of possible values the user is
 * - while in list mode, it serves as a list item
 */
class MultiStateSubButton extends React.Component {
	render() {
		if (this.props.mini) {
			let myClass = 'multiButtonProgressDot';
			if (this.props.active) {
				myClass += ' multiButtonProgressDotActive';
			}
			return (<div className={myClass}></div>);
		} else {
			let myClass = 'multiListItem ';
			if (this.props.active) {
				myClass += 'multiListItemChosen';
			}
			return (
				<button className={myClass} onClick={this.props.onClick}>
					{this.props.text}
				</button>
			);
		}
	}
}

export default MultiStateSubButton;