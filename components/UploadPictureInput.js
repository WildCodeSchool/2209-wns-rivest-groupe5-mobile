import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Image, StyleSheet } from "react-native"
import { Button } from "@react-native-material/core";
import axios from "axios";
import Constants from "expo-constants";
import { MaterialIcons } from '@expo/vector-icons';

const { manifest } = Constants;

export const UploadPictureInput = ({ setPictureUrl,pictureUrl,isLoadingPicture,setIsLoadingPicture}) => {
    const cloudinaryUpload = async (photo) => {
        try {
            setIsLoadingPicture(true)
            const formData = new FormData()
            formData.append('file', photo)

            const endpoint = manifest?.debuggerHost && `http://${manifest.debuggerHost.split(":").shift()}:4040/upload`;
            const response = await axios({
                method: "post",
                url: endpoint,
                data: formData,
                timeout: 120000,
                headers: { "Content-Type": "multipart/form-data" }
            })
            console.log('>>>>>Picture URL  FROM  CLOUDINARY>>>>', response.data.secure_url)
            setPictureUrl(response.data.secure_url)
            setIsLoadingPicture(false)
        } catch (error) {
            setIsLoadingPicture(false)
            console.log('>>>ERROR uploading to cloudinary >>>', error)
            alert('Picture uploading failed')
        }
    }


    const pickImageAndGetCloudinaryUrl = async () => {
        const cameraRollPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraRollPerm.status === "granted") {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 0,
            });
            console.log(">>>>>PICKED IMAGE>>>>>>", result);

            const photo = {
                uri: result.assets[0].uri,
                type: result.assets[0].type,
                // name: result.assets[0].fileName && result.assets[0].fileName !== null ? result.assets[0].fileName : uuid()
                name: 'toto'
            }
            await cloudinaryUpload(photo)
        }
    };

    return (
        <View>
            <Button
                variant='outlined'
                onPress={pickImageAndGetCloudinaryUrl}
                title="Ajouter une image"
                trailing={(props) => <MaterialIcons name="add-photo-alternate" size={24} color="black" />}
                style={{ marginBottom: 10, color: "grey" }}
                loading={isLoadingPicture}
                loadingIndicatorPosition="overlay"
            />
            {pictureUrl && <Image
                style={styles.picturePreview}
                source={{ uri: pictureUrl }}
            />}
        </View>
    )
}


const styles = StyleSheet.create({
    picturePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderBottom: 30
    },
});