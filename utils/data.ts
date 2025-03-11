export const books = [
	{
		title: "The Art of Programming",
		specification: {
			author: ["Shapale"],
			description: "A comprehensive guide to master programming",
			genre: ["Programming", "Education"],
		},
		creatorProfile: "678e0e14abb0db93f3706e18",
		coverImage: {
			url: "https://images.unsplash.com/photo-1517842645767-c639042777db",
			public_id: "book-cover-1738324880584",
		},
		file: {
			url: "https://res.cloudinary.com/dy3bwvkeb/raw/upload/v1741618483/book-file-1741618483043",
			public_id: "book-file-1741618483043"
		},
		likes: 0,
		_id: "679cbb966ed9204a2696f5e9",
	},
	{
		id: "1",
		title: "Clean Code",
		specification: {
			author: ["Robert C. Martin", "Idowu Olatunji"],
			description: "A handbook of agile software craftsmanship from a master programmer.",
			genre: ["Programming"],
		},
		coverImage: {
			url: "https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg",
			public_id: "book-cover-1738324880584",
		},
		file: {
			url: "https://res.cloudinary.com/dy3bwvkeb/raw/upload/v1738324886/ebook-file-1738324885021",
			fileType: "pdf",
		},
	},
	// {
	// 	id: "2",
	// 	title: "Design Patterns",
	// 	author: "Erich Gamma",
	// 	coverImage: "https://images.unsplash.com/photo-1517842645767-c639042777db",
	// 	price: 49.99,
	// 	isFree: false,
	// 	description: "Capturing software design expertise in a comprehensive, reusable format.",
	// 	pages: 395,
	// 	rating: 4.8,
	// 	genre: "Software Engineering",
	// },
	// {
	// 	id: "3",
	// 	title: "The Pragmatic Programmer",
	// 	author: "Andrew Hunt",
	// 	coverImage: "https://m.media-amazon.com/images/I/41as+WaXJBL._SY445_SX342_.jpg",
	// 	price: 0,
	// 	isFree: true,
	// 	description: "Your journey to mastery in a practical, engaging guide.",
	// 	pages: 321,
	// 	rating: 4.6,
	// 	genre: "Professional Development",
	// },
];

export const picsImage = [
	{
		id: 1,
		title: "Digital Dreams",
		creatorProfile: { _id: "678e0e14abb0db93f3706e18", profileName: "Idexx01" },
		preview: {
			url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
			public_url: ""
		},
		likes: 2453,
		width: 1000,
		height: 1414,
		size: "546.65 KB",
		downloads: 4,
		views: 10
	},
	{
		id: 2,
		title: "Abstract Flow",
		creatorProfile: { _id: "678e0e14abb0db93f3706e18", profileName: "Idexx01" },
		preview: {
			url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968",
			public_url: ""
		},
		likes: 2453,
		width: 1300,
		height: 1014,
		size: "946.65 KB",
		downloads: 0,
		views: 1,
	},
	{
		id: 200,
		title: "The Art of Programming",
		creatorProfile: { _id: "678e0e14abb0db93f3706e18", profileName: "Idexx101" },
		preview: {
			url: "https://res.cloudinary.com/dy3bwvkeb/image/upload/c_fill,g_auto,q_70/pics-1741620255757?_a=BAMCkGOY0",
			public_url: "pics-1741620255757"
		},
		width: 2000,
		height: 1414,
		size: "546.65 KB",
		downloads: 2,
		views: 4
	},
	{
		id: 4,
		title: "Urban Perspective",
		creatorProfile: { _id: "678e0e14abb0db93f3706e18", profileName: "Idexx101" },
		preview: {
			url: "https://images.unsplash.com/photo-1561214115-f2f134cc4912",
			public_url: ""
		},
		width: 2000,
		height: 1414,
		size: "1.65 MB",
		downloads: 2,
		views: 0
	},
];

export const musics = [
	{
		creator: {
			_id: "67672cfe46cebe48315a9104",
			profileName: "Remmy boi",
		},
		title: "Calm down",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		streams: 0,
		likes: 0,
		audio: {
			url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1737406836/audio-file-1737406823760.mp3",
			public_id: "audio-84543873232",
			duration_in_sec: 102.23,
		},
		coverImage: {
			url: "https://res.cloudinary.com/dy3bwvkeb/image/upload/c_fill,g_auto,h_500,q_70,w_500/audio-coverimage-1737406820552?_a=BAMCkGOY0",
			public_id: "coverimage-84543873232",
		},
		_id: "6777d0fa362b946f247b3e2d",
	},
	{
		_id: "r4",
		creator: {
			_id: "67672cfe46cebe48315a9114",
			profileName: "TrackTribe",
		},
		title: "Guess I'll Never Know",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		streams: 0,
		likes: 0,
		audio: {
			url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1737406836/audio-file-1737406823760.mp3",
			public_id: "audio-84543873232",
			duration_in_sec: 102.23,
		},
		coverImage: {
			url: "https://f4.bcbits.com/img/a3736661212_65",
			public_id: "coverimage-84543873232",
		},
	},
	{
		_id: "e3",
		url: "",
		title: "Memories",
		creator: {
			_id: "67672cfe46cebe48315a9134",
			profileName: "",
		},
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		streams: 0,
		likes: 0,
		audio: {
			url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1737406836/audio-file-1737406823760.mp3",
			public_id: "audio-84543873232",
			duration_in_sec: 102.23,
		},
		coverImage: {},
	},
	{
		_id: "55",
		creator: {
			_id: "67672cfe46cebe48315a9103",
			profileName: "NEFFEX",
		},
		title: "Anxiety",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		streams: 0,
		likes: 0,
		audio: {
			url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1737406836/audio-file-1737406823760.mp3",
		},
		coverImage: {
			url: "https://i1.sndcdn.com/artworks-iCqupgQNLXSjKspS-0CGreg-t500x500.jpg",
		},
	},
	{
		_id: "22",
		creator: {
			_id: "67672cfe46cebe48315a9103",
			profileName: "NEFFEX",
		},
		title: "As You Fade Away",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		streams: 0,
		likes: 0,
		audio: {
			url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1737406836/audio-file-1737406823760.mp3",
		},
		coverImage: {
			url: "https://i.ytimg.com/vi/JhUFfaArYk8/maxresdefault.jpg",
		},
	},
];

