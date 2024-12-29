"use client";
import Modal from "../_components/Modal/Modal";
import { useModal } from "../_components/Modal/ModalContext";

export default function page() {
  const { isModalOpen, setIsModalOpen, modalFormState, setModalFormState } =
    useModal();

  console.log(isModalOpen);

  return (
    <div>
      <p>test</p>

      <button onClick={() => setIsModalOpen(!isModalOpen)}>click modal</button>

      <Modal>
        <p>test</p>
      </Modal>
    </div>
  );
}
