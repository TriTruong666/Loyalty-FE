import toast from "react-hot-toast";

export const showToast = (content: string, status: "success" | "error") => {
  if (status === "success") {
    toast.success(content, {
      style: {
        borderRadius: "10px",
        background: "#000000",
        color: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
    });
  } else if (status === "error") {
    toast.error(content, {
      style: {
        borderRadius: "10px",
        background: "#000000",
        color: "#ffffff",
      },
    });
  }
};
