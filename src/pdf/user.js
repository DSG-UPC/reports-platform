import React from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import Header from "./Header"
import Footer from "./Footer"

const FRONTENDURL = process.env.REACT_APP_FRONTENDURL

Font.register({
  family: "RobotoBold",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9vAw.ttf",
})
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
})

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 60,
  },
  p: {
    fontSize: 12,
    fontFamily: "Roboto",
  },
  inline: {
    display: "flex",
    flexDirection: "row",
  },
  variable: {
    fontFamily: "RobotoBold",
    fontSize: 12,
    color: "#333333",
  },
  value: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#333333",
  },
  section: {
    margin: "20px 0px",
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 10,
    color: "#ff2d55",
    textTransform: "uppercase",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
})

// Create Document Component
export default function PDF({ user }) {
  console.log(FRONTENDURL)
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Header title="User Report" />
        <View style={styles.main}>
          <View style={[styles.section, styles.inline]}>
            <Text style={styles.variable}>User Address: </Text>
            <Text style={styles.value}>0x{user.address}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Impact</Text>
            {/* {Object.entries(user.impact).map((entry, index) => {
              return (
                <View key={index} style={styles.inline}>
                  <Text style={styles.variable}>{entry[0]}: </Text>
                  <Text style={styles.value}>{entry[1]}</Text>
                </View>
              )
            })} */}
            <View style={styles.inline}>
              <Text style={styles.variable}>Total Extended Life-Time: </Text>
              <Text style={styles.value}>{user.impact.totalExtendedUsage}</Text>
            </View>
            <View style={styles.inline}>
              <Text style={styles.variable}>Total Extended Life-Time: </Text>
              <Text style={styles.value}>{user.impact.totalExtendedUsage}</Text>
            </View>
            <View style={styles.inline}>
              <Text style={styles.variable}>Total Extended Life-Time: </Text>
              <Text style={styles.value}>{user.impact.totalExtendedUsage}</Text>
            </View>
          </View>
        </View>
        <Footer url={`${FRONTENDURL}/users?search=${user.address}`} />
      </Page>
    </Document>
  )
}

// https://material.io/design/typography/the-type-system.html#type-scale
