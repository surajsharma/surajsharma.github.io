const yyyy: number = new Date().getFullYear();
// the page is served pre-rendered, forcing yearly rebuilds here

export const MENU_LINKS = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Projects",
		path: "/posts/projects",
	},
	{
		title: "Experiments",
		path: "/posts/experiments",
	},
	{
		title: "About",
		path: "/about/",
	},
];

export const FOOOTER_LINKS = [
	{
		title: "CV",
		path: `https://github.com/surajsharma/surajsharma/tree/main/CV_Suraj_${yyyy}/CV.pdf`,
	},
	{
		title: "Github",
		path: "https://github.com/inversepolarity",
	},
	{
		title: "inversepolarity",
		path: "https://ip.evenzero.in",
	},
	{
		title: "LinkedIn",
		path: "https://www.linkedin.com/company/35930433/",
	},
	{
		title: "YouTube",
		path: "https://www.youtube.com/@evenzero",
	},
];
