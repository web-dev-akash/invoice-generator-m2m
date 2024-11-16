import { TextField, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
export const CustomerForm = ({
  handleNext,
  customerData,
  handleCustomerChange,
}) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter Customer Details
      </Typography>
      <form onSubmit={handleNext}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={customerData.name}
              onChange={handleCustomerChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={customerData.address}
              onChange={handleCustomerChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="GSTIN / UIN"
              name="gstin"
              value={customerData.gstin}
              onChange={handleCustomerChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={customerData.state}
              onChange={handleCustomerChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Code"
              name="code"
              value={customerData.code}
              onChange={handleCustomerChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
