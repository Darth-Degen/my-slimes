import { Merch } from "@merch-types";

export const merch: Merch[] = [
  {
    id: "crewneck",
    name: "All in time Crewneck",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    maxSupply: 188,
    cost: 15,
    sizeChart: ["s", "m", "l", "xl", "2xl"],
    colors: ["black"],
    images: ["image.png", "image1.png", "image2.png"],
    sizes: [
      {
        color: "black",
        size: "s",
        quantity: 30,
      },
      {
        color: "black",
        size: "m",
        quantity: 58,
      },
      {
        color: "black",
        size: "l",
        quantity: 66,
      },
      {
        color: "black",
        size: "xl",
        quantity: 26,
      },
      {
        color: "black",
        size: "2xl",
        quantity: 8,
      },
    ],
  },
  {
    id: "tee",
    name: "skullface tee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    maxSupply: 214,
    cost: 5,
    sizeChart: ["s", "m", "lg", "xl", "2xl"],
    colors: ["black", "white"],
    images: ["image.png", "image1.png", "image2.png"],
    sizes: [
      //white
      {
        color: "white",
        size: "s",
        quantity: 16,
      },
      {
        color: "white",
        size: "m",
        quantity: 31,
      },
      {
        color: "white",
        size: "l",
        quantity: 34,
      },
      {
        color: "white",
        size: "xl",
        quantity: 16,
      },
      {
        color: "white",
        size: "2xl",
        quantity: 8,
      },
      //black
      {
        color: "black",
        size: "s",
        quantity: 16,
      },
      {
        color: "black",
        size: "m",
        quantity: 34,
      },
      {
        color: "black",
        size: "l",
        quantity: 41,
      },
      {
        color: "black",
        size: "xl",
        quantity: 18,
      },
      {
        color: "black",
        size: "2xl",
        quantity: 7,
      },
    ],
  },
  {
    id: "hat",
    name: "corduroy dad hat",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    maxSupply: 190,
    cost: 5,
    sizeChart: ["one sizes fits most"],
    colors: ["corduroy"],
    images: ["image.png", "image1.png", "image2.png"],
    sizes: [
      {
        color: "corduroy",
        size: "one sizes fits most",
        quantity: 190,
      },
    ],
  },
  {
    id: "pack",
    name: "culture builder pack",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    maxSupply: 190,
    cost: 5,
    sizeChart: ["one pack to rule them all"],
    colors: ["pack"],
    images: ["image.png", "image1.png", "image2.png"],
    sizes: [
      {
        color: "pack",
        size: "one pack to rule them all",
        quantity: 190,
      },
    ],
  },
];
