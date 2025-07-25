import { FC, useEffect, useState } from "react"
import { ViewStyle, Image, Dimensions, ImageStyle, StyleSheet, Text, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { Screen } from "@/components/Screen"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { colors } from "@/theme/colors"
import { Icon } from "@/components/Icon"

const imageDog = require("@assets/images/image-dog.jpg")
const bell = require("@assets/icons/bell.png")

const screenHeight = Dimensions.get("window").height

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> = () => {
  const { themed } = useAppTheme()

  const [currentDate, setCurrentDate] = useState("")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      // Format YYYY/MM/DD
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, "0")
      const day = String(now.getDate()).padStart(2, "0")

      // Lấy thứ trong tuần (theo kiểu Nhật Bản: 月, 火, 水...)
      const weekdays = ["日", "月", "火", "水", "木", "金", "土"]
      const weekday = weekdays[now.getDay()]

      // Format giờ phút
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")

      setCurrentDate(`${year}/${month}/${day} (${weekday})`)
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 60000) // cập nhật mỗi phút

    return () => clearInterval(interval)
  }, [])

  return (
    <Screen preset="scroll" safeAreaEdges={[]} contentContainerStyle={[themed($container)]}>
      <Image source={imageDog} style={$image} resizeMode="cover" />

      <LinearGradient
        colors={["white", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.topGradient}
      />

      <LinearGradient
        colors={["transparent", "white"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bottomGradient}
      />

      <View style={styles.dateTimeContainer}>
        <View style={styles.iconStatus}>
          <Icon icon="pills" color={colors.accent300} size={18} />
          <Icon icon="bell" color={colors.accent300} size={18} />
        </View>
        <View style={styles.iconStatus}>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Icon icon="bell" color={colors.accent300} size={18} />
        </View>
        <Text style={styles.timeText}>{currentTime}</Text>
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  paddingBottom: 0,
})

const $image: ImageStyle = {
  width: "100%",
  height: screenHeight / 2,
}

const $imageBell: ImageStyle = {
  width: "100%",
  height: screenHeight / 2,
}

const styles = StyleSheet.create({
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  dateTimeContainer: {
    position: "absolute",
    bottom: 6,
    left: 30,
  },
  dateText: {
    fontSize: 16,
    color: colors.textWhite,
    marginBottom: 2,
  },
  timeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textWhite,
  },
  iconStatus: {
    flexDirection: "row",
    gap: 6,
    alignItems: "flex-end",
  },
  iconBell: {
    color: colors.accent300,
  },
})
