import { createContext } from "react";

export const StoreContext = createContext({
  showStore: false,
  setShowStore: (value: boolean) => {},
  showExitModal: false,
  setShowExitModal: (value: boolean) => {},
  showOrderModal: false,
  setShowOrderModal: (value: boolean) => {},
  step: 0,
  setStep: (value: number) => {},
});

