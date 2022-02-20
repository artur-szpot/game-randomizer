import React from 'react'

export enum InfoType { NONE, TEXT_LEFT, TEXT_CENTER, BLOCK_CONTAINER, BLOCK }

export interface InfoProps {
   type: InfoType
   values: JSX.Element[]
   blocks?: InfoProps[]
}

export const infoBlock: (values: string[]) => InfoProps = (values: string[]) => {
   return {
      type: InfoType.BLOCK_CONTAINER,
      values: [],
      blocks: values.map(e => { return { type: InfoType.BLOCK, values: renderInfo(e) } })
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

const renderInfo: (value:string)=>JSX.Element[] = (value:string) => {
   const words = value.split(' ')
   let spanWords: string[] = []
   let retval: JSX.Element[] = []
   const colorBoxRegex = /\[.*\]/
   const pushSpanWords: ()=>void = () => {
      if(spanWords.length > 0){
         retval.push(<span key={`span-${retval.length}`}>{spanWords.join(' ')}</span>)
         spanWords = []
      }
   }
   words.forEach(e=>{
      if(regexExactMatch(e, colorBoxRegex)){
         pushSpanWords()
         const color = e.substr(1, e.length-2)
         retval.push(<span className='color-box' key={`color-box-${retval.length}`} style={{backgroundColor: color}}></span>)
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
         return <div className='bb info info-block-container'>
            {props.blocks?.map(e => <div className='bb info info-block'>{e.values}</div>)}
         </div>
   }
   return null
}