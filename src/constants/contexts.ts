import { createContext } from "react";

interface CollabModal {
  id: number;
  type:string;
}
export const ViewContext = createContext({
  showView: false,
  setShowView: (value: boolean) => {},
  // galleryModalId: -1,
  // setGalleryModalId: (value: number) => {},
  // collabModal: <CollabModal> { id:-1,  type:"" },
  // setCollabModal: (value: CollabModal) => {},
});

