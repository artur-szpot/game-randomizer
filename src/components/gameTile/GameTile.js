import React from 'react';
import './GameTile.css';

/**
 * A tile displaying the game's name and thumbnail in the main menu.
 * Accepts as props:
 * - title: the name to be displayed
 * - onClick: the function to be called upon being clicked
 * - image: an URL to the image
 * - key: a unique identifier to allow this component to be stored in a list
 */
class GameTile extends React.Component {
   render() {
      return (
         <div className='col-sm-6 col-md-4 col-lg-3 col-xl-2 gameTile'>
            <div className="gameTileBackground" style={{ backgroundImage: "url('" + this.props.image + "')" }}></div>
            <div className='gameTileFigure' onClick={this.props.onClick} key={this.props.title}>
               <div className='gameTileDivTop'>
                  <img src={this.props.image} alt={this.props.title} className='gameTileImage' />
               </div>
               <div className='gameTileDivBot'>
                  <p>{this.props.title} </p>
               </div >
            </div >
         </div>
      );
   }
}

export default GameTile;