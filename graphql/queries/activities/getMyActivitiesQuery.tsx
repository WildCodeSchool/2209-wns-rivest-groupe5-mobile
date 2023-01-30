import { gql } from "@apollo/client";

export const GET_MY_ACTIVITIES = gql`
  query GetAllMyActivities {
    getAllMyActivities {
      activityId
      title
      activityDate
      description
      carbonQuantity
      activityType {
        name
        activityTypeId
      }
    }
  }
`;
