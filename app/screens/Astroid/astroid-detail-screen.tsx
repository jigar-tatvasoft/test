import React from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Text, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"
import { useStores } from "../../models"
export const logoIgnite = require("./logo-ignite.png")
export const heart = require("./heart.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}
const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}

const platformCommand = Platform.select({
  ios: "Cmd + D",
  android: "Cmd/Ctrl + M",
})

export const AtroidDetailScreen = observer(function AtroidDetailScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const { astroidStore } = useStores()

  return (
    <View testID="DemoScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerText='Astroid Detail'
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Text style={TAGLINE}>{'Name :' + astroidStore.astroidDetail.name}</Text>
        <Text style={TAGLINE}>{'JPL URL :' + astroidStore.astroidDetail.nasa_jpl_url}</Text>
        <Text style={TAGLINE}>{'Potentially Hazardous Asteroid :' + (astroidStore.astroidDetail.is_potentially_hazardous_asteroid ? 'YES' : 'NO')}</Text>
      </Screen>
    </View>
  )
})
