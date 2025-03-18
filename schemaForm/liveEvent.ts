export interface LiveEvent {
  id: string;
  title: string;
  imageUrl: string;
  organizer: string;
  viewCount: number;
}

export interface UpcomingEvents {
  id: string;
  title: string;
  date: string;
  time: string;
  organizer: string;
  location: string;
  participants: number;
}
export interface FeaturedVideos {
  id: string;
  title: string;
  thumbnailUrl: string;
  profileImageUrl: string;
  channelName: string;
  viewCount: number;
  timeAgo: string;
  durationSeconds: number; 
}
export interface communityPosts {
  id: string;
  authorName: string;
  authorImageUrl: string;
  content: string;
  imageUrl: string;
  timeAgo: string;
  likes: number;
  comments: number;
}
