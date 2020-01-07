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
   subtext: string[]
   text: string
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
         visible: this.props.visible,
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
         visible: this.props.visible,
         inside: insideComponent,
      }

      let contentCell: JSX.Element = <Cell key={this.props.insideProps.name + '-content'} {...contentCellProps} />

      return (
         <div className='row no-gutters justify-content-center'>
            {titleCell}
            {contentCell}
         </div>
      )
   }

   renderSingle() {
      let content: JSX.Element | null = null
      let divClasses: string = ''

      switch (this.props.lineType) {
         case LineTypes.CATEGORY:
            let categoryProps: CategoryProps = this.props.insideProps as CategoryProps
            if (!this.props.visible) { divClasses = ' hidden' }
            let subText: JSX.Element | null = null
            if (categoryProps.hiddenMessage) {
               subText = (<>
                  <div onClick={categoryProps.unhideFunction} className='hiddenLink'><p>{categoryProps.hiddenMessage}</p></div>
               </>)
            }
            else {
               if (categoryProps.subtext.length || categoryProps.colors.length) {
                  if (categoryProps.result) {
                     let items: JSX.Element[] = []
                     let ulClass: string = ''
                     if (categoryProps.subtext.length) {
                        items = categoryProps.subtext.map((e, index) => <li key={categoryProps.name + '-' + index}>{e}</li>)
                        ulClass = 'separatorList'
                     }
                     if (categoryProps.colors.length) {
                        items = categoryProps.colors.map((e, index) => <li key={categoryProps.name + '-' + index}><div style={{ backgroundColor: e }}></div></li>)
                        ulClass = 'colorList'
                     }
                     subText = <ul className={ulClass}>{items}</ul>
                  } else {
                     let classes: string = 'separatorText' + (categoryProps.error ? ' separatorError' : '')
                     subText = <p className={classes}>{categoryProps.subtext}</p>
                  }
               }
            }
            content = (<>
               <p className='separatorTitle'>{categoryProps.text}</p>
               <hr className='separator' />
               {subText}
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