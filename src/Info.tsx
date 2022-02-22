import clsx from 'clsx'
import React from 'react'

export enum InfoType { NONE, TEXT_LEFT, TEXT_CENTER, BLOCK_CONTAINER, BLOCK, BLOCK_CONTAINER_SPLIT, BLOCK_CONTAINER_SHAPE, BLOCK_SHAPE, BLOCK_CONTAINER_SPLIT_SHAPE }

export interface InfoProps {
   type: InfoType
   values: JSX.Element[]
   blocks?: InfoProps[]
   blockRows?: InfoProps[][]
   className?: string
}

export const infoBlock: (values: string[], split?: boolean) => InfoProps = (values: string[], split?: boolean) => {
   return {
      type: split ? InfoType.BLOCK_CONTAINER_SPLIT : InfoType.BLOCK_CONTAINER,
      values: [],
      blocks: values.map(e => { return { type: InfoType.BLOCK, values: renderInfo(e) } })
   }
}
export const infoBlockShape: (values: number[][], split?: boolean) => InfoProps = (values: number[][], split?: boolean) => {
   return {
      type: split ? InfoType.BLOCK_CONTAINER_SPLIT_SHAPE : InfoType.BLOCK_CONTAINER_SHAPE,
      values: [],
      blockRows: values.map(
         e => {
            return e.map(
               el => { return { type: InfoType.BLOCK_SHAPE, values: [], className: renderShape(el) } }
            )
         }
      )
   }
}
export const infoLeft: (value: string) => InfoProps = (value: string) => {
   return { type: InfoType.TEXT_LEFT, values: renderInfo(value) }
}
export const infoCenter: (value: string) => InfoProps = (value: string) => {
   return { type: InfoType.TEXT_CENTER, values: renderInfo(value) }
}

function regexExactMatch(input: string, regex: RegExp): boolean {
   const regexResult = regex.exec(input)
   return (regexResult && regexResult[0] === input) as boolean
}

const renderInfo: (value: string) => JSX.Element[] = (value: string) => {
   const words = value.split(' ')
   let spanWords: string[] = []
   let retval: JSX.Element[] = []
   const colorBoxRegex = /\[.*\]/
   const pushSpanWords: () => void = () => {
      if (spanWords.length > 0) {
         retval.push(<span key={`span-${retval.length}`}>{spanWords.join(' ')}</span>)
         spanWords = []
      }
   }
   words.forEach(e => {
      if (regexExactMatch(e, colorBoxRegex)) {
         pushSpanWords()
         const color = e.substr(1, e.length - 2)
         retval.push(<span className='color-box' key={`color-box-${retval.length}`} style={{ backgroundColor: color }}></span>)
      } else {
         spanWords.push(e)
      }
   })
   pushSpanWords()
   return retval
}

const renderShape: (value: number) => string = (value: number) => {
   switch (value) {
      case 0:
         return "hidden"
      case 1:
         return "full"
      case 2:
         return "gold"
   }
   return ""
}

export function Info(props: InfoProps) {
   switch (props.type) {
      case InfoType.TEXT_LEFT:
         return <p className='bb info info-left'>{props.values}</p>
      case InfoType.TEXT_CENTER:
         return <p className='bb info info-center'>{props.values}</p>
      case InfoType.BLOCK_CONTAINER:
         return (<div className='bb info info-block-container'>
            {props.blocks?.map(e => <div className='bb info info-block'>{e.values}</div>)}
         </div>)
      case InfoType.BLOCK_CONTAINER_SHAPE:
         return (<div className='bb info info-block-container'>
            {props.blockRows?.map(e => (
               <div className='block-row'>
                  {e.map(el => <div className={clsx('bb info info-block-shape', el.className)}></div>)}
               </div>
            ))}
         </div>)
      case InfoType.BLOCK_CONTAINER_SPLIT:
         return (<div className='bb info info-block-container-split'>
            {props.blocks?.map(e => <div className='bb info info-block'>{e.values}</div>)}
         </div>)
      case InfoType.BLOCK_CONTAINER_SPLIT_SHAPE:
         return (<div className='bb info info-block-container-split'>
            {props.blockRows?.map(e => (
               <div className='block-row'>
                  {e.map(el => <div className={clsx('bb info info-block-shape', el.className)}></div>)}
               </div>
            ))}
         </div>)
   }
   return null
}