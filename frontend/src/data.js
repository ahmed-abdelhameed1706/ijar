const navData = [
	{ name: "Home", href: "/", current: true },
	{ name: "Cars", href: "/cars", current: false },
	{ name: "Dashboard", href: "/dashboard", current: false },
	{ name: "About", href: "/about", current: false },
];

const slideImages = [
	// "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/car-right.png",
	"https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2020/03/car-01.jpg",
	"https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/car-09.jpg",
	"https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/car-04.jpg",
	"https://th.bing.com/th/id/R.9da1a043a0aaf7e3c33b94ebd04d451c?rik=jLbFzjp5PfDjYw&riu=http%3a%2f%2f4.bp.blogspot.com%2f-AwIUu9q1ddo%2fTuulhP1vIeI%2fAAAAAAAAqWA%2fYJTnf4Ef0Ec%2fs1600%2fSperanza-A516_LS_2011_650x300_wallpaper_01.jpg&ehk=rBOwXI8zPUpohrc5DIYfNDuXVbUHvA6g20Le16XZI5Y%3d&risl=&pid=ImgRaw&r=0",
	"https://www.cars-directory.net/pics/chery/chery/2007/chery_chery_a1212780020b1795143_orig.jpg",
];

const people = [
	{
		name: "Mahmoud Easa",
		role: "Full Stack Software Engineer",
		imageUrl:
			"https://firebasestorage.googleapis.com/v0/b/portfolioecommerce-f1ee6.appspot.com/o/images%2Fa07fb189-7493-424d-b073-8216b4e293dd?alt=media&token=8f057f1b-c8a6-440d-ad22-3f3fc2e3b416",
	},
	{
		name: "Mahmoud Easa1",
		role: "Full Stack Software Engineer",
		imageUrl:
			"https://firebasestorage.googleapis.com/v0/b/portfolioecommerce-f1ee6.appspot.com/o/images%2Fa07fb189-7493-424d-b073-8216b4e293dd?alt=media&token=8f057f1b-c8a6-440d-ad22-3f3fc2e3b416",
	},
	{
		name: "Mahmoud Easa2",
		role: "Full Stack Software Engineer",
		imageUrl:
			"https://firebasestorage.googleapis.com/v0/b/portfolioecommerce-f1ee6.appspot.com/o/images%2Fa07fb189-7493-424d-b073-8216b4e293dd?alt=media&token=8f057f1b-c8a6-440d-ad22-3f3fc2e3b416",
	},
	{
		name: "Mahmoud Easa3",
		role: "Full Stack Software Engineer",
		imageUrl:
			"https://firebasestorage.googleapis.com/v0/b/portfolioecommerce-f1ee6.appspot.com/o/images%2Fa07fb189-7493-424d-b073-8216b4e293dd?alt=media&token=8f057f1b-c8a6-440d-ad22-3f3fc2e3b416",
	},
];

const products = [
	{
		title: "Moonbeam",
		link: "https://gomoonbeam.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
	},
	{
		title: "Cursor",
		link: "https://cursor.so",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/cursor.png",
	},
	{
		title: "Rogue",
		link: "https://userogue.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/rogue.png",
	},

	{
		title: "Editorially",
		link: "https://editorially.org",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/editorially.png",
	},
	{
		title: "Editrix AI",
		link: "https://editrix.ai",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/editrix.png",
	},
	{
		title: "Pixel Perfect",
		link: "https://app.pixelperfect.quest",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
	},

	{
		title: "Algochurn",
		link: "https://algochurn.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/algochurn.png",
	},
	{
		title: "Aceternity UI",
		link: "https://ui.aceternity.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
	},
	{
		title: "Tailwind Master Kit",
		link: "https://tailwindmasterkit.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
	},
	{
		title: "SmartBridge",
		link: "https://smartbridgetech.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
	},
	{
		title: "Renderwork Studio",
		link: "https://renderwork.studio",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/renderwork.png",
	},

	{
		title: "Creme Digital",
		link: "https://cremedigital.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
	},
	{
		title: "Golden Bells Academy",
		link: "https://goldenbellsacademy.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
	},
	{
		title: "Invoker Labs",
		link: "https://invoker.lol",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/invoker.png",
	},
	{
		title: "E Free Invoice",
		link: "https://efreeinvoice.com",
		thumbnail:
			"https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
	},
];

