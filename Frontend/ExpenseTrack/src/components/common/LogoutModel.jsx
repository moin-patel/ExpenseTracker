import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 animate-[popup_.25s_ease]"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <FiAlertTriangle className="text-red-500 text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-5">
          Logout
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Are you sure you want to logout?
          <br />
          You'll need to login again to continue.
        </p>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popup{
          0%{
            opacity:0;
            transform:scale(.8);
          }
          100%{
            opacity:1;
            transform:scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LogoutModal;