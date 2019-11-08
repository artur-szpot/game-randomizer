import React from 'react';
import './MultiState.css';

/**
 * The sub-button serves a dual purpose:
 * - while in button mode, it shows how far into the list of possible values the user is
 * - while in list mode, it serves as a list item
 */

export interface MultiStateSubProps {
	mini: boolean;
	active: boolean;
	text: string|null;
	onClick?: () => void;
}

export class MultiStateSub extends React.Component<MultiStateSubProps>{
	render() {
		if (this.props.mini) {
			/** Produces the dot for button mode. */
			let classes = 'multiButtonProgressDot' + (this.props.active ? ' multiButtonProgressDotActive' : '');
			return (<div className={classes}></div>);
		} else {
			/** Produces the list item for list mode. */
			let classes = 'multiListItem' + (this.props.active ? ' multiListItemChosen' : '');
			return (
				<button className={classes} onClick={this.props.onClick}>
					{this.props.text}
				</button>
			);
		}
	}
}