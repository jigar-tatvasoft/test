/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useEffect, useState } from "react"
import { Image, TouchableOpacity, TextStyle, View, ViewStyle, ActivityIndicator, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { useStores } from "../../models"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  textAlign: 'center'
}

const BOLD: TextStyle = { fontWeight: "bold" }

const BTN_SUBMIT: ViewStyle = {
  marginTop: 10,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
  borderRadius: 8
}
const BTN_SUBMIT_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const CONTAINER_VIEW: ViewStyle = {
  marginHorizontal: 20,
  flex: 1,
}

export const AstroidFormScreen = observer(function AstroidFormScreen() {

  const [astroid, setAstroid] = useState('')
  const navigation = useNavigation()

  const { astroidStore } = useStores()

  useEffect(() => {
    const fetchData = async() => {
        await astroidStore.getAstroids()
    }

    fetchData()
   
  }, [])

  const handleRandomAstroid = () => {
    if(astroidStore.astroidList.length > 0){
      const data = astroidStore.astroidList[Math.floor(Math.random() * astroidStore.astroidList.length)]
      astroidStore.updateAstroidDetail(data)
      navigation.navigate('astroidDetail')
    }else {
      alert('Data not found')
    }
  }

  const handleAstroid = async() => {
    await astroidStore.getAstroidByID(astroid)
    navigation.navigate('astroidDetail')
  }

  const valid = Boolean(astroid) && Boolean(astroid.trim()) 

  return (
    <View testID="DemoListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText=""
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_VIEW}>
          <Text style={{textAlign: 'center', marginVertical: 40, fontSize: 20}}>Get Astroid</Text>
        <TextInput 
          placeholder={'Enter Asteroid ID'} style={{
          backgroundColor:'white',
          padding: 15,
          borderRadius: 8
          }} 
          value={astroid}
          onChangeText={text => setAstroid(text)}
        />
        <TouchableOpacity onPress={() => handleAstroid()}>
          <View style={[BTN_SUBMIT, {opacity: valid ? 1 : 0.5}]}>
            {
              astroidStore.loading ? 
              <ActivityIndicator />
              :
            <Text style={BTN_SUBMIT_TEXT}>Submit</Text>  
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRandomAstroid()}>
          <View style={BTN_SUBMIT}>
            <Text style={BTN_SUBMIT_TEXT}>Random Astroid</Text>
          </View>
        </TouchableOpacity>
        </View>
      </Screen>
    </View>
  )
})
