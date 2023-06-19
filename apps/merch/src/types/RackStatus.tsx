export interface RackStatus {
  name: RackStatusName;
  text: string;
  endDate: Date;
  src: string;
  caption: string;
  timerCaption: string;
}

export enum RackStatusName {
  Buy,
  Raffle,
  End,
}
