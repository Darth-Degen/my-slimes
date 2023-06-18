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
//organisms
const Countdown = dynamic(()=> import("./organisms/Countdown"))
//templates
const BuyRacksView = dynamic(()=> import("./templates/BuyRacksView"))

export {
  BuyRacksView,
  ImageShimmer,
  NumberInput,
  ImageBox,
  TextBox,
  CountdownItem,
  Countdown,
  BuyRacksForm
}