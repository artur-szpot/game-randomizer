import React from 'react';
import logo from '../img/gr-logo.png';
import './flags/flag.css';
import './Navbar.css';

/**
 * The header of the application, consisting mainly of its navbar and the about section.
 * Accepts as props:
 * - gameChosen: an object containing information about the game vital for its correct displaying
 * - onClickHome: the function allowing the brand to redirect the user to main menu
 * - languageChosen: an object containg information about the currently actuve language
 * - languages: an array of information about all the available languages
 * - languageClicks: an array of functions allowing the parent to react to language being chosen from the drop-down menu
 * 
 * TODO: move the about section into a separate main-page component?
 * TODO: create an actual logo
 */
class Navbar extends React.Component {
   render() {
      /** Create a list of languages to be used by the dropdown menu. */
      let languageList = [];
      let languageChosenClasses = 'flag-icon flag-icon-inline flag-icon-' + this.props.languageChosen.abbr;

      for (let i in this.props.languages) {
         let myClasses = 'flag-icon flag-icon-' + this.props.languages[i].abbr;
         languageList.push(
            <div className='dropdown-item flag-wrapper pt-3 pointer' onClick={this.props.languageClicks[i]} key={i}>
               <span className={myClasses}></span><p className='flag-label'>{this.props.languages[i].name}</p>
            </div>);
      }

      /** Create a brand consisting of a miniature game thumbnail (unless in main menu, then app logo) and a properly formatted title sting. */
      let brand = null;
      if (this.props.gameChosen != null) {
         let gameName;
         if (this.props.gameChosen.titles[this.props.languageChosen.name] === undefined) {
            gameName = this.props.gameChosen.titles['default'];
         } else {
            gameName = this.props.gameChosen.titles[this.props.languageChosen.name];
         }
         let gameRandomizerName = this.props.languageChosen.rnd.replace('~',gameName);
         brand = (
            <div className='navbar-brand my-auto pointer p-0 navbarBrandContainer' onClick={this.props.onClickHome}>
               <img src={this.props.gameChosen.image} className='inline navbarBrandImage navbarBrandImageBorder' />
               <p className='navbarBrandText d-none d-md-inline'>{gameRandomizerName}</p>
               <p className='navbarBrandText d-none d-sm-inline d-md-none'>{gameName}</p>
            </div>
         );
      } else {
         brand = (
            <div className='navbar-brand my-auto pointer p-0 navbarBrandContainer'>
               <img src={logo} className='inline navbarBrandImage' />
               <p className='navbarBrandText d-none d-sm-inline'>{this.props.languageChosen.title}</p>
            </div>
         );
      }

      /** The actual rendering part. */
      return (
         <>
            <div className='navbar bg-primary navbar-dark navbar-expand'>

               {brand}

                  <ul className='navbar-nav ml-auto'>

                     <li className='nav-item dropdown mr-2 my-auto'>
                        <div id='languageBoxIcon' className='nav-link dropdown-toggle mt-2 pointer' data-toggle='dropdown' role='button'>
                           <span className={languageChosenClasses}></span>
                        </div>
                        <div id='languageBoxDropdown' className='dropdown-menu dropdown-menu-right'>
                           {languageList}
                        </div>
                     </li>

                     <li className='nav-item my-auto'>
                        <button className='nobutton icon icon-info-circled' type='button' data-toggle='collapse' data-target='#infopanel'>
                        </button>
                     </li>

                     {/* Despite initial expectations, there are no settings to be used (for now...?)
                     <li className='nav-item my-auto'>
                        <button className='nobutton icon icon-cog' type='button' data-toggle='collapse' data-target='#settingspanel'>
                        </button>
                     </li> */}

                  </ul>
            </div>

            <div className='bg-primary collapse' id='infopanel'>
               <h3>Game randomizer</h3>
               <p>A free application designed to facilitate the process of randomizing setups of board games, as well as to practice React, Javascript, CSS &amp; HTML.</p>
               <p>The author claims no rights to any of the games supported by the application; these go to their respective designers and/or publishers.
                  See the copyrights section for a temporary listing of these designers and publishers.
               </p>
               <p>The source code is inaccesible directly through the website due to how React works, but it can be freely obtained at the&nbsp;
                   <a href="https://github.com/artur-szpot/game-randomizer">project's GitHub page</a>.</p>
               <p>There are only three working randomizers for now; more are coming with future releases! 
                  The thumbnails are both a sneak-peak into the future and placeholders to make the front page appear less empty.
               </p>
               <hr />
               <h3>Author:</h3>
               <p>Artur Szpot (<a href="https://github.com/artur-szpot">GitHub</a>).</p>
               <p>The project is being developed since July 2019 and is alive as of October 2019.</p>
               <hr />
               <h3>Copyrights</h3>
               <p><strong>Near and Far: </strong>
                  designer <a href="http://www.ryanlaukat.com/">Ryan Laukat</a>, 
                  publisher <a href="https://redravengames.squarespace.com">Red Raven Games</a>
               </p>
               <p><strong>51st State: Master Set: </strong>
                  designer <a href="https://boardgamegeek.com/boardgamedesigner/4735/ignacy-trzewiczek">Ignacy Trzewiczek</a>, 
                  publisher <a href="https://portalgames.pl/">Portal Games</a>
               </p>
               <p><strong>Sushi Go! Party: </strong>
                  designer <a href="http://www.philwalkerharding.com">Phil Walker-Harding</a>, 
                  publisher <a href="http://www.gamewright.com/gamewright/">Gamewright</a>
               </p>
               <hr />
               <h3>Font used for symbols:</h3>
               <p><strong>Font Awesome</strong>, Copyright &copy; 2016 by Dave Gandy</p>
               <p>Author: Dave Gandy</p>
               <p>License: SIL ()</p>
               <p>Homepage: <a href='http://fortawesome.github.com/Font-Awesome/'>fortawesome.github.com/Font-Awesome</a></p>
               <p>Additional thank you to <strong>Fontello</strong> for providing a neat and easy to use solution! Visit <a href='http://fontello.com'>fontello.com</a> to learn more.</p>
               <hr />
               <h3>Flags:</h3>
               <p>Styling of the miniature flag images used for the language dropdown menu was adopted from flag-icon-css, a wonderful node module created by Panayiotis Lipiridis 
                  (<a href="https://github.com/lipis/flag-icon-css">GitHub project page</a>)
               </p>
               <hr />
               <h3>Technologies used:</h3>
               <p><strong>React</strong> - visit <a href='https://reactjs.org/'>reactjs.org</a></p>
               <p><strong>Bootstrap</strong> - visit <a href='https://getbootstrap.com/'>getbootstrap.com</a></p>
               <p>Also, plain old Javascript, CSS and HTML.</p>
               <p>Developed using <a href="https://code.visualstudio.com/">Visual Studio Code</a>.</p>
               <hr />
            </div>
         </>
      );
   }
}

export default Navbar;