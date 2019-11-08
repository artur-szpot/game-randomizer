import React from 'react';
import logo from '../img/gr-logo.png';
import './flags/flag.css';
import './Navbar.css';
import { GamePropsLanguage } from '../apps/Game';
import { GameData } from '../general/Data';

/**
 * The header of the application, consisting mainly of its navbar and the about section.
 */

export interface NavbarProps {
   languages: { [key: string]: GamePropsLanguage };
   languageChosen: GamePropsLanguage;
   languageClick(name: string): void;
   gameChosen: GameData | null;
   onClickHome: () => void;
}

export class Navbar extends React.Component<NavbarProps> {
   render() {
      /** Create a list of languages to be used by the dropdown menu. */
      let languageList: JSX.Element[] = [];
      let languageChosenClasses: string = 'flag-icon flag-icon-inline flag-icon-' + this.props.languageChosen.abbr;

      for (let lang in this.props.languages) {
         let flagClasses: string = 'flag-icon flag-icon-' + this.props.languages[lang].abbr;
         languageList.push(
            <div className='dropdown-item flag-wrapper pt-3 pointer' onClick={() => this.props.languageClick(lang)} key={'div-' + lang}>
               <span className={flagClasses} key={'span-' + lang}></span>
               <p className='flag-label' key={'p-' + lang}>{this.props.languages[lang].name}</p>
            </div>
         );
      }

      /** 
       * Create a brand consisting of a miniature game thumbnail (unless in main menu, then app logo) 
       * and a properly formatted title string. Also, create a (c) button for copyrights.
       * */
      let brand: JSX.Element | null = null;
      let copyrightButton: JSX.Element | null = null;
      let copyrightContent: JSX.Element | null = null;
      if (this.props.gameChosen != null) {
         let gameName: string;
         if (this.props.gameChosen.titles[this.props.languageChosen.name] === undefined) {
            gameName = this.props.gameChosen.titles['default'];
         } else {
            gameName = this.props.gameChosen.titles[this.props.languageChosen.name];
         }
         let gameRandomizerName = this.props.languageChosen.rnd.replace('~', gameName);
         brand = (
            <div className='navbar-brand my-auto pointer p-0 navbarBrandContainer' onClick={this.props.onClickHome}>
               <img src={this.props.gameChosen.image} className='inline navbarBrandImage navbarBrandImageBorder' alt='Logo' />
               <p className='navbarBrandText d-none d-md-inline'>{gameRandomizerName}</p>
               <p className='navbarBrandText d-none d-sm-inline d-md-none'>{gameName}</p>
            </div>
         );
         copyrightButton = (
            <li className='nav-item my-auto ml-2'>
               <button className='nobutton icon icon-copyright' type='button' data-toggle='collapse' data-target='#copyrightpanel'>
               </button>
            </li>
         );

         let designers: JSX.Element[] = [];
         let separator: string = '';
         for (let i = this.props.gameChosen.designers.length - 1; i > -1; i--) {
            designers.push(<><a href={this.props.gameChosen.designers[i].url}>{this.props.gameChosen.designers[i].name}</a>{separator}</>);
            separator = ', ';
         }
         designers.reverse();
         let designersPlural: string = designers.length > 1 ? 's' : '';

         let publishers: JSX.Element[] = [];
         separator = '';
         for (let i = this.props.gameChosen.publishers.length - 1; i > -1; i--) {
            publishers.push(<><a href={this.props.gameChosen.publishers[i].url} key={i}>{this.props.gameChosen.publishers[i].name}</a>{separator}</>);
            separator = ', ';
         }
         publishers.reverse();
         let publishersPlural: string = designers.length > 1 ? 's' : '';

         copyrightContent = (
            <>
               <h3>{gameName}</h3>
               <p><strong>Designer{designersPlural}:</strong> {designers}</p>
               <p><strong>Publisher{publishersPlural}:</strong> {publishers}</p>
               <p><a href={this.props.gameChosen.bgg}>{gameName}</a> <strong> on BoardGameGeek.com</strong></p>
               <hr />
            </>
         );
      } else {
         brand = (
            <div className='navbar-brand my-auto pointer p-0 navbarBrandContainer'>
               <img src={logo} className='inline navbarBrandImage' alt='logo' />
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

                  {copyrightButton}

               </ul>
            </div>

            <div className='panel bg-primary collapse' id='infopanel'>
               <h3>Game randomizer</h3>
               <p>A free application designed to facilitate the process of randomizing setups of board games, as well as to practice React, TypeScript, JavaScript, CSS &amp; HTML.</p>
               <p>The author claims no rights to any of the games supported by the application; these go to their respective designers and/or publishers.
                  See the copyrights section on each game's page for a listing of these designers and publishers.
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
               <p><strong>TypeScript</strong> - visit <a href='https://www.typescriptlang.org/'>typescriptlang.org</a></p>
               <p>Also, plain old Javascript, CSS and HTML.</p>
               <p>Developed using <a href="https://code.visualstudio.com/">Visual Studio Code</a>.</p>
               <hr />
            </div>

            <div className='panel bg-primary collapse' id='copyrightpanel'>
               <h3>Ownership/copyright recognition</h3>
               <p>The author of Game Randomizer claims no rights to any of the games supported by the application; these go to their respective designers and/or publishers.</p>
               <p>The application's only intent is to facilitate the process of setting up a randomized starting state of games supported by it.</p>
               <hr />
               {copyrightContent}
            </div>
         </>
      );
   }
}