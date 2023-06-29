export interface Collection {
  id: number;
  tag: string;
  name: string;
  color: string;
  doublePfp?: boolean;
  topValue: number;
  mintAddress: string;
}

export interface Slime {
  id: number;
  name: string;
  image: string;
  mintAddress: string;
  description: string;
  mobileView: string;
  desktopView: string;
}
