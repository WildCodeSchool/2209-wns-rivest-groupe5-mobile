import { gql } from "@apollo/client";

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($data: CreateActivityInput!) {
    createActivity(data: $data) {
      activityDate
      title
      description
      createdAt
      carbonQuantity
      activityType {
        name
      }
      activityId
    }
  }
`;
