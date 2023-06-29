export interface Collection {
  id: number;
  tag: string;
  name: string;
  color: string;
  doublePfp?: boolean;
  topValue: number;
}

export interface Slime {
  name: string;
  image: string;
  mintAddress: string;
  description: string;
  mobileView: string;
  desktopView: string;
}
