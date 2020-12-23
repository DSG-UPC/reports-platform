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
  tableHeaderCell: {
    padding: 5,
    fontSize: 11,
  },
  tableCell: {
    padding: 5,
    fontSize: 9,
  },
})

// Create Document Component
export default function PDF({ all }) {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Header title="DLT Report" />
        <View style={styles.main}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Impact</Text>
            <Element
              variable="Total Extended Lifetime"
              value={all.impact.totalExtendedUsage}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proofs</Text>
            {Object.entries(all.proofs).map((entry, index) => (
              <Element key={index} variable={`#${entry[0]}`} value={entry[1]} />
            ))}
          </View>
        </View>
        <Footer url={`${FRONTENDURL}/all`} />
      </Page>
    </Document>
  )
}

// https://material.io/design/typography/the-type-system.html#type-scale

function Element({ variable, value }) {
  return (
    <View style={styles.inline}>
      <Text style={styles.variable}>{variable}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}
