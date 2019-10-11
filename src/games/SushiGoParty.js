import React from 'react';
import General from '../general/General';
import Line from '../line/Line';

class SushiGoParty extends React.Component {
	//#region === generated functions

	// language 
	currentLanguage = this.props.language;
	language = {};

	// functions
	functions = {
		// big buttons
		onClickRandomize: () => this.randomize(false),
		onClickOptions: () => this.showOptions(),
	};

	//#endregion
	//#region === additional variables

	//#endregion
	//#region === initial settings

	constructor(props) {
		super(props);
		this.setLanguage();
      this.randomize(true);
	}

	//#endregion
	//#region === renders

	render() {
		if (this.props.language !== this.currentLanguage) {
			this.setLanguage();
      }
      if (this.state.results.nigiri === null) {
         return;
      }
      
		let resNigiri = this.language.opts.nigiri[this.state.results.nigiri];
		let resRolls = this.language.opts.rolls[this.state.results.rolls];
      let resAppetizersTemp = [];
      for(let i=0; i<this.state.results.appetizers.length; i++) {
         resAppetizersTemp.push(this.language.opts.appetizers[this.state.results.appetizers[i]]);
      }
      let resAppetizers = General.list(resAppetizersTemp);
      let resSpecialsTemp = [];
      for(let i=0; i<this.state.results.specials.length; i++) {
         resSpecialsTemp.push(this.language.opts.specials[this.state.results.specials[i]]);
      }
      let resSpecials = General.list(resSpecialsTemp);
		let resDessert = this.language.opts.desserts[this.state.results.dessert];

		return (
			<>
				<Line
					lineType='Text'
					title={this.language.results.nigiri}
					text={resNigiri}
					visible={true}
					first={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.rolls}
					text={resRolls}
					visible={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.appetizers}
					text={resAppetizers}
					visible={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.specials}
					text={resSpecials}
					visible={true}
				/>
				<Line
					lineType='Text'
					title={this.language.results.dessert}
					text={resDessert}
					visible={true}
				/>
				<Line
					lineType='BigButton'
					text={this.language.opts.rerandomize}
					color='green'
					onClick={this.functions.onClickRandomize}
					first={true}
				/>
				<Line
					lineType='BigButton'
					text={this.language.opts.home}
					color='red'
					onClick={this.props.onClickHome}
				/>
			</>
		);
	}

	//#endregion
	//#region === language

	setLanguage() {
		switch (this.props.language.name) {
			case "Polski":
				this.language.opts = {
					rerandomize: 'Losuj ponownie',
               home: 'Powrót do menu',
               nigiri: ['Nigiri'],
               rolls: ['Futomaki', 'Uramaki', 'Temaki'],
               appetizers: ['Tempura', 'Sashimi', 'Pierożek Gyoza', 'Węgorz', 'Edamame', 'Onigiri', 'Tofu', 'Zupa Miso'],
               specials: ['Wasabi', 'Pałeczki', 'Łyżeczka', 'Pudełko na wynos', 'Sos sojowy', 'Herbata', 'Menu', 'Zamówienie specjalne'],
               desserts: ['Pudding', 'Lody herbaciane', 'Owoce']
            }
				this.language.results = {
					nigiri: 'Nigiri',
					rolls: 'Rolki',
					appetizers: 'Przystawki',
					specials: 'Specjalne',
					dessert: 'Deser',
				}
				break;

			case "English":
			default:
				this.language.opts = {
					rerandomize: 'Randomize again',
               home: 'Home',
               nigiri: ['Nigiri'],
               rolls: ['Maki', 'Uramaki', 'Temaki'],
               appetizers: ['Tempura', 'Sashimi', 'Dumpling', 'Eel', 'Edamame', 'Onigiri', 'Tofu', 'Miso soup'],
			      specials: ['Wasabi', 'Chopsticks', 'Spoon', 'Takeout box', 'Soy sauce', 'Tea', 'Menu', 'Special order'],
			      desserts: ['Pudding', 'Green tea ice cream', 'Fruit']
            }
				this.language.results = {
					nigiri: 'Nigiri',
					rolls: 'Rolls',
					appetizers: 'Appetizers',
					specials: 'Specials',
					dessert: 'Dessert',
				}
				break;
		}
		this.currentLanguage = this.props.language;
	}

	//#endregion
	//#region === randomizer

	randomize(firstRun) {
		// generate results
		let nigiri = 0;
		let rolls = General.random(0, 2);
		let appetizers;
		let specials;
      let dessert = General.random(0, 2);

      // randomize
      let indices = [0, 1, 2, 3, 4, 5, 6, 7];
      appetizers = General.randomFromArray(indices, 3);
      indices = [0, 1, 2, 3, 4, 5, 6, 7];
      specials = General.randomFromArray(indices, 3);

      // save them
      let results = {
         nigiri: null,
         rolls: null,
         appetizers: null,
         specials: null,
         dessert: null,
      }
		results.nigiri = nigiri;
		results.rolls = rolls;
		results.appetizers = appetizers;
		results.specials = specials;
      results.dessert = dessert;

      // show 'em
      if (firstRun) {
         this.state = {
            results: results
         }
      } else {
         let newState;
         newState = Object.assign({}, this.state, { results: results });
         this.setState(newState);
      }
	}

	//#endregion
}

export default SushiGoParty;