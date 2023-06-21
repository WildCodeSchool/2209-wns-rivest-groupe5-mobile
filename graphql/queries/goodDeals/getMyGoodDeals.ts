import { gql } from '@apollo/client'

export const GET_ALL_MY_GOOD_DEALS = gql`
  query GetAllMyGoodDeals($page: Float) {
    getAllMyGoodDeals(page: $page) {
      total
      totalPages
      pageSize
      currentPage
      data {
        createdAt
        goodDealDescription
        goodDealContent
        goodDealId
        goodDealLink
        goodDealTitle
        image
        user {
          firstname
          email
          avatar
          lastname
          userId
        }
      }
    }
  }
`
