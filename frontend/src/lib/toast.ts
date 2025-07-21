/* eslint-disable no-fallthrough */
import { toast, ToastOptions } from "react-toastify";

export const notify = (
  message: string,
  type: "success" | "failure",
  config?: Partial<ToastOptions>,
) => {
  switch (type) {
    case "success":
      toast.success(message, config);
      break;

    case "failure":
      toast.error(message, config);

    default:
      break;
  }
};
