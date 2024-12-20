"use client";

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsModalOpen, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  console.log("test");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsModalOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-90 z-40"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="absolute h-100 p-8 rounded-lg shadow-lg w-full max-w-md bg-primary-foreground text-primary"
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
