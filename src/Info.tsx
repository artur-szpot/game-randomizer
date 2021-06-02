import React from 'react'

export enum InfoType { NONE, TEXT_LEFT, TEXT_CENTER, BLOCK_CONTAINER, BLOCK }

export interface InfoProps {
   type: InfoType
   value: string
   blocks?: InfoProps[]
}

export const infoBlock: (values: string[]) => InfoProps = (values: string[]) => {
   return {
      type: InfoType.BLOCK_CONTAINER,
      value: '',
      blocks: values.map(e => { return { type: InfoType.BLOCK, value: e } })
   }
}
export const infoLeft: (value: string) => InfoProps = (value: string) => { return { type: InfoType.TEXT_LEFT, value: value } }
export const infoCenter: (value: string) => InfoProps = (value: string) => { return { type: InfoType.TEXT_CENTER, value: value } }

export function Info(props: InfoProps) {
   switch (props.type) {
      case InfoType.TEXT_LEFT:
         return <p className='info info-left'>{props.value}</p>
      case InfoType.TEXT_CENTER:
         return <p className='info info-center'>{props.value}</p>
      case InfoType.BLOCK_CONTAINER:
         return <div className='info info-block-container'>
            {props.blocks?.map(e => <div className='info info-block'>{e.value}</div>)}
         </div>
   }
   return null
}