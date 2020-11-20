import React from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer"
import Header from "./Header"
import getDeviceImpact from "../utils/getDeviceImpact"
import ListItem from "./ListItem"
import Title from "./Title"
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table"

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
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  paperbox: {
    minWidth: 230,
    backgroundColor: "#F8F8F8",
    margin: 10,
    padding: "10 15",
    border: "1 solid #EEEEEE",
    borderRadius: "8",
    color: "#000",
  },
  paperboxTitle: {
    fontFamily: "Roboto",
    fontSize: 12,
    letterSpacing: 0.4,
  },
  paperboxContent: {
    fontFamily: "RobotoBold",
    fontSize: 14,
    letterSpacing: 0.25,
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
})

// Create Document Component
export default function PDF({ title, data }) {
  const { firstUsage, extendedUsage, lastScore } = getDeviceImpact(data.device)

  const getShortAddress = (address) => {
    const beginning = address.substring(0, 4)
    const end = address.substring(address.length - 5, address.length - 1)
    return "0x" + beginning + "..." + end
  }
  return (
    <Document>
      <Page style={styles.page}>
        <Header title={title} address={`0x${data.device.address}`} />
        <View style={styles.container}>
          <View>
            <Title>Device Metrics</Title>
            <View style={styles.metrics}>
              <PaperBox title="Base Usage" content={`${firstUsage} hours`} />
              <PaperBox
                title="Extended Life-Time Usage"
                content={`${extendedUsage} hours`}
              />
              <PaperBox title="Last Score" content={`${lastScore}/10`} />
              <PaperBox title="Last Score" content={`${lastScore}/10`} />
              <PaperBox title="Last Score" content={`${lastScore}/10`} />
              <PaperBox title="Last Score" content={`${lastScore}/10`} />
            </View>
          </View>
          <View>
            <Title>Proofs</Title>
            <Table data={data.device.proofs.functionproofs}>
              <TableHeader>
                <TableCell>Block</TableCell>
                <TableCell>User Address</TableCell>
                <TableCell>DeviceAddress</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Disk Usage</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell
                  getContent={(r) => (
                    <Link src={`http://localhost:3000/b/${r.block}`}>
                      {r.block}
                    </Link>
                  )}
                />
                <DataTableCell
                  getContent={(r) => getShortAddress(r.useraddress)}
                />
                <DataTableCell
                  getContent={(r) => getShortAddress(r.deviceaddress)}
                />
                <DataTableCell getContent={(r) => r.score} />
                <DataTableCell getContent={(r) => r.diskusage} />
              </TableBody>
            </Table>
          </View>
          {/* <View>
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
          </View> */}
        </View>
        <Text style={styles.footer}>
          View this report online:{" "}
          <Link src={`http://localhost:3000/?device=${data.device.address}`}>
            {`http://localhost:3000/?device=${data.device.address}`}
          </Link>
        </Text>
      </Page>
    </Document>
  )
}

function PaperBox({ title, content }) {
  return (
    <View style={[styles.paperbox, { boxShadow: "5px 5px 8px #000" }]}>
      <Text style={styles.paperboxTitle}>{title}</Text>
      <Text style={styles.paperboxContent}>{content}</Text>
    </View>
  )
}

// https://material.io/design/typography/the-type-system.html#type-scale
