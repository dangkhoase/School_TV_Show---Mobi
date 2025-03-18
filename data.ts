 
// Mock data for live events
export const liveEvents = [
  {
    id: '1',
    title: 'Hội Thảo Công Nghệ AI 2023',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    organizer: 'ĐH Bách Khoa',
    viewCount: 1236,
  },
  {
    id: '2',
    title: 'Talkshow: Khởi Nghiệp Sinh Viên',
    imageUrl:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop',
    organizer: 'ĐH Kinh Tế',
    viewCount: 855,
  },
];

// Mock data for upcoming events
export const upcomingEvents= [
  {
    id: '1',
    title: 'Lễ Trao Bằng Tốt Nghiệp',
    date: '25/12/2023',
    time: '14:00',
    organizer: 'ĐH Quốc Gia Hà Nội',
    location: 'Hội trường A1',
    participants: 2000,
  },
  {
    id: '2',
    title: 'Hội Thảo: Trí Tuệ Nhân Tạo',
    date: '27/12/2023',
    time: '09:00',
    organizer: 'ĐH Bách Khoa Hà Nội',
    location: 'Phòng Hội Thảo C5',
    participants: 500,
  },
];

// Mock data for featured videos
export const featuredVideos = [
  {
    id: '1',
    title: 'Top 10 Lý Do Chọn ĐH Bách Khoa',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop',
    profileImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    channelName: 'ĐH Bách Khoa Hà Nội',
    viewCount: 125,
    timeAgo: '2 ngày',
    durationSeconds: 924, // 15:24
  },
  {
    id: '2',
    title: 'Hướng Dẫn Đăng Ký Học Phần',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
    profileImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    channelName: 'ĐH Kinh Tế Quốc Dân',
    viewCount: 154,
    timeAgo: '1 tuần',
    durationSeconds: 1110, // 18:30
  },
];

// Mock data for community posts
export const communityPosts= [
  {
    id: '1',
    authorName: 'ĐH Ngoại Thương',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    content:
      'Chúc mừng đội tuyển sinh viên FTU đã đạt giải Nhất cuộc thi "Marketing Challenge 2023" ! Tự hào về các bạn 🎉',
    imageUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
    timeAgo: '2 giờ',
    likes: 126,
    comments: 35,
  },
];

export const TOP_PLACES = [
  {
    id: 1,
    image: require('./assets/images/anh1.jpg'),
    title: 'Môi trường sinh hoạt lành mạnh',
    location: 'Xem chi tiết',
    description:
      'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
    rating: 9.4,
    gallery: [require('./assets/images/anh1.jpg'), require('./assets/images/anh1.jpg')],
    type: 'PLACE',
  },
  {
    id: 4,
    image: require('./assets/images/anh3.jpg'),
    title: 'Đa dạng dịch vụ chăm sóc',
    location: 'Xem chi tiết',
    description:
      'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
    rating: 8.9,
    gallery: [],
    type: 'PLACE',
  },
  {
    id: 6,
    image: require('./assets/images/anh2.jpg'),
    title: 'Nhiều hoạt động ý nghĩa',
    location: 'Xem chi tiết',
    description:
      "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    rating: 7.4,
    gallery: [],
    type: 'PLACE',
  },
];
