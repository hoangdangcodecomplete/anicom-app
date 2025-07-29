import { TextStyle, ViewStyle } from "react-native"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { translate } from "@/i18n/translate"
import { DemoPhotoSnapScreen } from "@/screens/DemoPhotoSnapScreen"
import { DemoMedicalRecordScreen } from "@/screens/DemoMedicalRecordScreen"
import { DemoCalendarScreen } from "@/screens/DemoShowroomScreen/DemoCalendarScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { DemoHomeScreen } from "@/screens/DemoHomeScreen"
import { DemoNewsScreen } from "@/screens/DemoNewsScreen"

export type DemoTabParamList = {
  DemoPhotoSnap: undefined
  DemoCalendar: { queryIndex?: string; itemIndex?: string }
  DemoHome: undefined
  DemoNews: undefined
  DemoMedicalRecord: undefined
}

export type DemoTabHomeMainList = {
  ExchangeRelated2: undefined
  ExchangeRelated: undefined
  ExchangeRelated3: undefined
  TodayTask: undefined
  MyRoom: undefined
  SchedulePlan: undefined
  OngoingEvents: undefined
  QuestPlaza: undefined
  AnicomInsurance: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type DemoTabHomeMainProps<T extends keyof DemoTabHomeMainList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabHomeMainList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <EpisodeProvider>
      <Tab.Navigator
        initialRouteName="DemoHome"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: themed([
            $tabBar,
            {
              backgroundColor: "#FFFFFF",
              height: bottom + 70,
              marginHorizontal: 16,
              marginBottom: 20,
              borderRadius: 20,
              position: "absolute",
            },
          ]),
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: themed($tabBarLabel),
          tabBarItemStyle: themed($tabBarItem),
        }}
      >
        <Tab.Screen
          name="DemoPhotoSnap"
          component={DemoPhotoSnapScreen}
          options={{
            tabBarLabel: translate("demoNavigator:componentsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="photoSnap" color={focused ? colors.tint : colors.neutral500} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DemoCalendar"
          component={DemoCalendarScreen}
          options={{
            tabBarLabel: translate("demoNavigator:componentsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="calendar" color={focused ? colors.tint : colors.neutral500} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DemoHome"
          component={DemoHomeScreen}
          options={{
            tabBarLabel: translate("demoNavigator:communityTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="home" color={focused ? colors.tint : colors.neutral500} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DemoNews"
          component={DemoNewsScreen}
          options={{
            tabBarLabel: translate("demoNavigator:debugTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="news" color={focused ? colors.tint : colors.neutral500} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DemoMedicalRecord"
          component={DemoMedicalRecordScreen}
          options={{
            tabBarAccessibilityLabel: translate("demoNavigator:podcastListTab"),
            tabBarLabel: translate("demoNavigator:podcastListTab"),
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="medicalRecord"
                color={focused ? colors.tint : colors.neutral500}
                size={30}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </EpisodeProvider>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 5,
  elevation: 3,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  fontWeight: "600",
})
