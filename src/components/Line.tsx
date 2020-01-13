import React from 'react'
import { Cell, CellProps } from './cell/Cell'
import { Text, TextProps } from './text/Text'
import { MultiState, MultiStateProps } from './multiState/MultiState'
import { PlusMinus, PlusMinusProps } from './plusMinus/PlusMinus'
import { YesNo, YesNoProps } from './yesNo/YesNo'
import './Line.css'

/**
 * The single 'row' of a randomizing application.
 * Consists of two cells: one bearing the name/instruction of the row, and the other the actual reactive component.
 */

export interface ComponentProps {
   name: string
   index: number
}

export interface CategoryProps extends ComponentProps {
   text: string[]
   text_category: string[]
   tag_color: string[]
   title: string
   error: boolean
   result: boolean
   colors: string[]
   hiddenMessage: string
   unhideFunction: () => void
}

export enum LineTypes {
   TEXT,
   MULTISTATE,
   PLUSMINUS,
   YESNO,
   CATEGORY,
}

export interface LineProps {
   visible: boolean
   title: TextProps | null
   lineType: LineTypes
   insideProps: ComponentProps
}

export class Line extends React.Component<LineProps> {
   render() {
      switch (this.props.lineType) {
         case LineTypes.CATEGORY:
            return this.renderSingle()
         default:
            return this.renderDouble()
      }
   }

   renderDouble() {
      let titleCellProps: CellProps = {
         title: true,
         center: false,
         visible: true, // this.props.visible,
         inside: <Text {...this.props.title!} />,
      }

      let titleCell: JSX.Element = <Cell key={this.props.insideProps.name + '-title'} {...titleCellProps} />

      let insideComponent: JSX.Element | null = null

      switch (this.props.lineType) {
         case LineTypes.TEXT:
            insideComponent = <Text {...this.props.insideProps as TextProps} />
            break
         case LineTypes.MULTISTATE:
            insideComponent = <MultiState {...this.props.insideProps as MultiStateProps} />
            break
         case LineTypes.YESNO:
            insideComponent = <YesNo {...this.props.insideProps as YesNoProps} />
            break
         case LineTypes.PLUSMINUS:
            insideComponent = <PlusMinus {...this.props.insideProps as PlusMinusProps} />
            break
      }

      let contentCellProps: CellProps = {
         title: false,
         center: true,
         visible: true, // this.props.visible,
         inside: insideComponent,
      }

      let contentCell: JSX.Element = <Cell key={this.props.insideProps.name + '-content'} {...contentCellProps} />

      let VERYTEMP = this.props.visible ? ' rowShown' : ' rowHidden'

      return (
         <div className={VERYTEMP}>
            <div className='row no-gutters justify-content-center'>
               {titleCell}
               {contentCell}
            </div>
         </div>
      )
   }

   categoryColorText(category: string, categoryLength: number, color: string, text: string): JSX.Element {
      if (color.indexOf('/') === -1) {
         return (<>
            <span className='resultCategory' style={{ minWidth: (categoryLength + 0.3) + 'rem' }}>{category}:</span>
            <div className='resultColor' style={{ backgroundColor: color }}></div>
            <span className='resultText'>{text}</span>
         </>)
      }
      else {
         const colors = color.split('/')
         return (<>
            <span className='resultCategory' style={{ minWidth: (categoryLength + 0.3) + 'rem' }}>{category}:</span>
            <div className='resultColor' style={{ background: `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)` }}></div>
            <span className='resultText'>{text}</span>
         </>)
      }
   }

   renderSingle() {
      let content: JSX.Element | null = null
      let divClasses: string = ''

      switch (this.props.lineType) {
         case LineTypes.CATEGORY:
            let categoryProps: CategoryProps = this.props.insideProps as CategoryProps
            if (!this.props.visible) { divClasses = ' hidden' }
            let text: JSX.Element | null = null
            if (categoryProps.hiddenMessage) {
               text = (<>
                  <div onClick={categoryProps.unhideFunction} className='hiddenLink'><p>{categoryProps.hiddenMessage}</p></div>
               </>)
            }
            else {
               if (categoryProps.text.length || categoryProps.colors.length) {
                  if (categoryProps.result) {
                     let items: JSX.Element[] = []
                     let ulClass: string = ''
                     if (categoryProps.text.length) {
                        if (categoryProps.tag_color.length || categoryProps.text_category.length) {
                           const category_length = Math.max(...categoryProps.text_category.map(e => e.length))
                           const inside = (i: number, e: string) => this.categoryColorText(categoryProps.text_category[i], category_length, categoryProps.tag_color[i], e)
                           items = categoryProps.text.map((e, index) => <li key={categoryProps.name + '-' + index}>{inside(index, e)}</li>)
                        } else {
                           items = categoryProps.text.map((e, index) => <li key={categoryProps.name + '-' + index}>{e}</li>)
                        }
                        ulClass = 'separatorList'
                     }
                     if (categoryProps.colors.length) {
                        items = categoryProps.colors.map((e, index) => <li key={categoryProps.name + '-' + index}><div style={{ backgroundColor: e }}></div></li>)
                        ulClass = 'colorList'
                     }
                     text = <ul className={ulClass}>{items}</ul>
                  } else {
                     let classes: string = 'separatorText' + (categoryProps.error ? ' separatorError' : '')
                     text = <p className={classes}>{categoryProps.text}</p>
                  }
               }
            }
            content = (<>
               <p className='separatorTitle'>{categoryProps.title}</p>
               <hr className='separator' />
               {text}
            </>)
      }

      return (
         <div className='row no-gutters justify-content-center'>
            <div className={'col-xs-10 col-lg-10 col-xl-6 px-3' + divClasses}>
               {content}
            </div>
         </div>
      )
   }
}