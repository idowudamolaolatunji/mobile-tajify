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

export type CreatorProfileType = {
	_id: string;
	user?: string;
	profileName: string;
	profileImage?: CoverImageType;
	coverPhoto?: CoverImageType;
	username?: string;
	isCreator?: boolean;
	followers?: string[];
	following?: string[]
	postCount?: Number;
	interests?: string[];
	createdAt?: string;
	updatedAt?: string;
	isFollowingCreator?: boolean;
	isFollowedByCreator?: boolean;
}

export type TubeType = {
	_id: string;
	creatorProfile?: CreatorProfileType | any;
	title: string;
	description?: string;
	type: string;
	views?: number;
	likes?: number;
	comments?: number;
	hashTags: string[];
	slug?: string;
	thumbnail?: CoverImageType;
	video: VideoFileType;
	createdAt: string;
	updatedAt: string;
	lastModified?: string;
	isFollowingCreator: boolean;
};


export type MusicType = {
	_id: string;
	creator?: CreatorProfileType;
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
	creatorProfile: CreatorProfileType;
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
	creatorProfile: CreatorProfileType;
	title: string;
	specification: SpecificationType;
	coverImage: CoverImageType;
	file: FileType;
	createdAt?: string;
	updatedAt?: string;
};


export type BlogType = {
	_id: string;
	creatorProfile: CreatorProfileType;
	title: string;
	content: string;
	slug: string;
	blogUrl: string;
	previewImg: CoverImageType;
	views: string;
	likes: string;
	createdAt?: string;
	updatedAt?: string;
}


export type PicsImageType = {
	_id: string;
	creatorProfile: CreatorProfileType;
	title: string;
	preview: CoverImageType;
	likes: number;
	downloads: number;
	views: number;
	width: number;
	height: number;
	size: number;
	createdAt?: string;
	updatedAt?: string;
};