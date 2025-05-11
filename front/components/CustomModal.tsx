"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Modal, { Styles } from "react-modal";
import { FaTimes } from "react-icons/fa";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  //customStyles: Styles;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  //customStyles,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "80%",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      //contentLabel=""
      ariaHideApp={false} // TODO: Remplacer par une gestion correcte de setAppElement pour l'accessibilité
    >
      <div className="h-full flex flex-col justify-between">
        <div
          className="flex flex-row justify-end cursor-pointer"
          onClick={onClose}
        >
          <button>
            <FaTimes />
          </button>
          <div>FERMER</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="">{children}</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-36 flex justify-center bg-red-200 text-white cursor-pointer"
            onClick={onClose}
          >
            <div>FERMER</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
