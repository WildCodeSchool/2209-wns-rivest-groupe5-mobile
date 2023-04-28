import { gql } from '@apollo/client'

export const GET_ALL_MY_GOOD_DEALS = gql`
  query getAllMyGoodDeals {
    getAllMyGoodDeals {
      goodDealId
      goodDealTitle
      goodDealLink
      goodDealContent
      image
      createdAt
      user {
        email
        firstname
        lastname
        avatar
        userId
      }
    }
  }
`
