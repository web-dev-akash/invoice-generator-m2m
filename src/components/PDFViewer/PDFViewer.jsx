import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import logo from "/pdflogo.png";
import stamp from "/pdfStamp.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToWords } from "to-words";
import { Font } from "@react-pdf/renderer";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

// Register the font and its weights
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      fontWeight: 700,
    },
  ],
});

const Header = ({ currDate, customer }) => (
  <View style={styles.header} fixed>
    {/* Logo and Title */}
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: "80px",
      }}
    >
      <Image src={logo} style={styles.logo} />
      <Text style={styles.title}>Performa Invoice</Text>
    </View>

    {/* Information Table */}
    <View style={styles.infoTable}>
      {/* Left Column */}
      <View style={{ ...styles.infoColumn, flex: 1.7, padding: "5px" }}>
        <Text style={{ fontWeight: "bold" }}>M2MLOGGER</Text>
        <Text style={styles.smallText}>Plot 00, Street 1B</Text>
        <Text style={styles.smallText}>Friends Colony Company Area, Bihar</Text>
        <Text style={styles.smallText}>GSTIN / UUIN: XXXXXXXXXXXXXX</Text>
        <Text style={styles.smallText}>State Name: Delhi, Code : 07</Text>
        <Text style={styles.smallText}>Email: company.data@gmail.com</Text>
      </View>

      {/* Middle Column */}
      <View style={{ ...styles.infoColumn, flex: 1 }}>
        <View style={styles.infoRow}>
          <Text style={styles.infoTextBold}>Performa Invoice No.</Text>
          <Text>PIC250014</Text>
        </View>
        <View
          style={{
            ...styles.infoRow,
            borderBottom: "none",
          }}
        >
          <Text style={styles.infoTextBold}>Reference No. & Date</Text>
          <Text>PIC250014 dt. {currDate}</Text>
        </View>
      </View>

      {/* Right Column */}
      <View style={{ ...styles.infoColumn, flex: 1 }}>
        <View style={styles.infoRow}>
          <Text style={[styles.infoTextBold]}>Dated</Text>
          <Text>{currDate}</Text>
        </View>
        <View
          style={{
            ...styles.infoRow,
            borderBottom: "none",
          }}
        >
          <Text style={[styles.infoTextBold]}>Other References</Text>
          <Text>{"  "}</Text>
        </View>
      </View>
    </View>

    {/* Buyer Section */}
    <View style={{ ...styles.infoTable, alignItems: "stretch" }}>
      {/* Left Column */}
      <View style={{ ...styles.infoColumn, flex: 1.7, padding: "5px" }}>
        <Text style={styles.infoTextBold}>Buyer (Bill to)</Text>
        <Text style={styles.smallText}>{customer.name}</Text>
        <Text style={styles.smallText}>{customer.address}</Text>
        <Text style={styles.smallText}>GSTIN / UIN: {customer.gstin}</Text>
        <Text style={styles.smallText}>
          State Name: {customer.state}, Code : {customer.code}
        </Text>
      </View>

      {/* Middle Column */}
      <View style={{ ...styles.infoColumn, flex: 1 }}>
        <View
          style={{
            ...styles.infoRow,
            minHeight: "95px",
            borderBottom: "none",
            // padding: "10px",
          }}
        >
          <Text style={styles.infoTextBold}>Buyer's Order No.</Text>
          <Text></Text>
        </View>
      </View>

      {/* Right Column */}
      <View style={{ ...styles.infoColumn, flex: 1 }}>
        <View
          style={{
            ...styles.infoRow,
            minHeight: "95px",
            borderBottom: "none",
            // padding: "10px",
          }}
        >
          <Text style={styles.infoTextBold}>Dated</Text>
          <Text></Text>
        </View>
      </View>
    </View>
  </View>
);

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>This is a Computer Generated Invoice</Text>
    <View
      style={{
        borderTop: "1px solid black",
        display: "flex",
        gap: "10px",
        marginTop: "15px",
      }}
    >
      <Text>
        <Text style={styles.boldText}>HEAD OFFICE </Text>
        M2MLogger, Plot# 67, Street# 1-B, Friends Colony Industrial Area,
        Shahdara, Delhi -110095
        <Text style={styles.boldText}> TELEPHONE </Text>+91-11-00000000
      </Text>
      <Text>
        <Text style={styles.boldText}>WORKS </Text>
        M2MLogger, B-8, First Floor, F.I.E., Patparganj Industrial Area, Delhi -
        110092, India
        <Text style={styles.boldText}> TELEPHONE </Text>+91-11-00000000
      </Text>
      <Text>www.m2mlogger.com | demo@m2mlogger.com</Text>
      <View style={styles.contactInfo}>
        <Text
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </View>
  </View>
);

