import React from 'react'

export enum InfoType { NONE, TEXT_LEFT, TEXT_CENTER, BLOCK_CONTAINER, BLOCK }
export enum BlockContainerType { NONE, FULL, HALF }
export enum BlockType { NONE, LOOSE_5_BY_5, CONCISE, CONCISE_BLOCK, CONCISE_EMPTY, CONCISE_GOLD }

export interface InfoProps {
   type: InfoType
   values: JSX.Element[]

   blocks?: InfoProps[][]
   blockType?: BlockType
   blockContainerType?: BlockContainerType
}

type infoBlockType = (values: string[] | number[][], containerType: BlockContainerType, blockType: BlockType) => InfoProps
export const infoBlock: infoBlockType = (values: string[] | number[][], containerType: BlockContainerType, blockType: BlockType) => {
   let blocks: InfoProps[][] = []
   switch (blockType) {
      case BlockType.LOOSE_5_BY_5:
      default:
         blocks = [(values as string[]).map(e => { return { type: InfoType.BLOCK, blockType: BlockType.LOOSE_5_BY_5, values: renderInfo(e) } })]
         break
      case BlockType.CONCISE:
         blocks = (values as number[][]).map(row => row.map(e => { return { 
            type: InfoType.BLOCK, 
            blockType: e === 0 ? BlockType.CONCISE_EMPTY : (e == 1 ? BlockType.CONCISE_BLOCK : BlockType.CONCISE_GOLD), values: [] } 
         }))
         break
   }
   return {
      type: InfoType.BLOCK_CONTAINER,
      blockContainerType: containerType,
      blockType: blockType,
      values: [],
      blocks: blocks
   }
}
export const infoLeft: (value: string) => InfoProps
   = (value: string) => {
      return { type: InfoType.TEXT_LEFT, values: renderInfo(value) }
   }
export const infoCenter: (value: string) => InfoProps
   = (value: string) => {
      return { type: InfoType.TEXT_CENTER, values: renderInfo(value) }
   }

function regexExactMatch(input: string, regex: RegExp): boolean {
   const regexResult = regex.exec(input)
   return (regexResult && regexResult[0] === input) as boolean
}

const renderInfo: (value: string) => JSX.Element[]
   = (value: string) => {
      const words = value.split(' ')
      let spanWords: string[] = []
      let retval: JSX.Element[] = []
      const colorBoxRegex = /\[.*\]/
      const pushSpanWords: () => void = () => {
         if (spanWords.length) {
            retval.push(<div style={{display: 'inline-block'}}><span>{spanWords.join(' ')}</span></div>)
            spanWords = []
         }
      }
      words.forEach(e => {
         if (regexExactMatch(e, colorBoxRegex)) {
            pushSpanWords()
            const color = e.substr(1, e.length - 2)
            retval.push(<div className='color-box' style={{ backgroundColor: color }}></div>)
         } else {
            spanWords.push(e)
         }
      })
      pushSpanWords()
      return retval
   }

export function Info(props: InfoProps) {
   switch (props.type) {
      case InfoType.TEXT_LEFT:
         return <p className='bb info info-left'>{props.values}</p>
      case InfoType.TEXT_CENTER:
         return <p className='bb info info-center'>{props.values}</p>
      case InfoType.BLOCK_CONTAINER:
         let suffix = ''
         switch (props.blockContainerType!) {
            case BlockContainerType.FULL:
               suffix = 'full'
               break
            case BlockContainerType.HALF:
               suffix = 'half'
               break
         }
         let blocks: JSX.Element[] = []
         props.blocks!.forEach(e => blocks.push(<div className='info-block-row'>{e.map(el => renderInfoBlock(el))}</div>))
         return <div className={`bb info-block-container-${suffix}`}>
            {blocks}
         </div>
   }
   return null
}

function renderInfoBlock(block: InfoProps) {
   switch (block.blockType!) {
      case BlockType.LOOSE_5_BY_5:
         return <div className='bb info info-block'>{block.values}</div>
      case BlockType.CONCISE_GOLD:
         return <div className='bb info info-block concise full gold'>{block.values}</div>
      case BlockType.CONCISE_BLOCK:
         return <div className='bb info info-block concise full'>{block.values}</div>
      case BlockType.CONCISE_EMPTY:
         return <div className='bb info info-block concise empty'>{block.values}</div>
   }
}