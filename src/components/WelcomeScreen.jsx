import { createPortal } from "react-dom";
import { X } from 'lucide-react';
import logo from "../assets/logo.png"

export default function WelcomeScreenModal({ modalState, closeModal }) {

  if (!modalState) return null;

  return createPortal((
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-black hover:cursor-pointer hover:text-gray-300 transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            {/* Popup Content Container */}
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative">
              {/* Centered Text Content */}
          <div className="text-center">
                  <img src={logo} alt="Payfonte Logo" className="inline"/>
                  <p className="text-black text-3xl font-semibold">
                    Welcome to Payfonte
                  </p>
              </div>
            </div>
      </div>
    </>
  ),document.body)
}
