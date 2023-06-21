import { ApolloError } from '@apollo/client/errors'

export interface IChartDataState {
  data?: {
    datasets: {
      label: string
      data: number[]
      emoji: string
      backgroundColor: string
      id: number
      name: string
    }[]
  }
  loading: boolean
  error: ApolloError | undefined
}
