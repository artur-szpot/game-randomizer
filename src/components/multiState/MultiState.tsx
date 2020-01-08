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
	outsideClick(props: MultiStateProps): void
}

//#endregion
//==================================================================================================================================

export class MultiState extends React.Component<MultiStateProps> {

	/** Takes care of hiding the list view when anything outside of it is clicked. */
	constructor(props: MultiStateProps) {
		super(props)
		this.setWrapperRef = this.setWrapperRef.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}

	wrapperRef: Node | null = null
	listenerState: boolean = false
	listenerToggle(newState: boolean) {
		if (this.listenerState === newState) { return }
		if (!this.listenerState) {
			document.addEventListener('mousedown', this.handleClickOutside)
		} else {
			document.removeEventListener('mousedown', this.handleClickOutside)
		}
		this.listenerState = newState
	}
	setWrapperRef(node: HTMLDivElement) { this.wrapperRef = node }
	handleClickOutside(event: MouseEvent) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target as Node)) {
			this.props.onClick.outsideClick(this.props)
		}
	}

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
		let mainClasses = 'mainMulti ' + (this.props.isRandomChance ? 'multiRandomChance' : 'multiButton')
		
		const mainButtonClasses = 'multiButtonMain ' + (this.props.isRandomChance ? 'multiButtonMainRandomChance' : 'multiButtonMainButton')
		const mainButtonAction = this.props.isRandomChance ? () => null : () => this.props.onClick.listClick(this.props)

		let sideButtonClasses = 'multiButtonSide ' + (this.props.isRandomChance ? 'multiButtonSideRandomChance' : 'multiButtonSideButton')

		const rightEnabled = !this.props.isRandomChance || this.props.currentState < this.props.states.length - 1
		const rightIcon = <i className={this.props.isRandomChance ? (rightEnabled ? 'fas fa-plus-square' : '') : 'fas fa-angle-right'}></i>
		const rightAction = rightEnabled ? () => this.props.onClick.mainClick(this.props, 1) : () => null
		const rightButton = <div className={rightEnabled ? sideButtonClasses : 'multiButtonSide'} onClick={rightAction}>{rightIcon}</div>
		
		const leftEnabled = !this.props.isRandomChance || this.props.currentState > 0
		const leftIcon = <i className={this.props.isRandomChance ? (leftEnabled ? 'fas fa-minus-square' : '') : 'fas fa-angle-left'}></i>
		const leftAction = leftEnabled ? () => this.props.onClick.mainClick(this.props, -1) : () => null
		const leftButton = <div className={leftEnabled ? sideButtonClasses : 'multiButtonSide'} onClick={leftAction}>{leftIcon}</div>
		this.listenerToggle(this.props.showList)
		if (this.props.showList) {
			mainClasses += ' hidden'
		} else {
			subListClasses += ' hidden'
		}

		/** Actual rendering part. */
		return (
			<>
				<div className={mainClasses}>
					{leftButton}
					<div
						className={mainButtonClasses}
						onClick={mainButtonAction}
					>
						<p className='multiButtonTitle'>{this.props.states[this.props.currentState]}</p>
						<div>
							{subButtons}
						</div>
					</div>
					{rightButton}
				</div>
				<div className={subListClasses} ref={this.setWrapperRef}>
					{bigSubButtons}
				</div>
			</>
		);
	}
}