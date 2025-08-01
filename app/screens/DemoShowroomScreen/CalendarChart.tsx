import React from "react"
import { View, Dimensions } from "react-native"
import Svg, { Line, Text, Rect } from "react-native-svg"

const CalendarChart = () => {
  const screenWidth = Dimensions.get("window").width * 0.9
  const paddingLeft = 30
  const paddingRight = 10
  const chartWidth = screenWidth - paddingLeft - paddingRight

  const hours = [0, 4, 8, 12, 16, 20, 24]
  const cellWidth = chartWidth / (hours.length - 1)
  const cellHeight = 20

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  return (
    <Svg
      width={screenWidth}
      height={20 + daysInMonth * cellHeight}
      style={{ alignItems: "flex-start", marginTop: 20, marginHorizontal: 18 }}
    >
      <Line
        x1={paddingLeft}
        y1={20}
        x2={screenWidth - paddingRight}
        y2={20}
        stroke="#003366"
        strokeWidth={2}
      />

      {hours.map((h, i) => {
        const xPos = paddingLeft + i * cellWidth

        if (h === 24) {
          return (
            <Text key={h} x={xPos} y={15} fontSize="12" fill="#003366" textAnchor="middle">
              {h}
            </Text>
          )
        }

        return (
          <React.Fragment key={h}>
            <Line
              x1={xPos}
              y1={20}
              x2={xPos}
              y2={20 + daysInMonth * cellHeight}
              stroke={h === 0 ? "#003366" : "#fff"}
              strokeWidth={2}
            />
            <Text x={xPos} y={15} fontSize="12" fill="#003366" textAnchor="middle">
              {h}
            </Text>
          </React.Fragment>
        )
      })}

      <Line
        x1={paddingLeft}
        y1={20}
        x2={paddingLeft}
        y2={20 + daysInMonth * cellHeight}
        stroke="#003366"
        strokeWidth={2}
      />
      {Array.from({ length: daysInMonth }, (_, d) => (
        <Text
          key={d}
          x={paddingLeft - 15}
          y={20 + d * cellHeight + cellHeight / 2 + 5}
          fontSize="12"
          fill="#003366"
          textAnchor="middle"
        >
          {d + 1}
        </Text>
      ))}

      {Array.from({ length: daysInMonth }, (_, d) =>
        Array.from({ length: hours.length - 1 }, (_, i) => (
          <Rect
            key={`${d}-${i}`}
            x={paddingLeft + i * cellWidth}
            y={20 + d * cellHeight}
            width={cellWidth}
            height={cellHeight}
            fill="#e6f2ff"
            stroke="#ffffff"
            strokeWidth={1}
          />
        )),
      )}
    </Svg>
  )
}

export default CalendarChart
