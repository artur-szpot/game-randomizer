import React from 'react';
import './Cell.css';

/**
 * A single cell making up one part of a line.
 */
class Cell extends React.Component {

	render() {
		/* basic classes */
		let myOuterClass = 'col-xs-12 col-md-6 col-lg-5 col-xl-3 p-2 p-md-3';
		let myInnerClass = 'cellContents';

		/* modify classes as necessary */
		if (this.props.visible) {
			if (this.props.title) {
				myInnerClass += ' cellTitle text-md-right';
			}
			if (this.props.center) {
				myInnerClass += ' cellCenter';
			}
			if (this.props.hidden) {
				myInnerClass += ' invisible';
			}
		} else {
			myOuterClass += ' hidden';
		}

		/* generate output */
		return (
			<div className={myOuterClass}>
				<div className={myInnerClass}>
					{this.props.inside}
				</div>
			</div>
		);
	}
}

export default Cell;