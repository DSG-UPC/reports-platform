import React from "react"

import { Text, View, StyleSheet, Link } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    margin: 40,
    fontSize: 10,
    color: "#333333",
  },
})

export default function Footer({ url }) {
  return (
    <View fixed style={styles.footer}>
      <Text>Created by eReuse on {new Date().toGMTString()}</Text>
      <Text>
        Validate this report at: <Link src={url}>{url}</Link>
      </Text>
    </View>
  )
}
