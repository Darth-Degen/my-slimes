export interface Collection {
  id: number;
  tag: string;
  name: string;
  burned?: boolean;
  image?: string;
  description?: string;
  color: string;
  doublePfp?: boolean;
  topValue: number;
  mintAddress: string;
  mobileView?: string;
  desktopView?: string;
}
