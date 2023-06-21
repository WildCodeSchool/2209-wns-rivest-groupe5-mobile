import { gql } from '@apollo/client'

export const GET_MY_ACTIVITIES = gql`
  query GetAllMyActivities($page: Float, $pageSize: Float) {
    getAllMyActivities(page: $page, pageSize: $pageSize) {
      currentPage
      pageSize
      total
      totalPages
      data {
        activityId
        title
        activityDate
        description
        carbonQuantity
        activityType {
          activityTypeId
          backgroundColor
          emoji
          label
          name
        }
      }
    }
  }
`
