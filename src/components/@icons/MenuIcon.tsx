import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const MenuIcon: FC<Props> = (props: Props) => {
  const { className, ...componentProps } = props;

  return (
    <svg
      width="226"
      height="142"
      viewBox="0 0 226 142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` w-9 h-9 ${className}`}
      onClick={componentProps.onClick}
    >
      <path
        d="M13 13H213"
        stroke="#312A29"
        strokeWidth="25"
        strokeLinecap="round"
      />
      <path
        d="M13 70.8477H213"
        stroke="#312A29"
        strokeWidth="25"
        strokeLinecap="round"
      />
      <path
        d="M13 129.395H213"
        stroke="#312A29"
        strokeWidth="25"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MenuIcon;
