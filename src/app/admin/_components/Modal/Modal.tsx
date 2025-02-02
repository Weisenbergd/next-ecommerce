"use client";
import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useModal } from "./ModalContext";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { isModalOpen, setIsModalOpen } = useModal();

  // closes if clicked outside ref div that wraps children
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0   z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 ">
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
