import logo from '../img/gr-logo.png' // temp

export interface Owner {
	name: string
	url: string
}
export interface GameData {
	name: string;
	titles: { [key: string]: string }
	image: string
	designers: Owner[]
	publishers: Owner[]
	bgg: string
}

export class Data {
	static designers: { [key: string]: Owner } = {
		RyanLaukat: {
			name: 'Ryan Laukat',
			url: 'http://www.ryanlaukat.com',
		},
		IgnacyTrzewiczek: {
			name: 'Ignacy Trzewiczek',
			url: 'https://boardgamegeek.com/boardgamedesigner/4735/ignacy-trzewiczek'
		},
		PhilWalkerHarding: {
			name: 'Phil Walker-Harding',
			url: 'http://www.philwalkerharding.com'
		},
		DonaldXVaccarino: {
			name: 'Donald X. Vaccarino',
			url: 'https://boardgamegeek.com/boardgamedesigner/10525/donald-x-vaccarino'
		},
		AdrianAdamescu: {
			name: 'Adrian Adamescu',
			url: 'https://boardgamegeek.com/boardgamedesigner/88370/adrian-adamescu'
		},
		DarylAndrews: {
			name: 'Daryl Andrews',
			url: 'https://boardgamegeek.com/boardgamedesigner/67502/daryl-andrews'
		},
		WolfgangPanning: {
			name: 'Wolfgang Panning',
			url: 'https://boardgamegeek.com/boardgamedesigner/249/wolfgang-panning'
		},
		MarcoRuskowski: {
			name: 'Marco Ruskowski',
			url: 'https://boardgamegeek.com/boardgamedesigner/34864/marco-ruskowski'
		},
		MarcelSuesselbeck: {
			name: 'Marcel Süßelbeck',
			url: 'https://boardgamegeek.com/boardgamedesigner/34866/marcel-susselbeck'
		},
		PaoloMori: {
			name: 'Paolo Mori',
			url: 'http://www.inventoridigiochi.it/'
		},
		JordyAdan: {
			name: 'Jordy Adan',
			url: 'https://boardgamegeek.com/boardgamedesigner/109218/jordy-adan'
		}
	}
	static publishers: { [key: string]: Owner } = {
		RedRavenGames: {
			name: 'Red Raven Games',
			url: 'https://redravengames.squarespace.com',
		},
		PortalGames: {
			name: 'Portal Games',
			url: 'https://portalgames.pl'
		},
		Gamewright: {
			name: 'Gamewright',
			url: 'http://www.gamewright.com/gamewright'
		},
		QueenGames: {
			name: 'Queen Games',
			url: 'https://www.queen-games.com'
		},
		FloodgateGames: {
			name: 'Floodgate Games',
			url: 'http://floodgategames.com'
		},
		CMON: {
			name: 'CMON Limited',
			url: 'http://cmon.com'
		},
		ThunderworksGames: {
			name: 'Thunderworks Games',
			url: 'http://www.thunderworksgames.com'
		}
	}
	static games: { [key: string]: GameData } = {
		NearAndFar: {
			name: 'NearAndFar',
			titles: { default: 'Near and Far' },
			image: 'https://cf.geekdo-images.com/thumb/img/PDunwFmZeYRfCXx2B5glMugNofk=/fit-in/200x150/pic3605785.jpg',
			designers: [Data.designers.RyanLaukat],
			publishers: [Data.publishers.RedRavenGames],
			bgg: 'https://boardgamegeek.com/boardgame/195421/near-and-far'
		},
		X51stState: {
			name: 'X51stState',
			titles: { default: '51st State: Master Set', Polski: '51. Stan' },
			image: 'https://cf.geekdo-images.com/thumb/img/lkHbwjQfKhiqWaeQRoK2X9MEphc=/fit-in/200x150/pic2961948.jpg',
			designers: [Data.designers.IgnacyTrzewiczek],
			publishers: [Data.publishers.PortalGames],
			bgg: 'https://boardgamegeek.com/boardgame/192458/51st-state-master-set'
		},
		SushiGoParty: {
			name: 'SushiGoParty',
			titles: { default: 'Sushi Go! Party' },
			image: 'https://cf.geekdo-images.com/thumb/img/A8D6DQy46g02YlMicTyhlJza1jQ=/fit-in/200x150/pic3031286.jpg',
			designers: [Data.designers.PhilWalkerHarding],
			publishers: [Data.publishers.Gamewright],
			bgg: 'https://boardgamegeek.com/boardgame/192291/sushi-go-party'
		},
		Sagrada: {
			name: 'Sagrada',
			titles: { default: 'Sagrada' },
			image: 'https://cf.geekdo-images.com/thumb/img/Efxb5We3kIolBOHjvnOffct-w0c=/fit-in/200x150/pic3525224.jpg',
			designers: [Data.designers.AdrianAdamescu, Data.designers.DarylAndrews],
			publishers: [Data.publishers.FloodgateGames],
			bgg: 'https://boardgamegeek.com/boardgame/199561/sagrada'
		},
		Fresco: {
			name: 'Fresco',
			titles: { default: 'Fresco' },
			image: 'https://cf.geekdo-images.com/thumb/img/kNVrOTCmpam2YmygS2y3KIovRYs=/fit-in/200x150/pic2592064.jpg',
			designers: [Data.designers.WolfgangPanning, Data.designers.MarcelSuesselbeck, Data.designers.MarcoRuskowski],
			publishers: [Data.publishers.QueenGames],
			bgg: 'https://boardgamegeek.com/boardgame/66188/fresco'
		},
		KingdomBuilder: {
			name: 'KingdomBuilder',
			titles: { default: 'Kingdom Builder', Polski: 'Królestwo w budowie' },
			image: 'https://cf.geekdo-images.com/thumb/img/-QYpVIA0Wa6IO9iwwhsHulOKaCQ=/fit-in/200x150/pic3387491.jpg',
			designers: [Data.designers.DonaldXVaccarino],
			publishers: [Data.publishers.QueenGames],
			bgg: 'https://boardgamegeek.com/boardgame/107529/kingdom-builder'
		},
		Ethnos: {
			name: 'Ethnos',
			titles: {default:'Ethnos'},
			image: 'https://cf.geekdo-images.com/itemrep/img/NB3omzbpZyZ6DqA2RUvow_LAdbo=/fit-in/246x300/pic3304124.png',
			designers: [Data.designers.PaoloMori],
			publishers: [Data.publishers.CMON],
			bgg: 'https://boardgamegeek.com/boardgame/206718/ethnos'
		},
		Cartographers: {
			name: 'Cartographers',
			titles: {default:'Cartographers', Polski: 'Kartografowie'},
			image: 'https://cf.geekdo-images.com/imagepage/img/p2QZryZ6cWxuasFSDEUbaID-Kow=/fit-in/900x600/filters:no_upscale()/pic4397932.png',
			designers: [Data.designers.JordyAdan],
			publishers: [Data.publishers.ThunderworksGames],
			bgg: 'https://boardgamegeek.com/boardgame/263918/cartographers-roll-player-tale'
		},
		Generator: {
			name: 'Generator',
			titles: { default: 'Generator alpha' },
			image: logo,
			designers: [],
			publishers: [],
			bgg: ''
		},
	};
}