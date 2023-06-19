import { HTMLAttributes, FC } from "react";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}
const TextBox: FC<TextProps> = (props: TextProps) => {
  const { text, className, ...componentProps } = props;
  return (
    <div className={`flex flex-col gap-0 ${className}`} {...componentProps}>
      {[...Array(5)].map((item, index) => (
        <p
          className="text-ait-teal text-4xl md:text-5xl lg:text-4xl xl:text-6xl font-neuebit-bold"
          key={index}
        >
          {text}
        </p>
      ))}
    </div>
  );
};
export default TextBox;
