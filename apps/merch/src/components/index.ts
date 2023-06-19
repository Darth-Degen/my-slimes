import dynamic from "next/dynamic";
//animations
//icons
//atoms
const ImageShimmer = dynamic(()=> import("./atoms/ImageShimmer"))
const NumberInput = dynamic(()=> import("./atoms/NumberInput"))
//molecules
const ImageBox = dynamic(()=> import("./molecules/ImageBox"))
const TextBox = dynamic(()=> import("./molecules/TextBox"))
const CountdownItem = dynamic(()=> import("./molecules/CountdownItem"))
const BuyRacksForm = dynamic(()=> import("./molecules/BuyRacksForm"))
const Modal = dynamic(()=> import("./molecules/Modal"))
const StoreItem = dynamic(()=> import("./molecules/StoreItem"))
//organisms
const Countdown = dynamic(()=> import("./organisms/Countdown"))
const ExitModal = dynamic(()=> import("./organisms/ExitModal"))
const Store = dynamic(()=> import("./organisms/Store"))
const ItemDetail = dynamic(()=> import("./organisms/ItemDetail"))
const Checkout = dynamic(()=> import("./organisms/Checkout"))
const BuyRacksContent = dynamic(()=> import("./organisms/BuyRacksContent"))
//templates
const BuyRacksView = dynamic(()=> import("./templates/BuyRacksView"))
const MerchModule = dynamic(()=> import("./templates/MerchModule"))
const StoreModal = dynamic(()=> import("./templates/StoreModal"))

export {
  BuyRacksView,
  ImageShimmer,
  NumberInput,
  ImageBox,
  TextBox,
  CountdownItem,
  Countdown,
  BuyRacksForm,
  MerchModule,
  StoreModal,
  ExitModal,
  Modal,
  BuyRacksContent,
  Store, 
  ItemDetail, 
  Checkout,
  StoreItem
}