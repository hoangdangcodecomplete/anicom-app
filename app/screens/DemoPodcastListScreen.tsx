import { FC } from "react"

import { Screen } from "@/components/Screen"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { $styles } from "@/theme/styles"

export const DemoPodcastListScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = (_props) => {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}></Screen>
  )
}
