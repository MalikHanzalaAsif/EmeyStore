import { NavigateFunction } from "react-router";
import { toast, ToastOptions } from "react-toastify";

type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

type ToastType = "info" | "success" | "error" | "warn";

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
  customButton?: any;
  navigate: NavigateFunction;
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
  theme = "colored",
  customButton = null, // Optional button component or function
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
    typeof customButton !== "string" ? (
      <div>
        <span>{title}</span>
        <button
          onClick={() => {
            if (typeof customButton === "function") {
              customButton(); // Call a function if provided
            } else {
              navigate("/cart"); // Redirect to cart page by default
            }
          }}
          style={{
            marginLeft: "16px",
            padding: "5px 10px",
            background: "transparent",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {typeof customButton === "string" ? customButton : "Action"}
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
