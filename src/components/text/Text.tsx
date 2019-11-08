import React from 'react';
import './Text.css';
import {ComponentProps} from '../Line';

/**
 * The most basic cell content type, displaying text only.
 * In the most compact view, this also includes a horizontal line, visually dividing its component from the next.
 */

export interface TextProps extends ComponentProps {
	bold: boolean;
	hideSeparator: boolean;
	first: boolean;
	text: string;
}

export class Text extends React.Component<TextProps> {
	render() {
		let classes: string = 'text textWhite';
		let textHr: JSX.Element | null = null;
		let hrClasses: string = 'textSeparator textSeparatorWhite d-block d-md-none';
		if (this.props.bold) { classes += ' textBold'; }
		if (!this.props.hideSeparator && !this.props.first) { textHr = <hr className={hrClasses} /> }
		return (
			<>
				{textHr}
				<p className={classes}>{this.props.text}</p>
			</>
		);
	}
}