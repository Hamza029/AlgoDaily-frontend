import { AlertColor } from "@mui/material";

export default interface ToastProps {
  message: string;
  severity: AlertColor;
  handleToastClose: () => void;
}