const FinalPrice = ({ IGST, totalAmount, SAC }) => (
  <View wrap={false}>
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeader]} fixed>
        <Text
          style={{
            ...styles.tableCell,
            flex: 0.2,
            borderLeft: "1px solid black",
          }}
        >
          {" "}
        </Text>
        <Text
          style={{
            ...styles.descriptionCell,
            textAlign: "right",
            padding: "0",
            paddingRight: "5px",
            paddingTop: "5px",
          }}
        >
          IGST
        </Text>
        <Text style={styles.tableCell}> </Text>
        <Text style={styles.tableCell}>{`${IGST.toFixed(2)}`}</Text>
      </View>

      <View style={styles.tableRow}>
        <Text
          style={{
            ...styles.tableCell,
            flex: 0.2,
            borderLeft: "1px solid black",
          }}
        >
          {" "}
        </Text>
        <View style={{ ...styles.descriptionCell }}>
          <Text
            style={{
              ...styles.tableCell,
              fontWeight: "bold",
              textAlign: "right",
              padding: 0,
              border: "none",
              paddingRight: "5px",
            }}
          >
            Total
          </Text>
        </View>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
          {"   "}{" "}
        </Text>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
          {`${totalAmount}`}
        </Text>
      </View>
    </View>
    <View
      style={{
        padding: "5px",
        border: "1px solid black",
        borderTop: "none",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: -1,
      }}
    >
      <View>
        <Text style={styles.finalTitle}>Amount Chargeable (in words)</Text>
        <Text style={[styles.finalSubTitle, styles.finalBoldText]}>
          INR {toWords.convert(totalAmount)}.
        </Text>
      </View>
      <Text style={styles.finalSubTitle}>E. & O.E.</Text>
    </View>
    <View style={styles.table}>
      <View
        style={[
          styles.tableRow,
          styles.tableHeader,
          {
            borderBottom: "none",
          },
        ]}
      >
        <Text
          style={{
            ...styles.tableCell,
            flex: 0.8,
            borderLeft: "1px solid black",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          SAC
        </Text>
        <Text
          style={{
            ...styles.descriptionCell,
            textAlign: "right",
            padding: "0",
            paddingRight: "5px",
            paddingTop: "5px",
            flex: 0.98,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          Taxable Value
        </Text>
        <View style={{ ...styles.tableCell, padding: 0, flex: 1.08 }}>
          <View style={{ borderBottom: "1px solid black" }}>
            <Text
              style={{
                padding: "1 0",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              Integrated Tax
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                padding: "2 5",
                borderRight: "1px solid black",
                flex: 1,
              }}
            >
              Rate
            </Text>
            <Text style={{ padding: "2 5", flex: 1 }}>Amount</Text>
          </View>
        </View>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
          Total Tax Amount
        </Text>
      </View>

      <View
        style={[styles.tableRow, styles.tableHeader, { borderBottom: "none" }]}
      >
        <Text
          style={{
            ...styles.tableCell,
            flex: 0.8,
            borderLeft: "1px solid black",
          }}
        >
          {SAC}
        </Text>
        <Text
          style={{
            ...styles.descriptionCell,
            textAlign: "right",
            padding: "0",
            paddingRight: "5px",
            paddingTop: "5px",
            flex: 0.98,
          }}
        >
          {(totalAmount - IGST).toFixed(2)}
        </Text>
        <View
          style={{
            ...styles.tableCell,
            padding: 0,
            flex: 1.08,
            borderTop: "none",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              minHeight: "25px",
            }}
          >
            <Text
              style={{
                padding: "2 5",
                borderRight: "1px solid black",
                flex: 1,
                textAlign: "center",
              }}
            >
              18%
            </Text>
            <Text style={{ padding: "2 5", flex: 1 }}>{IGST?.toFixed(2)}</Text>
          </View>
        </View>
        <Text style={{ ...styles.tableCell }}>{IGST?.toFixed(2)}</Text>
      </View>
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text
          style={{
            ...styles.tableCell,
            flex: 0.8,
            borderLeft: "1px solid black",
          }}
        >
          {"  "}
        </Text>
        <Text
          style={{
            ...styles.descriptionCell,
            textAlign: "right",
            padding: "0",
            paddingRight: "5px",
            paddingTop: "5px",
            flex: 0.98,
            fontWeight: "bold",
          }}
        >
          Total : {(totalAmount - IGST).toFixed(2)}
        </Text>
        <View
          style={{
            ...styles.tableCell,
            padding: 0,
            flex: 1.08,
            borderTop: "none",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              minHeight: "25px",
            }}
          >
            <Text
              style={{
                padding: "2 5",
                borderRight: "1px solid black",
                flex: 1,
                textAlign: "center",
              }}
            >
              {"  "}
            </Text>
            <Text style={{ padding: "2 5", flex: 1 }}>{IGST?.toFixed(2)}</Text>
          </View>
        </View>
        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
          {IGST?.toFixed(2)}
        </Text>
      </View>
    </View>
    <View
      style={{
        border: "1px solid black",
        borderTop: "none",
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 1,
          flexDirection: "row",
          fontSize: 10,
          padding: "10",
        }}
      >
        <Text>Tax Amount (in words) : </Text>
        <Text style={{ fontWeight: "bold" }}>INR {toWords.convert(IGST)}</Text>
      </View>
      <View>
        <Text
          style={{
            ...styles.finalBankDetails,
            padding: "10",
          }}
        >
          Company's Bank Details{"\n"}
          A/c Holder's Name :{" "}
          <Text style={styles.finalBoldText}>M2MLOGGER</Text>
          {"\n"}
          Bank Name : <Text style={styles.finalBoldText}>Bank of Company</Text>
          {"\n"}
          A/c No. : <Text style={styles.finalBoldText}>XXXXXXX3812</Text>
          {"\n"}
          Branch : <Text style={styles.finalBoldText}>SME Branch, Delhi</Text>
          {"\n"}
          IFS Code : <Text style={styles.finalBoldText}>BOC000XXXX</Text>
        </Text>
      </View>

      <View
        style={{
          ...styles.finalBankDetails,
          marginTop: "10",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ flex: 1, textAlign: "left" }}>
          <Text style={styles.finalDisclaimer}>
            Declaration{"\n"}
            1. Services once billed will not be taken back{"\n"}
            2. Payment: 100% advance payment.{"\n"}
            3. Subjected to Delhi Jurisdiction.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            border: "1px solid black",
            borderRight: "none",
            borderB: "none",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>M2MLOGGER</Text>
          <Image
            src={stamp}
            style={{ width: "80px", position: "relative", left: "70%" }}
          />
          <Text>Authorised Signatory</Text>
        </View>
      </View>
    </View>
  </View>
);

export const PdfViewer = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [IGST, setIGST] = useState(0);
  const [currDate, setCurrDate] = useState("");
  const customer = useSelector((state) => state.customer);
  const products = useSelector((state) => state.items);

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const date = new Date();
    setCurrDate(formatDate(date));
  }, []);

  useEffect(() => {
    const total = products.reduce((total, item) => +total + +item.amount, 0);
    const taxRate = 0.18;
    const IGST = total * taxRate;
    const totalPrice = (total + IGST).toFixed(2);
    setIGST(IGST);
    setTotalAmount(totalPrice);
  }, [products]);

  return (
    <PDFViewer style={styles.main}>
      <Document title="invoice.pdf">
        <Page style={styles.page}>
          {/* Header */}
          <Header currDate={currDate} customer={customer} />
          {/* Item Details */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]} fixed>
              <Text
                style={{
                  ...styles.tableCell,
                  flex: 0.2,
                  borderLeft: "1px solid black",
                }}
              >
                S.No.
              </Text>
              <Text style={styles.descriptionCell}>
                Description of Services
              </Text>
              <Text style={styles.tableCell}>SAC</Text>
              <Text style={styles.tableCell}>Amount (INR)</Text>
            </View>

            {products.map((item, index) => (
              <View key={index} style={styles.tableRow} wrap={false}>
                <Text
                  style={{
                    ...styles.tableCell,
                    flex: 0.2,
                    borderLeft: "1px solid black",
                  }}
                >
                  {index + 1}
                </Text>
                <View style={styles.descriptionCell}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 11,
                      paddingBottom: 3,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text>{item.description}</Text>
                  <Text>Platform: {item.platform}</Text>
                  <Text>Service: {item.service}</Text>
                  <Text>License Term: {item.licenseTerm}</Text>
                  <Text>Data Rate: {item.dataRate}</Text>
                  <Text>Data Retention: {item.dataRetention}</Text>
                  <Text>Account Admin: {item.accountAdmin}</Text>
                  <Text>Subscription: {item.subscription}</Text>
                  <Text>No. of sites: {item.numOfSites}</Text>
                </View>
                <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
                  {item.sac}
                </Text>
                <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>
                  {`${item.amount}.00`}
                </Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <FinalPrice
            IGST={IGST}
            totalAmount={totalAmount}
            SAC={products[0]?.sac}
          />
          <Footer />
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
  },
  page: {
    fontFamily: "Open Sans",
    padding: 30,
  },
  header: {
    borderBottom: "1px solid black",
    marginBottom: -1,
    // paddingBottom: 10,
  },
  logo: {
    width: 150,
    height: "auto",
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
  },
  infoTable: {
    display: "flex",
    alignItems: "stretch",
    flexDirection: "row",
    marginBottom: -1,
    border: "1px solid black",
    width: "100%",
  },
  infoColumn: {
    fontSize: 10,
  },
  infoRow: {
    minHeight: "50px",
    display: "flex",
    alignItems: "stretch",
    padding: "8px",
    border: "1px solid black",
    marginBottom: -1,
    marginLeft: -1,
    borderTop: "none",
    borderRight: "none",
  },
  infoTextBold: {
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 10,
  },
  dateRight: {
    textAlign: "right",
  },
  section: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  itemLabel: {
    width: "30%",
    fontWeight: "bold",
  },
  itemValue: {
    width: "70%",
  },
  total: {
    fontWeight: "bold",
    fontSize: 14,
  },
  itemContainer: {
    marginBottom: 15,
  },
  table: {
    display: "flex",
    width: "100%",
    marginBottom: -1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid black",
    borderTop: "1px solid black",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign: "center",
    borderRight: "1px solid black",
    flex: 1,
  },
  descriptionCell: {
    fontSize: 10,
    flex: 1.58,
    textAlign: "left",
    padding: 5,
    paddingRight: 0,
    borderRight: "1px",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    top: "auto",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    margin: "0 30px",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    height: 60,
    textAlign: "center",
    padding: 10,
    fontSize: 8,
    lineHeight: 1.5,
  },
  footerText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  finalTitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  finalSubTitle: {
    fontSize: 10,
  },
  finalTable: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  finalTableRow: {
    flexDirection: "row",
  },
  finalTableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  finalTableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  finalTableCell: {
    margin: 5,
    fontSize: 8,
    textAlign: "center",
  },
  finalDisclaimer: {
    fontSize: 9,
  },
  finalBankDetails: {
    fontSize: 10,
    textAlign: "right",
  },
  finalBoldText: {
    fontWeight: "bold",
  },
  finalSignatureSection: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  finalSignatureText: {
    fontSize: 8,
  },
});
