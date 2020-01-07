import React from 'react'
import { MultiStateSub, MultiStateSubProps } from './MultiStateSub'
import './MultiState.css'
import { ComponentProps } from '../Line'
import { ComponentState, ComponentLanguage } from '../../apps/Game'

/**
 * The multi state button is actually a two-in-one.
 * It holds a list of its possible values, allowing the user to choose from between them in one of two ways:
 * - in the button mode, it has a 'next' and 'previous' buttons to switch the value by 1
 * - in the list mode (accesible by pressing the central part of the button), any value from the list can be chosen.
 */

//==================================================================================================================================
//#region === component props, state and language

export interface MultiStateProps extends ComponentProps {
	showList: boolean
	currentState: number
	onClick: MultiStateClickFunctions
	states: string[]
	isRandomChance: boolean // may become an enum later on if more special MultiStates are designed
}

export interface MultiStateState extends ComponentState {
	current: number
	showList: boolean
}

export interface MultiStateLanguage extends ComponentLanguage {
	contents: string[]
};

export interface MultiStateClickFunctions {
	subClick(props: MultiStateProps, subIndex: number): void
	listClick(props: MultiStateProps): void
	mainClick(props: MultiStateProps, change: number): void
}

//#endregion
//==================================================================================================================================

export class MultiState extends React.Component<MultiStateProps> {

	/** Checks whether applying the change will not result in overflow - if so, sets the value back to 0. */
	static validateNewChosen(current: number, change: number, max: number): number {
		let retval: number = current + change
		if (retval < 0) {
			retval = max - 1
		} else if (retval >= max) {
			retval = 0
		}
		return retval
	}

	/** Creates props for MultiSubState in the mini state. */
	miniSub(index: number): MultiStateSubProps {
		let active: boolean;
		if (this.props.isRandomChance) {
			active = index < this.props.currentState
		} else {
			active = index === this.props.currentState
		}
		return {
			mini: true,
			active: active,
			text: null,
			randomChance: this.props.isRandomChance,
			index: index
		}
	}

	/** Creates props for MultiSubState in the list item state. */
	listSub(subIndex: number): MultiStateSubProps {
		return {
			mini: false,
			active: subIndex === this.props.currentState,
			onClick: () => this.props.onClick.subClick(this.props, subIndex),
			text: this.props.states[subIndex],
			randomChance: false,
			index: 0
		}
	}

	render() {
		/** Prepare a list of progress dots and list items based on props. */
		let subButtons: JSX.Element[] = []
		let bigSubButtons: JSX.Element[] = []
		for (let i = 0; i < this.props.states.length - (this.props.isRandomChance ? 1 : 0); i++) {
			subButtons.push(<MultiStateSub key={this.props.name + i} {...this.miniSub(i)} />)
		}
		for (let i = 0; i < this.props.states.length; i++) {
			bigSubButtons.push(<MultiStateSub key={this.props.name + i} {...this.listSub(i)} />)
		}

		/** Set the classes, including hiding the currently unused part of the multi. */
		let subListClasses = 'multiListContainer'
		let mainClasses = 'multiCell multiButton'
		if (this.props.showList) {
			mainClasses += ' hidden'
		} else {
			subListClasses += ' hidden'
		}

		/** Actual rendering part. */
		return (
			<>
				<div className={mainClasses}>
					<div
						className='multiButtonSide'
						onClick={() => this.props.onClick.mainClick(this.props, -1)}
					>
						<i className='fas fa-angle-left'></i>
					</div>
					<div
						className='multiButtonMain'
						onClick={() => this.props.onClick.listClick(this.props)}
					>
						<p className='multiButtonTitle'>{this.props.states[this.props.currentState]}</p>
						<div>
							{subButtons}
						</div>
					</div>
					<div
						className='multiButtonSide'
						onClick={() => this.props.onClick.mainClick(this.props, 1)}
					>
					<i className='fas fa-angle-right'></i>
					</div>
				</div>
				<div className={subListClasses}>
					{bigSubButtons}
				</div>
			</>
		);
	}
}



{/* <button
className='multiButton multiButtonPrev'
onClick={() => this.props.onClick.mainClick(this.props, -1)}
>
<p className='icon icon-multi icon-left-open'></p>
</button>
<button
className='multiButton multiButtonMain'
onClick={() => this.props.onClick.listClick(this.props)}
>
<div className='multiButtonContainer'>
	<p className='multiButtonTitle'>{this.props.states[this.props.currentState]}</p>
	{subButtons}
</div>
</button>
<button
className='multiButton multiButtonNext'
onClick={() => this.props.onClick.mainClick(this.props, 1)}
>
<p className='icon icon-multi icon-right-open'></p>
</button> */}