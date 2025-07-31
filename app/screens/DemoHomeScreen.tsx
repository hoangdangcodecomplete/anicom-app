import { Icon, iconRegistry, IconTypes } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { DemoTabHomeMainList, DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React, { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { AnicomInsurance } from "./EventsPlaza/AnicomInsurance"
import { OngoingEvents } from "./EventsPlaza/OngoingEvents"
import { QuestPlaza } from "./EventsPlaza/QuestPlaza"
import { ExchangeRelated } from "./Related/ExchangeRelated"
import { ExchangeRelated2 } from "./Related/ExchangeRelated2"
import { ExchangeRelated3 } from "./Related/ExchangeRelated3"
import { MyRoom } from "./Room/MyRoom"
import { SchedulePlan } from "./Room/SchedulePlan"
import { TodayTask } from "./Room/ThingTodo"

const imageDog = require("@assets/images/image-dog1.png")
const imageFade = require("@assets/images/image-fade.png")
const imageBackground = require("@assets/images/image_related.png")
const imageBackgroundRoom = require("@assets/images/image-room.png")
const imageBackgroundEventPlaza = require("@assets/images/image-eventplaza.png")
const imageCloud = require("@assets/icons/cloud.png")

const images = [imageDog, imageDog, imageDog]
const imagesEvent = [imageBackground, imageBackgroundRoom, imageBackgroundEventPlaza]

const { height: screenHeight, width: screenWidth } = Dimensions.get("window")

const Tab = createBottomTabNavigator<DemoTabHomeMainList>()

const weekdays = ["日", "月", "火", "水", "木", "金", "土"]

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const weekday = weekdays[date.getDay()]
  return `${year}/${month}/${day} (${weekday})`
}

const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}

const ImageSlider = memo(({ onIndexChange }: { onIndexChange: (index: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCloud, setShowCloud] = useState(false)

  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const firstIndex = viewableItems[0]?.index
      if (viewableItems.length > 0 && typeof firstIndex === "number") {
        setCurrentIndex(firstIndex)
        onIndexChange(firstIndex)
      }
    },
  )

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

  const handlePress = () => {
    setShowCloud((prev) => !prev)
  }

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Image
          source={item}
          style={{ width: screenWidth, height: screenHeight / 2 }}
          resizeMode="cover"
        />
        <Image
          source={imageFade}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            resizeMode: "stretch",
          }}
        />
      </TouchableOpacity>
    ),
    [],
  )

  return (
    <View style={{ position: "relative" }}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {currentIndex < images.length - 1 && (
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rightGradient}
        />
      )}
      {currentIndex > 0 && (
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.leftGradient}
        />
      )}

      {showCloud && (
        <Image
          source={imageCloud}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            resizeMode: "contain",
            height: screenHeight / 7,
          }}
        />
      )}
    </View>
  )
})

export const DemoHomeScreen: FC<DemoTabScreenProps<"DemoHome">> = function DemoHomeScreen(_props) {
  const { themed } = useAppTheme()
  const [currentDate, setCurrentDate] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDate(formatDate(now))
      setCurrentTime(formatTime(now))
    }
    updateDateTime()
    const interval = setInterval(updateDateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const tabLists: Array<
    Array<{
      name: string
      component: React.ComponentType<any>
      label: string
      icon: IconTypes
    }>
  > = [
    [
      {
        name: "ExchangeRelated",
        component: ExchangeRelated,
        label: "ExchangeRelated",
        icon: "dog",
      },
      {
        name: "ExchangeRelated2",
        component: ExchangeRelated2,
        label: "ExchangeRelated2",
        icon: "dogCat",
      },
      {
        name: "ExchangeRelated3",
        component: ExchangeRelated3,
        label: "ExchangeRelated3",
        icon: "dogTrainning",
      },
    ],
    [
      { name: "TodayTask", component: TodayTask, label: "TodayTask", icon: "todayTask" },
      { name: "MyRoom", component: MyRoom, label: "MyRoom", icon: "bow" },
      {
        name: "SchedulePlan",
        component: SchedulePlan,
        label: "SchedulePlan",
        icon: "schedulePlan",
      },
    ],
    [
      { name: "OngoingEvents", component: OngoingEvents, label: "OngoingEvents", icon: "dog" },
      { name: "QuestPlaza", component: QuestPlaza, label: "QuestPlaza", icon: "circleLoading" },
      {
        name: "AnicomInsurance",
        component: AnicomInsurance,
        label: "AnicomInsurance",
        icon: "anicom",
      },
    ],
  ]

  const tabsToRender = tabLists[tabIndex] || tabLists[0]
  const tabImageToRender = imagesEvent[tabIndex] || imagesEvent[0]

  return (
    <Screen preset="scroll" safeAreaEdges={[]} contentContainerStyle={[themed($container)]}>
      <View>
        <ImageSlider onIndexChange={setTabIndex} />
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          pointerEvents="none"
          colors={["transparent", "white"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.bottomGradient}
        />
        <View style={styles.dateTimeContainer}>
          <View style={styles.iconStatus}>
            <Icon icon="pills" color={colors.textWhite} size={18} />
            <Icon icon="clock" color={colors.textWhite} size={18} />
            <Icon icon="plushIcon" color={colors.textWhite} size={18} />
          </View>
          <View style={styles.iconStatus}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Icon icon="bell" color={colors.accent500} size={18} />
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      <View style={styles.imageBackgroundWrapper}>
        <Image source={tabImageToRender} style={$imageBell} />
        <EpisodeProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarStyle: themed([
                $tabBar,
                {
                  height: 80,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  overflow: "hidden",
                  top: -0.2,
                },
              ]),
              tabBarBackground: () => (
                <LinearGradient
                  colors={["#74d898ff", "#34AD59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
              ),
              tabBarActiveTintColor: colors.textWhite,
              tabBarInactiveTintColor: colors.textWhite,
              tabBarLabelStyle: themed($tabBarLabel),
              tabBarItemStyle: themed($tabBarItem),
            }}
          >
            {tabsToRender.map((tab) => (
              <Tab.Screen
                key={tab.name}
                name={tab.name as any}
                component={tab.component as React.ComponentType<any>}
                options={{
                  tabBarLabel: () => (
                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#FFFFFF" }}>
                      {tab.label}
                    </Text>
                  ),
                  tabBarIcon: ({ focused }) => (
                    <Icon
                      icon={tab.icon}
                      color={focused ? colors.tint : colors.neutral500}
                      size={30}
                    />
                  ),
                }}
              />
            ))}
          </Tab.Navigator>
        </EpisodeProvider>
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  paddingBottom: 0,
})

const $imageBell: ImageStyle = {
  width: "100%",
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderTopColor: "transparent",
  width: "100%",
  shadowOpacity: 0,
  elevation: 0,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
})

const styles = StyleSheet.create({
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 2,
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
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textWhite,
  },
  iconStatus: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  iconBell: {
    color: colors.accent300,
  },
  imageBackgroundWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  rightGradient: {
    position: "absolute",
    top: "25%",
    right: 0,
    width: 12,
    height: "50%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  leftGradient: {
    position: "absolute",
    top: "25%",
    left: 0,
    width: 12,
    height: "50%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  blurOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  blurBox: {
    position: "absolute",
    width: "80%",
    height: "80%",
    borderRadius: 20,
    overflow: "hidden",
  },
  transparentBox: {
    position: "absolute",
    width: "60%",
    height: "60%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
})
