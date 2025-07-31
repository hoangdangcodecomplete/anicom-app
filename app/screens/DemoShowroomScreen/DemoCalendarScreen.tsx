import { Screen } from "@/components/Screen"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { spacing } from "@/theme/spacing"
import React, { FC, useState } from "react"
import { View, ViewStyle, StyleSheet, Text, Button, Pressable } from "react-native"
import CalendarCustom from "./CalendarCustom"
import { colors } from "@/theme/colors"
import CalendarChart from "./CalendarChart"

export type DemoTabParamList = {
  DemoNews: undefined
  DemoMedicalRecord: undefined
}

export const DemoCalendarScreen: FC<DemoTabScreenProps<"DemoCalendar">> = () => {
  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [modeCalendar, setModeCalendar] = useState("user") // user | doctor

  const handleMonthSelected = (month: number) => {
    setCurrentMonth(month)
  }
  const handleYearSelected = (year: number) => {
    setCurrentYear(year)
  }

  const handleSetModeCalendar = () => {
    setModeCalendar((prev) => (prev === "user" ? "doctor" : "user"))
  }

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$stylesCalendar.container}
      safeAreaEdges={["top"]}
    >
      <View style={styles.header}>
        <Text style={styles.monthText}>
          {currentYear}年{currentMonth + 1}月
        </Text>
        <View style={{ height: 10, borderRadius: 20 }}>
          <Pressable style={styles.button} onPress={handleSetModeCalendar}>
            <Text style={styles.text}>
              {" "}
              {modeCalendar === "user" ? "User mode" : "Doctor mode"}
            </Text>
          </Pressable>
        </View>
      </View>
      {modeCalendar === "user" ? (
        <CalendarCustom onMonthSelected={handleMonthSelected} onYearSelected={handleYearSelected} />
      ) : (
        <CalendarChart />
      )}
    </Screen>
  )
}
export const $stylesCalendar = {
  container: {
    paddingTop: spacing.lg + spacing.xl,
  } as ViewStyle,
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.background,
    marginBottom: 16,
  },
  arrowButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    height: 24,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  text: {
    color: "#2e8b57",
    fontWeight: "600",
  },
})
