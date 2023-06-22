import { gql } from '@apollo/client'

export const GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA = gql`
  query GetMyTotalCarbonPerActivityType {
    getMyTotalCarbonPerActivityType {
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
