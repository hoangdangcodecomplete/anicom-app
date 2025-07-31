import { Screen } from "@/components/Screen"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import React, { FC } from "react"
import { Text } from "@/components/Text"
import { ThemedStyle } from "@/theme/types"
import { TextStyle } from "react-native"

export type DemoTabParamList = {
  DemoNews: undefined
  DemoMedicalRecord: undefined
}

export const DemoCalendarScreen: FC<DemoTabScreenProps<"DemoCalendar">> = () => {
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="demoCommunityScreen:title" style={themed($title)} />
    </Screen>
  )
}
const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
