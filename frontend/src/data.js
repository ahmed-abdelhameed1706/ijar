const navData = [
	{ name: "Home", href: "/", current: true },
	{ name: "Cars", href: "/cars", current: false },
	{ name: "About", href: "/about", current: false },
	{ name: "Calendar", href: "/calendar", current: false },
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

export { navData, people, slideImages, products };
