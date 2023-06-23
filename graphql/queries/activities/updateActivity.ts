import { gql } from '@apollo/client'

const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity($activityId: Float!, $data: UpdateActivityInput!) {
    updateActivity(activityId: $activityId, data: $data) {
      activityId
    }
  }
`

export default UPDATE_ACTIVITY
