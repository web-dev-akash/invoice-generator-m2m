import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomerForm } from "./CustomerForm";
import { ItemsForm } from "./ItemsForm";
import { useDispatch } from "react-redux";
import { addItems, setUserDetails } from "../../redux/action";

export const FormComponent = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const [itemsArray, setItemsArray] = useState([]);
  const [customerData, setCustomerData] = useState({
    name: "",
    address: "",
    gstin: "",
    state: "",
    code: "",
  });

  const [itemData, setItemData] = useState({
    name: "",
    platform: "",
    service: "",
    licenseTerm: "",
    dataRate: "",
    dataRetention: "",
    accountAdmin: "",
    subscription: "",
    numOfSites: "",
    sac: "",
    amount: "",
  });

  const handleAddMoreItems = (e) => {
    e.preventDefault();
    setItemsArray([...itemsArray, itemData]);
    setItemData({
      name: "",
      platform: "",
      service: "",
      licenseTerm: "",
      dataRate: "",
      dataRetention: "",
      accountAdmin: "",
      subscription: "",
      numOfSites: "",
      sac: "",
      amount: "",
    });
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    dispatch(setUserDetails(customerData));
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    console.log("All Items:", itemsArray);
  };

  useEffect(() => {
    if (itemsArray.length > 0) {
      dispatch(addItems(itemsArray));
    }
  }, [itemsArray, dispatch]);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        minHeight: "calc(90vh - 70px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {step === 1 && (
        <CustomerForm
          customerData={customerData}
          handleCustomerChange={handleCustomerChange}
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <ItemsForm
          handleItemChange={handleItemChange}
          handleItemSubmit={handleItemSubmit}
          itemData={itemData}
          handleAddMoreItems={handleAddMoreItems}
          itemsArray={itemsArray}
          setItemsArray={setItemsArray}
          handleBack={handleBack}
        />
      )}
    </Box>
  );
};