const users = [
	{
		name: "Manu Arora",
		designation: "Founder, Algochurn",
		image: "https://picsum.photos/id/10/300/300",
		badge: "Mentor",
	},
	{
		name: "Sarah Singh",
		designation: "Founder, Sarah's Kitchen",
		image: "https://picsum.photos/id/11/300/300",
		badge: "Mentor",
	},
	{
		name: "John Doe",
		designation: "Software Engineer, Tech Corp",
		image: "https://picsum.photos/id/12/300/300",
		badge: "Mentor",
	},
	{
		name: "Jane Smith",
		designation: "Product Manager, Innovate Inc",
		image: "https://picsum.photos/id/13/300/300",
		badge: "Mentor",
	},
	{
		name: "Robert Johnson",
		designation: "Data Scientist, DataWorks",
		image: "https://picsum.photos/id/14/300/300",
		badge: "Mentor",
	},
	{
		name: "Emily Davis",
		designation: "UX Designer, DesignHub",
		image: "https://picsum.photos/id/15/300/300",
		badge: "Mentor",
	},
	{
		name: "Michael Miller",
		designation: "CTO, FutureTech",
		image: "https://picsum.photos/id/16/300/300",
		badge: "Mentor",
	},
	{
		name: "Sarah Brown",
		designation: "CEO, StartUp",
		image: "https://picsum.photos/id/17/300/300",
	},
	{
		name: "James Wilson",
		designation: "DevOps Engineer, CloudNet",
		image: "https://picsum.photos/id/18/300/300",
		badge: "Something",
	},
	{
		name: "Patricia Moore",
		designation: "Marketing Manager, MarketGrowth",
		image: "https://picsum.photos/id/19/300/300",
		badge: "Mentor",
	},
	{
		name: "Richard Taylor",
		designation: "Frontend Developer, WebSolutions",
		image: "https://picsum.photos/id/20/300/300",
	},
	{
		name: "Linda Anderson",
		designation: "Backend Developer, ServerSecure",
		image: "https://picsum.photos/id/21/300/300",
	},
	{
		name: "William Thomas",
		designation: "Full Stack Developer, FullStack",
		image: "https://picsum.photos/id/22/300/300",
		badge: "Badger",
	},
	{
		name: "Elizabeth Jackson",
		designation: "Project Manager, ProManage",
		image: "https://picsum.photos/id/23/300/300",
		badge: "Mentor",
	},
	{
		name: "David White",
		designation: "Database Administrator, DataSafe",
		image: "https://picsum.photos/id/24/300/300",
		badge: "Advocate",
	},
	{
		name: "Jennifer Harris",
		designation: "Network Engineer, NetConnect",
		image: "https://picsum.photos/id/25/300/300",
	},
	{
		name: "Charles Clark",
		designation: "Security Analyst, SecureIT",
		image: "https://picsum.photos/id/26/300/300",
	},
	{
		name: "Susan Lewis",
		designation: "Systems Analyst, SysAnalyse",
		image: "https://picsum.photos/id/27/300/300",
	},
	{
		name: "Joseph Young",
		designation: "Mobile Developer, AppDev",
		image: "https://picsum.photos/id/28/300/300",
		badge: "Mentor",
	},
	{
		name: "Margaret Hall",
		designation: "Quality Assurance, BugFree",
		image: "https://picsum.photos/id/29/300/300",
		badge: "Developer",
	},
];

const cars = [
	{
		id: 1,
		src: "https://th.bing.com/th/id/R.9da1a043a0aaf7e3c33b94ebd04d451c?rik=jLbFzjp5PfDjYw&riu=http%3a%2f%2f4.bp.blogspot.com%2f-AwIUu9q1ddo%2fTuulhP1vIeI%2fAAAAAAAAqWA%2fYJTnf4Ef0Ec%2fs1600%2fSperanza-A516_LS_2011_650x300_wallpaper_01.jpg&ehk=rBOwXI8zPUpohrc5DIYfNDuXVbUHvA6g20Le16XZI5Y%3d&risl=&pid=ImgRaw&r=0",
		price: 2000,
		brandName: "Speranze",
		type: "Speranze",
		model: "A516",
		year: "2019",
		color: "Black",
		averageRate: 5,
		images: [],
	},
	{
		id: 2,
		src: "https://www.cars-directory.net/pics/chery/chery/2007/chery_chery_a1212780020b1795143_orig.jpg",
		price: 2000,
		brandName: "Speranze",
		type: "Speranze",
		model: "A516",
		year: "2019",
		color: "White",
		averageRate: 4.5,
		images: [],
	},
	{
		id: 3,
		src: "https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/car-right.png",
		price: 3000,
		brandName: "PMW",
		type: "PMW",
		model: "2024",
		year: "2024",
		color: "Black",
		averageRate: 4,
		images: [],
	},
	{
		id: 4,
		src: "https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2020/03/car-01.jpg",
		price: 4000,
		brandName: "PMW",
		type: "PMW",
		model: "2024",
		year: "2024",
		color: "White",
		averageRate: 3,
		images: [],
	},
	{
		id: 5,
		src: "https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/car-09.jpg",
		price: 4000,
		brandName: "OUDI",
		type: "Oudi",
		model: "2024",
		year: "2024",
		color: "Blue",
		averageRate: 2,
		images: [],
	},
	{
		id: 6,
		src: "https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/car-04.jpg",
		price: 4000,
		brandName: "PMW",
		type: "PMW",
		model: "2024",
		year: "2024",
		color: "Red",
		averageRate: 2,
		images: [],
	},
];

export { navData, people, slideImages, products, users, cars };
