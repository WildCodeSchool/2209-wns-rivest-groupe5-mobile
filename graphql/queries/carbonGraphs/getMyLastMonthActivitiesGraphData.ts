import { gql } from '@apollo/client'

export const GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA = gql`
  query GetMyLastMonthActivities {
    getMyLastMonthActivities {
      datasets {
        backgroundColor
        data
        emoji
        id
        label
        name
      }
      labels
    }
  }
`
