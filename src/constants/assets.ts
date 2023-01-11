import { Asset } from "@types";

export const assets: Asset[] = [
  {
    id:0,
    tag: "pfp",
    name:"full image",
    width: [300],
    height: [300],
    actionLabel: "download hi-res image"
  },
  {
    id:1,
    tag: "pfp-crop",
    name:"pfp crop",
    width: [300],
    height: [300],
    actionLabel: "download pfp"
  },
  {
    id:2,
    tag: "banner",
    name:"banner",
    width: [794],
    height: [491.33],
    actionLabel: "download banner"
  },
  {
    id:3,
    tag: "mobile-display",
    name:"mobile wallpaper",
    width: [220],
    height: [366],
    actionLabel: "download wallpaper"
  },
  {
    id:4,
    tag: "desktop-display",
    name:"desktop wallpaper",
    width: [600],
    height: [423.33],
    actionLabel: "download wallpaper"
  },
];