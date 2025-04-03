import { NavigateFunction } from "react-router";
import { toast, ToastOptions } from "react-toastify";

type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

type ToastType = "info" | "success" | "error" | "warn" | "default";

interface ToastEmitterProps {
  title: string;
  type: ToastType;
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: any;
  theme?: string;
  redirectRoute?: any;
  redirectButton?: any;
  navigate?: any;
}
const toastEmitter = ({
  title,
  type,
  position = "top-right",
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress,
  theme = "light",
  redirectButton = null,
  redirectRoute = null, // Optional button component or function
  navigate
}: ToastEmitterProps) => {
  const options: ToastOptions = {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    theme,
  };

  // Render a custom toast content if `customButton` is provided
  const toastContent =
    typeof redirectRoute === "string" ? (
      <div className="flex justify-center">
        <div>{title}</div>
        <button
          onClick={() => {
              if (navigate) {
                navigate(redirectRoute);
              }
          }}
          className="cursor-pointer border-2 border-gray-400 rounded-md ml-8 w-auto whitespace-nowrap min-w-12"
        >
          {redirectButton}
        </button>
      </div>
    ) : (
      title // Render just the title if customButton is a string
    );

  switch (type) {
    case "info":
      toast.info(toastContent, options);
      break;
    case "warn":
      toast.warn(toastContent, options);
      break;
    case "success":
      toast.success(toastContent, options);
      break;
    case "error":
      toast.error(toastContent, options);
      break;
    default:
      toast(toastContent, options);
      break;
  }
};

export default toastEmitter;
