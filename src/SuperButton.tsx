import React, { MouseEvent } from 'react'

export enum SuperButtonValueType { 
   // extract a particular type of value from the object
   STRING, 
   NUMBER, 
   // the object is a special type of value
   MENU 
}

export interface SuperButtonValueRaw {
   string?: string
   number?: number
}
export interface SuperButtonValue {
   valueType: SuperButtonValueType
   value: SuperButtonValueRaw
}

export interface SuperButtonProps {
   displayText: string
   value?: SuperButtonValue
   onClick?: (event: MouseEvent, value?: SuperButtonValue) => void
}
export function stringValue(displayText: string, value: string): SuperButtonProps {
   return {
      displayText: displayText,
      value: {
         valueType: SuperButtonValueType.STRING,
         value: { string: value }
      }
   }
}
export function numberValue(displayText: string, value: number): SuperButtonProps {
   return {
      displayText: displayText,
      value: {
         valueType: SuperButtonValueType.NUMBER,
         value: { number: value }
      }
   }
}
export function specialValue(displayText: string, value: SuperButtonValueType): SuperButtonProps {
   return {
      displayText: displayText,
      value: {
         valueType: value,
         value: {}
      }
   }
}
export function noValue(displayText: string): SuperButtonProps {
   return {
      displayText: displayText
   }
}

export function SuperButton(props: SuperButtonProps): JSX.Element {
   return (
      <button className='super-button' onClick={e => props.onClick!(e, props.value)}>{props.displayText}</button>
   )
}