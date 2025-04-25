// src/types/authTypes.ts

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  address: string;
  phoneNumber: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserProfile {
  $id: string
  accountID: number
  username: string
  email: string
  fullname: string
  address: string
  phoneNumber: string
}
export interface ScheduleTimeline {
  $id: string
  scheduleID: number
  programID: number
  startTime: string
  endTime: string
  status: string
  liveStreamStarted: boolean
  liveStreamEnded: boolean
  isReplay: boolean
  videoHistoryID: number
  program: Program
}

export interface Program {
  $id: string
  programID: number
  schoolChannelID: number
  cloudflareStreamId: string
  programName: string
  title: string
  status: string
  schoolChannel: any
  createdAt: string
  updatedAt: string
  schedules: Schedules
  videoHistories: any
  programFollows: any
}

export interface Schedules {
  $id: string
  $values: Value[]
}

export interface Value {
  $ref: string
}
