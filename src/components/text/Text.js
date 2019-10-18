import React from 'react';
import './Text.css';

/**
 * The most basic cell content type, displaying text only.
 * In the most compact view, this also includes a horizontal line, visually dividing its component from the next.
 */
class Text extends React.Component {
	render() {
		let myClass = 'text';
		let textHr = null;
		let hrClasses = 'textSeparator d-block d-md-none';

		if (this.props.bold) {
			myClass += ' textBold';
		}
		if (this.props.darkBG) {
			myClass += ' textWhite';
			hrClasses += ' textSeparatorWhite';
		}

		if (!this.props.hideSeparator && !this.props.first) {
			textHr = <hr className={hrClasses} />
		}

		return (
			<>
				{textHr}
				<p className={myClass}>{this.props.text}</p>
			</>
		);
	}
}

export default Text;