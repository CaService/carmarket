import Button from "./Button";

const CustomDialog = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info", // 'info', 'success', 'error'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="text-center">
          <h4
            className={`text-xl font-bold mb-4 ${
              type === "error"
                ? "text-red-500"
                : type === "success"
                ? "text-green-500"
                : "text-blue-500"
            }`}
          >
            {title}
          </h4>
          <p className="mb-6 text-gray-700">{message}</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={onClose}>Ho capito</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