export const podcasts = [
	{
		creatorProfile: { _id: "678e0e14abb0db93f3706e18", profileName: "Idexx01" },
		name: "Menism - Podcast for men",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		coverImage: {
			url: "https://res.cloudinary.com/dy3bwvkeb/image/upload/c_fill,g_auto,h_500,q_70,w_500/podcast-coverimage-1737405724832?_a=BAMCkGOY0",
			public_id: "podcast-coverimage-1737405724832",
		},
		episodes: [
			{
				_id: "678e0e14abb0db93f3706ess2",
				audio: {
					url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1737406051/podcast-episode-1737406035598.mp3",
					public_id: "podcast-episode-1737406035598",
					duration_in_sec: 219.846531,
				},
				title: "Episode 1",
				description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
			{
				_id: "678e0e14abb0db93f3706ess3",
				audio: {
					url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1738254035/podcast-episode-1738254033665.mp3",
					public_id: "podcast-episode-1737406035598",
					duration_in_sec: 219.846531,
				},
				title: "Episode 2",
				description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			},
		],
		_id: "678eb5221487e0be6ee41b3e",
	},
	{
		creatorProfile: {_id: "678e0e14abb0db93f3706e18", profileName: "idexx123" },
		name: "Menism - Podcast for men",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		coverImage: {
			url: "https://res.cloudinary.com/dy3bwvkeb/image/upload/c_fill,g_auto,h_500,q_70,w_500/podcast-coverimage-1737405724832?_a=BAMCkGOY0",
			public_id: "podcast-coverimage-1737405724832",
		},
		episodes: [],
		_id: "678eb5221487e0bes6ee41b3e",
		__v: 0,
		createdAt: "2024-12-21T22:19:17.436Z",
	},
	{
		creatorProfile: {_id: "678e0e14abb0db93f3706e18", profileName: "idexx33" },
		name: "Menism - Podcast for men",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		coverImage: {
			url: "https://res.cloudinary.com/dy3bwvkeb/image/upload/c_fill,g_auto,h_500,q_70,w_500/podcast-coverimage-1737405724832?_a=BAMCkGOY0",
			public_id: "podcast-coverimage-1737405724832",
		},
		episodes: [],
		_id: "678eb5221487e0b3e6ee41b3e",
		__v: 0,
		createdAt: "2024-12-21T22:19:17.436Z",
	},
];

export const tubeShorts = [];

export const tubeMax = [
	{
		creatorProfile: {
			_id: "67672cfe46cebe48315a9104",
			profileName: "texty",
			username: "texty111",
			profileImage: {
				url: "",
				public_id: "",
			},
		},
		title: "A good way to make money",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		video: {
			url: "https://res.cloudinary.com/dy3bwvkeb/video/upload/c_fill,h_720,q_80,w_1280/v1737546087/tube-video-1737546080937?_a=BAMCkGOY0",
			public_id: "tube-327312812910",
			duration_in_sec: 102.23,
		},
		thumbnail: {
			url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/thumbnails/thumbnail3.jpeg",
			public_id: "thumbnail-327312812910",
		},
		views: 0,
		likes: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "67673ee56260c6a83b4f5c03",
		createdAt: "2024-12-21T22:19:17.436Z",
	},
	{
		creatorProfile: {
			_id: "67672cfe46cebe48315a9104",
			profileName: "texty",
			username: "texty111",
			profileImage: {
				url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
				public_id: "",
			},
		},
		title: "Build a Realtime Chat App in React Native (tutorial for beginners) 🔴 ",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		video: {
			url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
			public_id: "tube-327312812910",
			duration_in_sec: 102.23,
		},
		thumbnail: {
			url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/thumbnails/thumbnail1.jpeg",
			public_id: "thumbnail-327312812910",
		},
		views: 0,
		likes: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "67673ee56260c6a83b4f5c03",
		createdAt: "2024-01-21T22:19:17.436Z",
	},
];

export const comments = [
	{
		id: "1",
		createdAt: "5 months ago",
		comment: "Cool video!",
		user: {
			name: "Graham Stephan",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/graham.jpg",
		},
		likes: 123,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "2",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "3",
		createdAt: "5 months ago",
		comment: "Lorem Ipsum",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "4",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
	{
		id: "5",
		createdAt: "5 months ago",
		comment: "Thanks )",
		user: {
			name: "Vadim Savin",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
		},
		likes: 113,
		dislikes: 2,
		replies: 6,
	},
];