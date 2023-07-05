import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const CloseIcon: FC<Props> = (props: Props) => {
  const { className, ...componentProps } = props;

  return (
    <svg
      width="342"
      height="342"
      viewBox="0 0 342 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` w-9 h-9 ${className}`}
      onClick={componentProps.onClick}
    >
      <path
        d="M20 20L322 322"
        stroke="#F6EFD3"
        strokeWidth="40"
        strokeLinecap="round"
      />
      <path
        d="M322 20L20 322"
        stroke="#F6EFD3"
        strokeWidth="40"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseIcon;
