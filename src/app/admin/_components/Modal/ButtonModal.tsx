import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import Modal from "./Modal";
import ModalForm from "../Form/ModalForm";

type Props = {
  children: ReactNode;
  selectionTarget: string;
};

export default function ButtonModal({ children, selectionTarget }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        {children}
      </Button>
      <Modal setIsModalOpen={setIsModalOpen} isOpen={isModalOpen}>
        <ModalForm
          selectionTarget={selectionTarget}
          //   setSelectionTarget={setSelectionTarget}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
