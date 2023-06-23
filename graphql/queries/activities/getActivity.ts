import { gql } from '@apollo/client'

const GET_ACTIVITY = gql`
  query GetActivityById($activityId: Float!) {
    getActivityById(activityId: $activityId) {
      title
      user {
        firstname
        lastname
        email
        avatar
        userId
      }
      activityId
      activityDate
      activityType {
        name
        label
        emoji
        backgroundColor
        activityTypeId
      }
      description
      createdAt
      carbonQuantity
    }
  }
`

export default GET_ACTIVITY
