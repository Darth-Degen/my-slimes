import { createContext } from "react";

interface CollabModal {
  id: number;
  type:string;
}
export const ViewContext = createContext({
  showView: false,
  setShowView: (value: boolean) => {},
  galleryModalId: -1,
  setGalleryModalId: (value: number) => {},
  didMenuClick: false,
  setDidMenuClick: (value: boolean) => {},
  sfcModalId: -1,
  setSFCModalId: (value: number) => {},
});

