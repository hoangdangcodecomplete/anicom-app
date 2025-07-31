import { FC } from "react"
import { TextStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { DemoTabHomeMainProps } from "@/navigators/DemoNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

export const ExchangeRelated3: FC<DemoTabHomeMainProps<"ExchangeRelated3">> =
  function ExchangeRelated3(_props) {
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
