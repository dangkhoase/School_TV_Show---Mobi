export interface Combined {
    $id: string
    newsID: number
    schoolChannelID: number
    categoryNewsID: number
    title: string
    content: string
    createdAt: string
    updatedAt: string
    status: boolean
    followerMode: boolean
    schoolChannel: SchoolChannel
    categoryNews: any
    newsPictures: NewsPictures2
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
    $values: Value[]
  }
  
  export interface Value {
    $ref?: string
    $id?: string
    newsID?: number
    schoolChannelID?: number
    categoryNewsID?: number
    title?: string
    content?: string
    createdAt?: string
    updatedAt?: string
    status?: boolean
    followerMode?: boolean
    schoolChannel?: SchoolChannel2
    categoryNews: any
    newsPictures?: NewsPictures
  }
  
  export interface SchoolChannel2 {
    $ref: string
  }
  
  export interface NewsPictures {
    $id: string
    $values: Value2[]
  }
  
  export interface Value2 {
    $id: string
    pictureID: number
    newsID: number
    fileName: string
    contentType: string
    fileData: string
    news: News2
  }
  
  export interface News2 {
    $ref: string
  }
  
  export interface NewsPictures2 {
    $id: string
    $values: Value3[]
  }
  
  export interface Value3 {
    $id: string
    pictureID: number
    newsID: number
    fileName: string
    contentType: string
    fileData: string
    news: News3
  }
  
  export interface News3 {
    $ref: string
  }
  