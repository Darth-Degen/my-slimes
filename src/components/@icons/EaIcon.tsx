import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
}

const EaIcon: FC<Props> = (props: Props) => {
  const { color = "white", width = "215", className } = props;
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <rect width="215" height="215" rx="30" fill="white" />
      <path
        d="M121.899 37.0001H48.27C42.0537 37.0001 37 42.0569 37 48.2721V121.731C37 121.731 37 133 47.0074 133H57.1735C67.3327 133 67.2223 121.901 67.2223 121.901L67.3982 67.7399L121.73 67.5595C121.73 67.5595 133 67.5595 133 57.4389V47.1588C133 36.8856 121.903 37.0001 121.903 37.0001H121.899Z"
        fill="#FFB094"
      />
      <path
        d="M93.1009 178H166.73C172.946 178 178 172.943 178 166.728V93.2686C178 93.2686 178 82 167.993 82H157.827C147.667 82 147.778 93.0987 147.778 93.0987L147.602 147.26L93.27 147.44C93.27 147.44 82 147.44 82 157.561V167.841C82 178.114 93.0975 178 93.0975 178H93.1009Z"
        fill="#FFB094"
      />
    </svg>
  );
};

export default EaIcon;
