import clsx from 'clsx'
import React, { MouseEvent } from 'react'

export enum BBValueType {
   // holds a type of value
   STRING,
   NUMBER,
   BOOLEAN,
   // holds no value
   OK,
   // special object
   MENU, // go back to menu from any screen
}

export interface IBBValue {
   string?: string
   number?: number
   boolean?: boolean
}

export class BBValue {
   valueType: BBValueType
   value: IBBValue

   constructor(valueType: BBValueType, value: IBBValue) {
      this.valueType = valueType
      this.value = value
   }

   static stringValue(value: string): BBValue {
      return new BBValue(BBValueType.STRING, { string: value })
   }
   static numberValue(value: number): BBValue {
      return new BBValue(BBValueType.NUMBER, { number: value })
   }
   static booleanValue(value: boolean): BBValue {
      return new BBValue(BBValueType.BOOLEAN, { boolean: value })
   }
   static noValue(): BBValue {
      return new BBValue(BBValueType.OK, {})
   }

   getString(): string {
      if (this.valueType !== BBValueType.STRING) {
         throw new Error("Tried to extract string from a non-string button")
      }
      return this.value.string!
   }
   getNumber(): number {
      if (this.valueType !== BBValueType.NUMBER) {
         throw new Error("Tried to extract number from a non-number button")
      }
      return this.value.number!
   }
   getBoolean(): boolean {
      if (this.valueType !== BBValueType.BOOLEAN) {
         throw new Error("Tried to extract boolean from a non-boolean button")
      }
      return this.value.boolean!
   }

   isMenu(): boolean { return this.valueType === BBValueType.MENU }
   isOK(): boolean { return this.valueType === BBValueType.OK }
}

export enum BB_STYLE { DISABLED, ON, OFF }
export const BB_STYLE_ON_OFF = (state: boolean) => state ? BB_STYLE.ON : BB_STYLE.OFF

export interface IBBProps {
   displayText: string
   isIcon?: boolean
   value: BBValue
   styles?: BB_STYLE[]
}

export interface BBProps extends IBBProps {
   onClick: (event: MouseEvent, value: BBValue) => void
}

export function stringBB(displayText: string, value: string): IBBProps {
   return {
      displayText: displayText,
      value: BBValue.stringValue(value)
   }
}
export function numberBB(displayText: string, value: number): IBBProps {
   return {
      displayText: displayText,
      value: BBValue.numberValue(value)
   }
}
export function booleanBB(displayText: string, value: boolean): IBBProps {
   return {
      displayText: displayText,
      value: BBValue.booleanValue(value)
   }
}
export enum BBICon { HOME, NEXT, PREV, RESTART }
export function iconBB(icon: BBICon, value: BBValueType): IBBProps {
   let displayText = ''
   switch (icon) {
      case BBICon.HOME:
         displayText = 'fas fa-home'
         break
      case BBICon.NEXT:
         displayText = 'fas fa-angle-double-right'
         break
      case BBICon.PREV:
         displayText = 'fas fa-angle-double-left'
         break
      case BBICon.RESTART:
         displayText = 'fas fa-redo-alt'
         break
   }
   return {
      displayText: displayText,
      isIcon: true,
      value: new BBValue(value, {})
   }
}
export function okBB(displayText: string): IBBProps {
   return {
      displayText: displayText,
      value: BBValue.noValue()
   }
}
export function styledBB(base: IBBProps, styles: BB_STYLE | BB_STYLE[]): IBBProps {
   return Object.assign(base, { styles: Array.isArray(styles) ? styles : [styles] })
}

export function BigButton(props: BBProps) {
   let onClick: ((e: MouseEvent) => void) | undefined = e => props.onClick(e, props.value)
   if (props.styles?.includes(BB_STYLE.DISABLED)) {
      onClick = undefined
   }
   const classes = clsx(
      'bb super-button',
      props.styles?.includes(BB_STYLE.DISABLED) && 'disabled',
      props.styles?.includes(BB_STYLE.OFF) && 'toggler-off',
      props.styles?.includes(BB_STYLE.ON) && 'toggler-on',
      props.isIcon && 'icon'
   )
   let inside: JSX.Element = <span>{props.displayText}</span>
   if (props.isIcon) {
      inside = <i className={props.displayText}></i>
   }
   return (
      <button className={classes} onClick={onClick}>{inside}</button>
   )
}