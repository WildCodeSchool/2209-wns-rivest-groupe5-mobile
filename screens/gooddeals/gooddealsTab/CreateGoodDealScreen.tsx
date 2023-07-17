import { gql, useMutation } from '@apollo/client'
import { Stack, TextInput, Button, Text } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import {
  SafeAreaView,
  StyleSheet,
  TextInput as TextInputFromRn,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { UploadPictureInput } from '../../../components/UploadPictureInput'

const CREATE_GOOD_DEAL = gql`
  mutation CreateGoodDeal($data: CreateGoodDealInput!) {
    createGoodDeal(data: $data) {
      goodDealTitle
      goodDealContent
      goodDealLink
      image
    }
  }
`

export const CreateGoodDealScreen = ({ navigation }) => {
  const [createGoodDeal, { loading }] = useMutation(CREATE_GOOD_DEAL)
  const [isLoadingPicture, setIsLoadingPicture] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  function handleSubmit(
    title: string,
    description: string,
    link: string,
    imageUrl: string
  ) {
    if (title.trim() === '') {
      return alert('Renseigner un titre')
    }
    if (description.trim() === '') {
      return alert('Renseigner une description')
    }
    createGoodDeal({
      variables: {
        data: {
          goodDealTitle: title,
          goodDealContent: description,
          goodDealLink: link,
          image: imageUrl,
        },
      },
      onCompleted(data) {
        alert('Astuce publiée avec succès !')
        setTitle('')
        setDescription('')
        setLink('')
        setPictureUrl('')
        //pass the new good deal id to the below navigate()
        navigation.navigate('Mes Astuces')
      },
      onError(error) {
        // console.log('>>>>ERROR GOOD DEAL CREATION FAILED >>>>', error.message)
        alert("Erreur lors de la création d'une astuce")
      },
    })
  }
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingTop: 60 }}>
        <Stack spacing={10} style={{ marginLeft: 25, marginRight: 25 }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginBottom: 10,
            }}
          >
            Partages tes Astuces!
          </Text>
          <TextInput
            label="Titre"
            autoCapitalize={'none'}
            variant="outlined"
            color="grey"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInputFromRn
            style={styles.input}
            placeholder="Description"
            multiline={true}
            maxLength={100}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <TextInput
            label="Lien"
            autoCapitalize={'none'}
            variant="outlined"
            color="grey"
            value={link}
            onChangeText={(text) => setLink(text)}
          />

          <UploadPictureInput
            setPictureUrl={setPictureUrl}
            pictureUrl={pictureUrl}
            setIsLoadingPicture={setIsLoadingPicture}
            isLoadingPicture={isLoadingPicture}
          />
          <Button
            title="Publier"
            trailing={(props) => <Icon name="send" {...props} />}
            onPress={() => {
              handleSubmit(title, description, link, pictureUrl)
            }}
            loading={loading === true || isLoadingPicture === true}
            loadingIndicatorPosition="overlay"
            style={{
              backgroundColor: '#17b2aa',
              marginTop: 40,
              marginBottom: 100,
            }}
          />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 4,
  },
})
