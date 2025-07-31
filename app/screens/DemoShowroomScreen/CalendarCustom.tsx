import { colors } from "@/theme/colors"
import React, { useState, useMemo, useRef, useEffect } from "react"
import { View, Text, StyleSheet, PanResponder, TouchableOpacity, Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const horizontalPadding = 16
const dayBoxWidth = (width - horizontalPadding * 2) / 7

type Props = {
  onMonthSelected: (date: number) => void
  onYearSelected: (year: number) => void
}

const CalendarCustom: React.FC<Props> = ({ onMonthSelected, onYearSelected }) => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  useEffect(() => {
    onMonthSelected(currentMonth)
  }, [currentMonth])

  useEffect(() => {
    onYearSelected(currentYear)
  }, [currentYear])

  const getCalendarData = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const prevMonthDays = new Date(year, month, 0).getDate()
    const startDay = new Date(year, month, 1).getDay()

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
      month,
      year,
    }))

    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const prevMonthFill = Array.from({ length: startDay }, (_, i) => ({
      day: prevMonthDays - startDay + 1 + i,
      isCurrentMonth: false,
      month: prevMonth,
      year: prevYear,
    }))

    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7

    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    const nextMonthFill = Array.from({ length: totalCells - (startDay + daysInMonth) }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
      month: nextMonth,
      year: nextYear,
    }))

    return [...prevMonthFill, ...currentMonthDays, ...nextMonthFill]
  }

  const filledDays = useMemo(
    () => getCalendarData(currentYear, currentMonth),
    [currentMonth, currentYear],
  )

  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"]

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) goToNextMonth()
        else if (gestureState.dx > 50) goToPrevMonth()
      },
    }),
  ).current

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1)
        return 0
      }
      return prev + 1
    })
  }

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1)
        return 11
      }
      return prev - 1
    })
  }

  const formatDateKey = (year: number, month: number, day: number) => `${year}-${month + 1}-${day}`

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.weekRow}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={[styles.weekDay, { width: dayBoxWidth }]}>
            <Text
              style={[styles.dayText, index === 0 && styles.sunday, index === 6 && styles.saturday]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {filledDays.map((item, index) => {
          const dayOfWeek = index % 7
          const keyDate = formatDateKey(item.year, item.month, item.day)

          let textColor = "#333"
          if (dayOfWeek === 0) textColor = item.isCurrentMonth ? "red" : "#f99"
          else if (dayOfWeek === 6) textColor = item.isCurrentMonth ? "blue" : "#99f"
          else if (!item.isCurrentMonth) textColor = "#aaa"

          const isSelected = selectedDate === keyDate

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayBox,
                { width: dayBoxWidth },
                !item.isCurrentMonth && styles.outsideMonthBox,
                item.isCurrentMonth && styles.currentMonthBox,
                isSelected && styles.selectedBox,
              ]}
              onPress={() => setSelectedDate(keyDate)}
            >
              <Text style={[styles.dayText, { color: textColor }]}>{item.day}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default CalendarCustom

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
  },
  arrowButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: horizontalPadding,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#ffffff",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  weekDay: {
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    width: dayBoxWidth,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    paddingHorizontal: horizontalPadding,
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  dayBox: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 6,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  dayText: {
    fontSize: 14,
  },
  sunday: {
    color: "red",
  },
  saturday: {
    color: "blue",
  },
  outsideMonthBox: {
    backgroundColor: "#f8f8f8",
    borderColor: "#eee",
  },
  currentMonthBox: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  selectedBox: {
    borderColor: "#2e8b57",
    backgroundColor: "#e6f4ea",
  },
})
