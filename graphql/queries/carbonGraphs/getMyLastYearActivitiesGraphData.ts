import { gql } from '@apollo/client'

export const GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA = gql`
  query GetMyLastYearActivities {
    getMyLastYearActivities {
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
