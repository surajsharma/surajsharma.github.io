import able from "../assets/able.svg";
import apr from "../assets/autoproctor.svg";
import bsc from "../assets/bscr.svg";
import cyb from "../assets/cybrilla.png";
import holdexImg from "../assets/holdex.svg";
import sb from "../assets/salesbeat.svg";
import sn from "../assets/sn.svg";
import tattle from "../assets/tattle.png";
import tda from "../assets/tda.png";
import cp from "../assets/clearpool.svg";
import ESICBlack from "../assets/ESICBlack.svg";
import nc from "../assets/nc.png";
import bc from "../assets/because.png";
import blank from "../assets/blank.svg";

type client = {
	name: string;
	hq: string;
	img: {
		import: ImageMetadata;
		width?: number;
		height?: number;
	};
	url: string;
	agency?: boolean;
	remote: boolean;
	clients?: client[];
};

export const clients: client[] = [
 {
		name: "Holdex",
		hq: "HK",
		img: {
			import: holdexImg,
			height: 32,
		},
		url: "https://holdex.io",
		agency: true,
		remote: true,
		clients: [
			{
				name: "Clearpool Finance",
				hq: "US",
				img: {
					import: cp,
					height: 32,
				},
				url: "https://clearpool.finance",
				agency: false,
				remote: true,
			},
		],
	},
	{
		name: "Cybrilla",
		hq: "IN",
		img: {
			import: cyb,
			width: 128,
		},
		url: "https://www.cybrilla.com/",
		agency: false,
		remote: true,
	},
	{
		name: "Starknet",
		hq: "IL",
		img: {
			import: sn,
			height: 32,
		},
		url: "https://www.starknet.io/en",
		agency: false,
		remote: true,
	},
	{
		name: "Able",
		hq: "IN",
		img: {
			import: able,
			height: 26,
		},
		url: "https://www.able.do",
		agency: true,
		remote: true,
		clients: [
			{
				name: "Team Drive Away",
				hq: "US",
				img: {
					import: tda,
					height: 64,
				},
				url: "https://teamdriveaway.com/",
				agency: false,
				remote: true,
			},
		],
	},
	{
		name: "NSE Cogencis",
		hq: "IN",
		img: {
			import: nc,
			height: 40,
		},
		url: "https://www.cogencis.com",
		agency: false,
		remote: false,
	},
	{
		name: "Tattle",
		hq: "IN",
		img: {
			import: tattle,
			height: 32,
		},
		url: "https://tattle.co.in/",
		agency: false,
		remote: true,
	},
	{
		name: "SalesBeat",
		hq: "UK",
		img: {
			import: sb,
			height: 48,
		},
		url: "https://www.crunchbase.com/organization/salesbeat-ltd",
		agency: false,
		remote: true,
	},
	{
		name: "Bombay Shirts Company",
		hq: "IN",
		img: {
			import: bsc,
			height: 36,
		},
		url: "https://www.bombayshirts.com",
		agency: false,
		remote: false,
	},

	{
		name: "Socratease Autoproctor Equip",
		hq: "IN",
		img: {
			import: apr,
			height: 40,
		},
		url: "https://www.autoproctor.co/",
		agency: false,
		remote: false,
	},
	{
		name: "Employees' State Insurance Corporation",
		hq: "IN",
		img: {
			import: ESICBlack,
			height: 42,
		},
		url: "https://esic.gov.in/",
		agency: false,
		remote: false,
	},
  {
    url:"0#",
		img: {
			import: blank,
			width: 1,
		},
	},
  {
		name: "Demtech",
		hq: "IN",
		img: {
			import: bc,
			width: 84,
		},
		url: "https://www.demtech.ai/",
		agency: false,
		remote: true,
	},

];
