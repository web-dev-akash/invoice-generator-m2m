import {
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdExpandMore, MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeItems } from "../../redux/action";

export const ItemsForm = ({
  handleAddMoreItems,
  handleItemChange,
  itemData,
  itemsArray,
  handleBack,
  setItemsArray,
}) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter Item Details
      </Typography>

      {itemsArray.map((item, index) => (
        <Accordion key={index} sx={{ mb: 2, position: "relative" }}>
          <AccordionSummary expandIcon={<MdExpandMore />}>
            <Typography>
              Item {index + 1}: {item.name || "Unnamed"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Platform:</strong> {item.platform}
              <br />
              <strong>Service:</strong> {item.service}
              <br />
              <strong>License Term:</strong> {item.licenseTerm}
              <br />
              <strong>Data Rate:</strong> {item.dataRate}
              <br />
              <strong>Data Retention:</strong> {item.dataRetention}
              <br />
              <strong>Account Admin:</strong> {item.accountAdmin}
              <br />
              <strong>Subscription:</strong> {item.subscription}
              <br />
              <strong>No. of Sites:</strong> {item.numOfSites}
              <br />
              <strong>SAC:</strong> {item.sac}
              <br />
              <strong>Amount: ₹</strong> {item.amount}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <form onSubmit={handleAddMoreItems}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={itemData.name}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel>Platform</InputLabel>
              <Select
                label="Platform"
                name="platform"
                value={itemData.platform}
                onChange={handleItemChange}
              >
                <MenuItem value="SolarFRONT">SolarFRONT</MenuItem>
                <MenuItem value="EnviroFRONT">EnviroFRONT</MenuItem>
                <MenuItem value="WebFRONT">WebFRONT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Service"
              name="service"
              value={itemData.service}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="License Term"
              name="licenseTerm"
              value={itemData.licenseTerm}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Data Rate"
              name="dataRate"
              value={itemData.dataRate}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Data Retention"
              name="dataRetention"
              value={itemData.dataRetention}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              type="email"
              label="Account Admin"
              name="accountAdmin"
              value={itemData.accountAdmin}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Subscription"
              name="subscription"
              value={itemData.subscription}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="No. of Sites"
              name="numOfSites"
              type="number"
              value={itemData.numOfSites}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="SAC"
              name="sac"
              value={itemData.sac}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={itemData.amount}
              onChange={handleItemChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleBack}
                fullWidth
              >
                Edit Customer Details
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Item
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
