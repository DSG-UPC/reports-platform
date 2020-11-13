import React from 'react'
import { View, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
    fontSize: 10,
  },
});

export default function ListItem({title, children}) {
    return (
      <View style={styles.item}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.itemContent}>
            {title && (`${title}: `)}
            {children}
        </Text>
      </View>
    );
}
