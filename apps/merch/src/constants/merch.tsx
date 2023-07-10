import { Merch } from "@merch-types";

export const merch: Merch[] = [
  {
    id: "crewneck",
    name: "All in time Crewneck",
    description:
      "Slightly oversized fit. Boxy shoulders. Embroidery 3 locations, custom tags inside and out. 100% cotton",
    maxSupply: 188,
    cost: 12,
    sizeChart: ["s", "m", "l", "xl", "2xl"],
    colors: ["black"],
    images: [
      "image.png",
      "image1.png",
      "image2.png",
      "image3.png",
      "image4.png",
    ],
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
      "Slightly oversized fit. Graphic designed by Skullface. Available in black and white. 100% cotton.",
    maxSupply: 221,
    cost: 5,
    sizeChart: ["s", "m", "l", "xl", "2xl"],
    colors: ["black", "white"],
    images: [
      "image.png",
      "image1.png",
      "image2.png",
      "image3.png",
      "image4.png",
    ],
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
      "Golden Brown, recycled cotton/poly blend. Embroidery and custom tag. Dad swag not included.",
    maxSupply: 190,
    cost: 4,
    sizeChart: ["one size fits most"],
    colors: ["corduroy"],
    images: ["image.png"],
    sizes: [
      {
        color: "corduroy",
        size: "one size fits most",
        quantity: 190,
      },
    ],
  },
  {
    id: "pack",
    name: "culture builder pack",
    description:
      "Custom LAMY pen (made in germany), custom vanity box, Recycled paper sketchbook, Stickers (5x), Hard enamel pin. Paper/Metal/Plastic.",
    maxSupply: 190,
    cost: 5,
    sizeChart: ["one pack to rule them all"],
    colors: ["pack"],
    images: ["image.png", "image1.png", "image2.png", "image3.png"],
    sizes: [
      {
        color: "pack",
        size: "one pack to rule them all",
        quantity: 0, //TODO: 190
      },
    ],
  },
];
