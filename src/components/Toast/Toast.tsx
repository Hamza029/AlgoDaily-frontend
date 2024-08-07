import { Snackbar, Alert } from "@mui/material";
import ToastProps from "./ToastProps";

export default function Toast({
  message,
  severity,
  handleToastClose,
}: ToastProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={true}
      autoHideDuration={3000}
      onClose={handleToastClose}
    >
      <Alert
        onClose={handleToastClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
