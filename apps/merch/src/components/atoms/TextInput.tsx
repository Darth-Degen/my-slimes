import { FC, InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleInput: (value: string) => void;
  error?: boolean;
}

const TextInput: FC<Props> = (props: Props) => {
  const { handleInput, error, className, ...componentProps } = props;
  const styles: string = "w-60 h-10 font-neuebit-bold text-xl uppercase";

  //add max length check
  const onInput = (event: React.FormEvent<HTMLInputElement>): void => {
    const val = (event.target as HTMLInputElement).value;
    handleInput(val);
  };
  // if (error === true || error === false) console.log("error ", error);
  return (
    <input
      className={`${styles} relative flex justify-between transition-all duration-300 items-center px-3 
      outline-m-light-gray active:outline-m-light-gray focus:outline-m-light-gray !bg-white ${
        error ? "text-m-red" : ""
      } ${className} `}
      onInput={(e) => onInput(e)}
      type={componentProps.type ?? "text"}
      // maxLength={charLim}
      {...componentProps}
    />
  );
};

export default TextInput;
