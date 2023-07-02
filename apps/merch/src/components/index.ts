import dynamic from "next/dynamic";
//animations
//icons
//atoms
const ImageShimmer = dynamic(()=> import("./atoms/ImageShimmer"))
const NumberInput = dynamic(()=> import("./atoms/NumberInput"))
const TextInput = dynamic(()=> import("./atoms/TextInput"))
const DropdownButton = dynamic(()=> import("./atoms/DropdownButton"))
const DropdownItem = dynamic(()=> import("./atoms/DropdownItem"))
//molecules
const ImageBox = dynamic(()=> import("./molecules/ImageBox"))
const TextBox = dynamic(()=> import("./molecules/TextBox"))
const CountdownItem = dynamic(()=> import("./molecules/CountdownItem"))
const BuyRacksForm = dynamic(()=> import("./molecules/BuyRacksForm"))
const Modal = dynamic(()=> import("./molecules/Modal"))
const StoreItem = dynamic(()=> import("./molecules/StoreItem"))
const Breadcrumbs = dynamic(()=> import("./molecules/Breadcrumbs"))
const NftIndicator = dynamic(()=> import("./molecules/NftIndicator"))
const CartIndicator = dynamic(()=> import("./molecules/CartIndicator"))
const ImagePicker = dynamic(()=> import("./molecules/ImagePicker"))
const Dropdown = dynamic(()=> import("./molecules/Dropdown"))
const CartActions = dynamic(()=> import("./molecules/CartActions"))
const CheckoutCartItem = dynamic(()=> import("./molecules/CheckoutCartItem"))
const ShippingForm = dynamic(()=> import("./molecules/ShippingForm"))
const ShippingDetails = dynamic(()=> import("./molecules/ShippingDetails"))
//organisms
const Countdown = dynamic(()=> import("./organisms/Countdown"))
const ExitModal = dynamic(()=> import("./organisms/ExitModal"))
const Store = dynamic(()=> import("./organisms/Store"))
const ItemDetail = dynamic(()=> import("./organisms/ItemDetail"))
const Checkout = dynamic(()=> import("./organisms/Checkout"))
const BuyRacksContent = dynamic(()=> import("./organisms/BuyRacksContent"))
const Header = dynamic(()=> import("./organisms/Header"))
const Footer = dynamic(()=> import("./organisms/Footer"))
const CheckoutCart = dynamic(()=> import("./organisms/CheckoutCart"))
const OrderModal = dynamic(()=> import("./organisms/OrderModal"))
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
  StoreItem,
  Header,
  Footer,
  Breadcrumbs,
  NftIndicator,
  CartIndicator,
  ImagePicker,
  DropdownButton,
  DropdownItem,
  Dropdown,
  CartActions,
  CheckoutCart,
  CheckoutCartItem,
  ShippingForm,
  TextInput,
  ShippingDetails,
  OrderModal
}