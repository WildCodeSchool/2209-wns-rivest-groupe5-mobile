import { gql } from '@apollo/client'

export const GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA = gql`
  query Query {
    getMyLastWeekActivities {
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
