import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
}

const AitIcon: FC<Props> = (props: Props) => {
  const { color = "white", width = "215", className } = props;
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 215 215`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width={width} height={width} rx="30" fill="white" />
      <path
        d="M69.5076 181C65.7105 181 62.3224 179.141 60.4239 176.02C58.5254 172.899 58.5254 169.167 60.4239 166.046L93.6625 111.363C95.1083 108.977 95.1083 106.023 93.6625 103.651L60.4239 48.94C58.5254 45.8188 58.5254 42.1011 60.4239 38.98C62.3224 35.8588 65.7105 34 69.5076 34H146.47C150.282 34 153.685 35.8727 155.583 39.0077C157.467 42.1289 157.467 45.8466 155.554 48.9539L122.33 103.637C120.885 106.009 120.885 108.964 122.33 111.363L155.569 166.046C157.467 169.14 157.482 172.871 155.583 175.992C153.685 179.127 150.282 181 146.485 181H69.5076Z"
        fill="#FFB094"
      />
    </svg>
  );
};

export default AitIcon;
