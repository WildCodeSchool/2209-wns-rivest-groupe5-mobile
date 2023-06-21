import { ActivityIndicator, View } from 'react-native'

const ScrollListBottomLoader = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) => {
  if (currentPage === totalPages) {
    return <View></View>
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  )
}

export default ScrollListBottomLoader
