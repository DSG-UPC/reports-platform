import React from "react"

import { Link, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "stretch",
    paddingBottom: 5,
  },
  detailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    justifyContent: "space-between",
  },
  linkColumn: {
    flexDirection: "column",
    flexGrow: 2,
    alignSelf: "flex-end", // abaix
    justifySelf: "flex-end", // a la dreta
  },
  name: {
    fontSize: 20,
    // fontFamily: "Lato Bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    // fontFamily: "Lato",
  },
  link: {
    // fontFamily: "Lato",
    fontSize: 12,
    color: "black",
    textDecoration: "none",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
})

export default function Header({ title, address }) {
  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.subtitle}>{address}</Text>
      </View>
      <View style={styles.linkColumn}>
        <Link style={styles.link}>nilquerag@gmail.com</Link>
      </View>
    </View>
  )
}
