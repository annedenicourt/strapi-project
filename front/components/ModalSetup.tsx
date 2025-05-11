// components/ModalSetup.tsx
"use client";

import { useEffect } from "react";
import Modal from "react-modal";

export default function ModalSetup() {
  /* useEffect(() => {
    const timeoutId = setTimeout(() => {
      const appElement = document.getElementById("__next");
      if (appElement) {
        Modal.setAppElement(appElement); // Définir l'élément principal de l'application
      } else {
        console.warn("Modal: Could not find #__next element");
      }
    }, 1000); // Attendre 100ms pour s'assurer que le DOM est prêt

    // Nettoyage du timeout
    return () => clearTimeout(timeoutId);
  }, []); */

  return null; // Ce composant ne rend rien
}
