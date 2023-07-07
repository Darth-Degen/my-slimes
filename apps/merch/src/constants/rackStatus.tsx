import { RackStatus, RackStatusName } from "@merch-types";

export const rackStatus: RackStatus[] = [
  {
    name: RackStatusName.Buy,
    text: "BUY NOW!!!",
    endDate: new Date(Date.UTC(2023, 6, 7, 23, 0, 0)),
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/images/ait/pika.png`,
    caption:
      "RACKS = one raffle ticket for the newest <span class='link'><a href='https://exchange.art/single/Ezm7edUhZ6sgnKrouPUdAu8iSTb4EiEaR18HN26XHsXd' rel='noreferrer' target='_blank' >slime</a></span> and the currency used to buy  <span class='link'><a href='https://allintime.xyz/' rel='noreferrer' target='_blank'>all in time</a></span> clothes and items. ",
    timerCaption: "time left to buy racks",
  },
  {
    name: RackStatusName.Raffle,
    text: "RAFFLE LIVE",
    endDate: new Date(Date.UTC(2023, 6, 14, 23, 0, 0)),
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/images/ait/yoda.png`,
    caption: "mfer who won slime is:",
    timerCaption: "winner chosen in:",
  },
  {
    name: RackStatusName.End,
    text: "RAFFLE LIVE",
    endDate: new Date(),
    src: `${process.env.NEXT_PUBLIC_CDN_URL}/images/ait/yoda.png`,
    caption: "the lucky mfr who won a slime is:",
    timerCaption: "",
  },
];
