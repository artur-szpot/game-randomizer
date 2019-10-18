import React from 'react';
import Cell from '../components/cell/Cell';
import Text from '../components/text/Text';
import MultiStateButton from '../components/multiState/MultiStateButton';
import PlusMinus from '../components/plusMinus/PlusMinus';
import YesNoButton from '../components/yesNo/YesNoButton';
import './Line.css';

/**
 * The single 'row' of a randomizing application.
 * Consists of two cells: one bearing the name/instruction of the row, and the other the actual reactive component.
 */
class Line extends React.Component {
   render() {
      let myThings = [];

      if (this.props.lineType === 'BigButton') {
         let myClass = 'anyButton bigButton ' + this.props.color;
         let divClass = '';
         if (this.props.first) {
            divClass = ' mt-5';
         }
         myThings.push(
            <div className={'col-xs-10 col-lg-10 col-xl-6 px-3' + divClass} key={myThings.length}>
               <button className={myClass} onClick={this.props.onClick}>{this.props.text}</button>
            </div>
         );
      } else if (this.props.lineType === 'Category') {
         let divClass = '';
         if (!this.props.visible) {
            divClass += ' hidden';
         }
         let subText = null;
         if (this.props.subtext) {
            if (this.props.list) {
               let items = [];
               for (let i=0; i<this.props.subtext.length; i++) {
                  items.push(<li key={i}>{this.props.subtext[i]}</li>)
               }
               subText = <ul className='separatorList'>{items}</ul>
            } else {
               subText = <p className='separatorText'>{this.props.subtext}</p>;
            }
         }
         myThings.push(
            <div className={'col-xs-10 col-lg-10 col-xl-6 px-3' + divClass} key={myThings.length}>
               <p className='separatorTitle'>{this.props.text}</p>
               <hr className='separator' />
               {subText}
            </div>
         );
      } else {

            let myBoolean = true; 

            myThings.push(
               <Cell
                  visible={this.props.visible}
                  hidden={this.props.hidden}
                  key={myThings.length}
                  title={true}
                  full={myBoolean}
                  inside={
                     <Text
                        text={this.props.title}
                        bold={true}
                        darkBG={true} //temp
                        title={true}
                        first={this.props.first}
                     />
                  }
               />
            );
            let cellInside;
            switch (this.props.lineType) {
               case 'MultiState':
                  cellInside = (
                     <MultiStateButton
                        states={this.props.states}
                        currentState={this.props.currentState}
                        onNextClick={this.props.onNextClick}
                        onPrevClick={this.props.onPrevClick}
                        onSubClick={this.props.onSubClick}
                        onListClick={this.props.onListClick}
                        showList={this.props.showList}
                     />
                  );
                  break;
               case 'PlusMinus':
                  cellInside = (
                     <PlusMinus
                        minMaxCurr={this.props.minMaxCurr}
                        onMinusClick={this.props.onMinusClick}
                        onPlusClick={this.props.onPlusClick}
                     />
                  );
                  break;
               case 'YesNo':
                  cellInside = (
                     <YesNoButton
                        opts={this.props.opts}
                        yes={this.props.yesNo}
                        onClick={this.props.onClick}
                     />
                  );
                  break;
               case 'Text':
                  cellInside = (
                     <Text
                        text={this.props.text}
                        bold={false}
                        darkBG={true}
                        title={false}
                        hideSeparator={true}
                     />
                  );
                  break;
               case 'TextList':
                  cellInside = (
                     <Text
                        text={this.props.text}
                        bold={false}
                        darkBG={true}
                        title={false}
                        hideSeparator={true}
                        list={true}
                     />
                  );
                  break;
            }
            myThings.push(
               <Cell
                  visible={this.props.visible}
                  hidden={this.props.hidden}
                  key={myThings.length}
                  center={true}
                  full={myBoolean}
                  inside={cellInside}
               />
            );
        // }
      }

      return (<>
         <div className='row no-gutters justify-content-center'>
            {myThings}
         </div>
      </>);
   }
}

export default Line;