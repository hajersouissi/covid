import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Image,
  StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import i18n from 'i18next';

import {withTranslation, WithTranslation} from 'react-i18next';


const CurryImagePicker = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image])

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      response => {
        if (response.error) {
          console.log("image error");
        } else {
          console.log("Image: " + response.uri)
          setSelectedImage({ uri: response.uri });
          onImagePicked({ uri: response.uri });
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button color='blue' title={i18n.t ('personForm:pickImage')} onPress={this.pickImageHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 1,
    marginTop:30,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    height: 40,
    alignSelf: 'center',
margin: 8,

    borderRadius: 10,
    backgroundColor: '#eee',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,

    width: 200,
  },
  
  previewImage: {
    width: '100%',
    height: '100%'
  }
})

export default withTranslation()(CurryImagePicker);