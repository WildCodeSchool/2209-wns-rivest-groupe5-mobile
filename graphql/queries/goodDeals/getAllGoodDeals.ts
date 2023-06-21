import { gql } from '@apollo/client'

export const GET_ALL_GOOD_DEALS = gql`
  query GetAllGoodDeals($page: Float) {
    getAllGoodDeals(page: $page) {
      currentPage
      data {
        goodDealId
        goodDealTitle
        goodDealLink
        goodDealDescription
        goodDealContent
        image
        createdAt
        user {
          firstname
          lastname
          userId
          avatar
          email
        }
      }
      totalPages
      total
      pageSize
    }
  }
`
