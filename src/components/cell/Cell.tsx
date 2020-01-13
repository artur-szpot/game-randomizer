import React from 'react'
import './Cell.css'

/**
 * A single cell making up one part of a line.
 */

export interface CellProps {
	title: boolean
	center: boolean
	visible: boolean
	inside: JSX.Element | null
}

export class Cell extends React.Component<CellProps> {

	render() {
		/* basic classes */
		let outerClasses = 'col-xs-12 col-md-6 col-lg-5 col-xl-3 p-2 p-md-3'
		let innerClasses = 'cellContents'

		/* modify classes as necessary */
		if (this.props.visible) {
			if (this.props.title) { innerClasses += ' cellTitle text-md-right' }
			if (this.props.center) { innerClasses += ' cellCenter' }
		} else { outerClasses += ' hidden' }

		/* generate output */
		return (
			<div className={outerClasses}>
				<div className={innerClasses}>
					{this.props.inside}
				</div>
			</div>
		)
	}
}