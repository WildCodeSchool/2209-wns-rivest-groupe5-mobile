import { gql, useMutation } from '@apollo/client'
import { Stack, TextInput, Button, Text, Banner, Avatar } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import {
  SafeAreaView,
  StyleSheet,
  TextInput as TextInputFromRn,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { UploadPictureInput } from '../../../components/UploadPictureInput'
import { Feather } from '@expo/vector-icons';
const CREATE_GOOD_DEAL = gql`
  mutation CreateGoodDeal($data: CreateGoodDealInput!) {
    createGoodDeal(data: $data) {
      goodDealTitle
      goodDealDescription
      goodDealContent
      goodDealLink
      image
    }
  }
`

export const CreateGoodDealScreen = ({ navigation } : any) => {
  const [createGoodDeal, { loading }] = useMutation(CREATE_GOOD_DEAL)
  const [isLoadingPicture, setIsLoadingPicture] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [link, setLink] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  function handleSubmit(
    title: string,
    description: string,
    content: string,
    link: string,
    imageUrl: string
  ) {
    if (title.trim() === '') {
      return alert('Renseigner un titre')
    }
    if (description.trim() === '') {
      return alert('Renseigner une description')
    }
    if( content.trim() === ''){
      return alert('Renseigner un contenu')
    }
    createGoodDeal({
      variables: {
        data: {
          goodDealTitle: title,
          goodDealContent: content,
          goodDealDescription: description,
          goodDealLink: link,
          image: imageUrl,
        },
      },
      onCompleted(data) {
        alert('Good deal published with success')
        setTitle('')
        setDescription('')
        setContent('')
        setLink('')
        setPictureUrl('')
        //pass the new good deal id to the below navigate()
        navigation.navigate('Mes bons plans')
      },
      onError(error) {
        console.log('>>>>ERROR GOOD DEAL CREATION FAILED >>>>', error.message)
        alert('Good deal creation failed')
      },
    })
  }
  return (
    <SafeAreaView>
      <ScrollView>
          <Banner
            illustration={props => (
              <Avatar
                color="#17b2aa"
                icon={props => <Feather name="info" size={24} color="white" />}
                {...props} />
            )}
            text="Nous vous conseillons d'utiliser notre application web pour créer des bons plans !" 
            buttons={null}   
            style={{ marginBottom: 20 }}       
          />
        <Stack spacing={30} style={{ marginLeft: 25, marginRight: 25 }}>
          
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 40,
              marginBottom: 40,
            }}
          >
            Partages tes bons plans!
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

          <TextInputFromRn
            style={styles.input}
            placeholder="Contenu"
            multiline={true}
            value={content}
            onChangeText={(text) => setContent(text)}
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
              handleSubmit(title, description, content, link, pictureUrl)
            }}
            loading={loading === true || isLoadingPicture === true}
            loadingIndicatorPosition="overlay"
            style={{
              backgroundColor: '#003c49',
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
