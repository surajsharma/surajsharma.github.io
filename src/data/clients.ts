import able from "../assets/able.svg";
import apr from "../assets/autoproctor.svg";
import bsc from "../assets/bscr.svg";
import cyb from "../assets/cybrilla.svg";
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
		name: "Cybrilla",
		hq: "IN",
		img: {
			import: cyb,
			width: 2000,
			height: 1000,

		},
		url: "https://www.cybrilla.com/",
		agency: false,
		remote: true,
	},
	{
		name: "Holdex",
		hq: "HK",
		img: {
			import: holdexImg,
			width: 2000,
			height: 1000,
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
					width: 2000,
					height: 1000,
				},
				url: "https://clearpool.finance",
				agency: false,
				remote: true,
			},
		],
	},
	{
		name: "Starknet",
		hq: "IL",
		img: {
			import: sn,
			width: 2000,
			height: 1000,
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
			width: 2000,
			height: 1000,
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
					width: 2000,
					height: 1000,
				},
				url: "https://teamdriveaway.com/",
				agency: false,
				remote: true,
			},
		],
	},

	{
		name: "Tattle",
		hq: "IN",
		img: {
			import: tattle,
			width: 2000,
			height: 1000,
		},
		url: "https://tattle.co.in/",
		agency: false,
		remote: true,
	},
	{
		name: "NSE Cogencis",
		hq: "IN",
		img: {
			import: nc,
			width: 2000,
			height: 1000,
		},
		url: "https://www.cogencis.com",
		agency: false,
		remote: false,
	},
	{
		name: "SalesBeat",
		hq: "UK",
		img: {
			import: sb,
			width: 2000,
			height: 1000,
		},
		url: "https://www.crunchbase.com/organization/salesbeat-ltd",
		agency: false,
		remote: true,
	},
	{
		name: "Socratease Autoproctor Equip",
		hq: "IN",
		img: {
			import: apr,
			height: 1000,
			width:1000,
		},
		url: "https://www.autoproctor.co/",
		agency: false,
		remote: false,
	},
	{
		name: "Bombay Shirts Company",
		hq: "IN",
		img: {
			import: bsc,
			width: 2000,
			height: 1000,
		},
		url: "https://www.bombayshirts.com",
		agency: false,
		remote: false,
	},
	{
		name: "Employees' State Insurance Corporation",
		hq: "IN",
		img: {
			import: ESICBlack,
			height: 1000,
			width:1000,
		},
		url: "https://esic.gov.in/",
		agency: false,
		remote: false,
	},
	{
		name: "Demtech",
		hq: "IN",
		img: {
			import: bc,
			width: 2000,
			height: 1000,
		},
		url: "https://www.demtech.ai/",
		agency: false,
		remote: true,
	},

];
