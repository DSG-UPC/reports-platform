import React from "react";
import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";
import Header from "./Header";
import getDeviceImpact from "../../utils/getDeviceImpact";
import ListItem from "./ListItem"

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    "@media max-width: 400": {
      flexDirection: "column",
    },
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 10,
    fontWeight: "bold",
  },
  footer: {
    fontSize: 12,
    marginTop: 25,
    paddingTop: 10,
    "@media orientation: landscape": {
      marginTop: 10,
    },
  },
});

// Create Document Component
export default function PDF({ title, data }) {
  const { firstUsage, extendedUsage, lastScore } = getDeviceImpact(data.device);

  return (
    <Document>
      <Page style={styles.page}>
        <Header
          title={`${title} Report`}
          address={`0x${data.device.address}`}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{title} Metrics</Text>
          <View>
            <Text style={styles.subtitle}>Social impact</Text>
            <View style={styles.item}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                Device Base Usage: {firstUsage}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>
                Device Extended Life-Time: {extendedUsage}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>Score</Text>
            <ListItem title="Device Last Score:">{lastScore}</ListItem>
            <View style={styles.item}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>Device Last Score:</Text>
            </View>
          </View>
        </View>
        <Text style={styles.footer}>
          View this report online:{" "}
          <Link
            src={`http://localhost:3000/export?device=${data.device.address}`}
          >
            {`http://localhost:3000/export?device=${data.device.address}`}
          </Link>
        </Text>
      </Page>
    </Document>
  );
}
