export interface VideoHistory {
  $id: string
  videoHistoryID: number
  programID: number
  url: string
  mP4Url: string
  type: string
  description: string
  status: boolean
  createdAt: string
  updatedAt: string
  streamAt: string
  duration: number
  program: Program
  videoLikes: any
  videoViews: any
  shares: any
  comments: any
  cloudflareStreamId: string
  playbackUrl: string
  schedules: any
}

export interface Program {
  $id: string
  programID: number
  schoolChannelID: number
  cloudflareStreamId: string
  programName: string
  title: string
  status: string
  schoolChannel: SchoolChannel
  createdAt: string
  updatedAt: string
  schedules: Schedules
  videoHistories: VideoHistories
  programFollows: any
}

export interface SchoolChannel {
  $id: string
  schoolChannelID: number
  name: string
  description: string
  accountID: number
  status: boolean
  website: string
  email: string
  address: string
  createdAt: string
  updatedAt: string
  totalDuration: any
  account: any
  news: News
  followers: any
  logoUrl: string
}

export interface News {
  $id: string
  $values: any[]
}

export interface Schedules {
  $id: string
  $values: any[]
}

export interface VideoHistories {
  $id: string
  $values: Value[]
}

export interface Value {
  $ref: string
}
