type CoverImageType = {
	url?: string;
	public_id?: string;
};

type AudioFileType = {
	url: string;
	public_id?: string;
	duration_in_sec?: number | any;
};

type VideoFileType = {
	url: string;
	public_id?: string;
	duration_in_sec?: number | any;
};

type FileType = {
	url: string;
	public_id?: string;
};

export type MusicType = {
	_id: string;
	creator?: any;
	title: string;
	streams?: number;
	coverImage?: CoverImageType;
	audio: AudioFileType;
	createdAt?: string;
	updatedAt?: string;
};

export type EpisodeType = {
	_id: string;
	audio: AudioFileType;
	title: string;
	description?: string;
	addedDate?: string;
};

export type PodcastType = {
	creatorProfile: any;
	name: string;
	description: string;
	coverImage: CoverImageType;
	episodes: EpisodeType[];
	_id: string;
	createdAt?: string;
	updatedAt?: string;
};

type SpecificationType = {
	author: string[];
	description: string;
	publishedYear: number;
	genre: string[];
};

export type BookType = {
	_id: string;
	creatorProfile: any;
	title: string;
	specification: SpecificationType;
	coverImage: CoverImageType;
	file: FileType;
};

export type TubeMaxType = {
	creatorProfile: any;
	title: string;
	description: string;
	video: VideoFileType;
	thumbnail: CoverImageType;
	views: number;
	likes: number;
	shares: number;
	saves: number;
	comments: number;
	type: string;
	hashTags: string[];
	_id: string;
	createdAt?: string;
	updatedAt?: string;
};


export type BlogType = {}


export type PicsImageType = {
	_id: string;
	creatorProfile: any;
	title: string;
	preview: CoverImageType;
	likes: number;
	downloads: number;
	views: number;
	width: number;
	height: number;
	size: number;
};