export interface IGoodDeal {
    userId : number
    goodDealId: number
    goodDealTitle: string
    goodDealContent: string
    goodDealLink: string
    image: string
    created_at: Date
    user: {
        email: string
        firstname: string
        lastname: string
        avatar: string
    }

}
