import React from "react"
import { Text, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  title: {
    color: "#3f50b5",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 18,
    fontFamily: "RobotoBold",
  },
})

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>
}
