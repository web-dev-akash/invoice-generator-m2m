import { Box } from "@mui/material";
import "./App.css";
import { FormComponent } from "./components/FormComponent/FormComponent";
import { PdfViewer } from "./components/PDFViewer/PDFViewer";
import { useSelector } from "react-redux";

export const App = () => {
  const items = useSelector((state) => state.items);
  const user = useSelector((state) => state.customer);

  console.log("Items : ", items);
  console.log("User : ", user);

  return (
    <Box>
      <header
        style={{
          width: "100%",
          height: "70px",
          background: "#363434",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0 30px",
        }}
      >
        <img src="/m2mlogger.png" alt="M2MLogger" />
      </header>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"stretch"}
        padding={"2rem"}
        width={"100%"}
        gap={"30px"}
      >
        <Box flex={1}>
          <FormComponent />
        </Box>
        <Box flex={1} width={"100%"} minWidth={500}>
          {/* {items?.length > 0 && (
            <Box>
              <PDFDownloadLink document={<PdfViewer />} fileName="invoice.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download now!"
                }
              </PDFDownloadLink>
            </Box>
          )} */}
          {/* {items?.length > 0 && <PdfViewer items={items} />} */}
          <PdfViewer />
        </Box>
      </Box>
    </Box>
  );
};
