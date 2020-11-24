import React from "react"

import { Text, View, StyleSheet, Image } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    display: "inline-block",
    height: 50,
    width: 50,
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
})

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Image
          src="https://pbs.twimg.com/profile_images/741659820298805248/6J3xG0Mc_400x400.png"
          alt="eReuse logo"
        />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}
