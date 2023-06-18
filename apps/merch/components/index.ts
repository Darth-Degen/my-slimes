import dynamic from "next/dynamic";
//animations

//icons

//atoms
const ImageShimmer = dynamic(()=> import("./atoms/ImageShimmer"))
const NumberInput = dynamic(()=> import("./atoms/NumberInput"))

//molecules

//organisms

//templates
const BuyRacksView = dynamic(()=> import("./templates/BuyRacksView"))

export {
  BuyRacksView,
  ImageShimmer,
  NumberInput
}