import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-slate-900/20 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-lg shadow-2xl transition-all transform animate-in fade-in zoom-in duration-300">
        {/* Modal content */}
        <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
          {/* Modal header - Clean & Minimal */}
          <div className="flex items-center justify-between p-6 pb-0">
            <h3 className="text-xl font-bold text-slate-800 ml-2">{title}</h3>

            <button
              type="button"
              className="text-slate-400 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-full text-sm w-10 h-10 inline-flex justify-center items-center transition-colors duration-200"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
