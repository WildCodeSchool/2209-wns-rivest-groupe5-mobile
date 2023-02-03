import { gql } from "@apollo/client";

export const GET_ACTIVITY_TYPES = gql`
  query Query {
    getAllActivityTypes {
      activityTypeId
      name
    }
  }
`;
