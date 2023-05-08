import {
  Button,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const steps = ["Not Processed", "Processing", "Shipped", "Delivered"];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "#fff",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const TrackOrder = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {/* <Button onClick={handleOpen}>Track Your Order</Button> */}
      <Button onClick={handleOpen} variant="contained">
        Track Your Order
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order Status
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ width: "100%" }}>
              {props.status === "Not processed" && (
                <Stepper activeStep={0} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
              {props.status === "Processing" && (
                <Stepper activeStep={1} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
              {props.status === "Shipped" && (
                <Stepper activeStep={2} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
              {props.status === "Delivered" && (
                <Stepper activeStep={3} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
            </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
