"use client";

import { TypeInitialState } from "@/lib/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalFormState: TypeInitialState;
  setModalFormState: (state: TypeInitialState) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormState, setModalFormState] = useState<TypeInitialState>({
    status: "",
    message: [""],
  });

  return (
    <ModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, modalFormState, setModalFormState }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
