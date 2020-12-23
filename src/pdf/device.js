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
// import {
//   Table,
//   TableHeader,
//   TableCell,
//   TableBody,
//   DataTableCell,
// } from "@david.kucsai/react-pdf-table"
import Footer from "./Footer"
// import { getShortHex } from "utils"

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
export default function PDF({ device }) {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Header title="Device Report" />
        <View style={styles.main}>
          <View style={styles.section}>
            <Element variable="Device Address" value={`0x${device.address}`} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Impact</Text>
            <Element variable="Base Usage" value={device.impact.firstUsage} />
            <Element
              variable="Extended Lifetime"
              value={device.impact.extendedUsage}
            />
            <Element variable="Last Score" value={device.impact.lastScore} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proofs</Text>
            {Object.entries(device.proofs).map((entry, index) => (
              <Element
                key={index}
                variable={`#${entry[0]}`}
                value={entry[1].length}
              />
            ))}
            {/* <Tables proofs={device.proofs} /> */}
          </View>
        </View>
        <Footer url={`${FRONTENDURL}/devices?search=${device.address}`} />
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

// function Tables({ proofs }) {
//   return (
//     <>
//       <Text style={{ fontSize: 15 }}>Function Proofs</Text>
//       <Table data={proofs.functionproofs}>
//         <TableHeader>
//           <TableCell weighting={0.1} style={styles.tableHeaderCell}>
//             block
//           </TableCell>
//           <TableCell weighting={0.2} style={styles.tableHeaderCell}>
//             useraddress
//           </TableCell>
//           <TableCell weighting={0.2} style={styles.tableHeaderCell}>
//             deviceaddress
//           </TableCell>
//           <TableCell weighting={0.2} style={styles.tableHeaderCell}>
//             diskusage
//           </TableCell>
//           <TableCell weighting={0.1} style={styles.tableHeaderCell}>
//             score
//           </TableCell>
//           <TableCell weighting={0.2} style={styles.tableHeaderCell}>
//             algorithmversion
//           </TableCell>
//         </TableHeader>
//         <TableBody>
//           <DataTableCell
//             style={styles.tableCell}
//             weighting={0.1}
//             getContent={(r) => r.block}
//           />
//           <DataTableCell
//             style={styles.tableCell}
//             weighting={0.2}
//             getContent={(r) => getShortHex(r.useraddress)}
//           />
//           <DataTableCell
//             style={styles.tableCell}
//             weighting={0.2}
//             getContent={(r) => getShortHex(r.deviceaddress)}
//           />
//           <DataTableCell
//             style={styles.tableCell}
//             weighting={0.2}
//             getContent={(r) => r.score}
//           />
//           <DataTableCell
//             style={styles.tableCell}
//             weighting={0.1}
//             getContent={(r) => r.diskusage}
//           />
//           <DataTableCell
//             style={styles.tableCell}
//             weighting={0.2}
//             getContent={(r) => r.algorithmversion}
//           />
//         </TableBody>
//       </Table>
//     </>
//   )
// }
