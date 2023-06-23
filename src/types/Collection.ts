export interface Collection {
  id: number;
  tag: string;
  name: string;
  color: string;
  doublePfp?: boolean;
  topValue: number;
}

export interface Slime extends Collection {
  mobileView: string;
  desktopView: string;
  pfp: string;
  description: string;
}
