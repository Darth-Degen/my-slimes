import { HTMLAttributes, FC, useState, useEffect } from "react";
import { CountdownItem } from "apps/merch/src/components";
import { rackStatus } from "apps/merch/src/constants";

interface CountdownProps extends HTMLAttributes<HTMLDivElement> {
  futureDate: Date;
  caption: string;
  handleDateEnd: () => void;
}

const Countdown: FC<CountdownProps> = (props: CountdownProps) => {
  const { futureDate, caption, handleDateEnd, className } = props;
  const [didStart, setDidStart] = useState<boolean>(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = futureDate.getTime() - currentTime;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (timeDifference < 0) {
        clearInterval(interval);
      }
      setDidStart(true);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [futureDate]);

  useEffect(() => {
    if (futureDate < new Date()) {
      handleDateEnd();
    }
  }, [countdown, didStart, futureDate, handleDateEnd]);

  return (
    <div
      className={`flex flex-col justify-center text-ait-teal whitespace-nowrap ${className}`}
    >
      {caption === rackStatus[1].timerCaption && (
        <p className="uppercase pb-1 flex justify-start text-xl">{caption}</p>
      )}
      <div className="flex justify-start items-start gap-0 text-5xl md:text-7xl max-w-[290px]">
        <CountdownItem value={countdown.days} />
        {":"}
        <CountdownItem value={countdown.hours} />
        {":"}
        <CountdownItem value={countdown.minutes} />
        {":"}
        <CountdownItem value={countdown.seconds} />
      </div>
      {caption === rackStatus[0].timerCaption && (
        <p className="uppercase pb-1 flex justify-center lg:translate-x-[50px] text-xl">
          {caption}
        </p>
      )}
    </div>
  );
};

export default Countdown;
