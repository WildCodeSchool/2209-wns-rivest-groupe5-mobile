export interface IGoodDeal {
  goodDealId: number
  goodDealTitle: string
  goodDealContent: string
  goodDealLink: string
  image: string
  createdAt: Date
  user: {
    userId: number
    email: string
    firstname: string
    lastname: string
    avatar: string
  }
}
