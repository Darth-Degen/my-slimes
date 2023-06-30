import { FC, InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleInput: (value: string) => void;
}

const TextInput: FC<Props> = (props: Props) => {
  const { handleInput, className, ...componentProps } = props;

  const [value, setValue] = useState<string>();

  const charLim: number = 30;
  const styles: string = "w-56 h-10 bg-dark text-[9px]";

  //add max length check
  const onInput = (event: React.FormEvent<HTMLInputElement>): void => {
    const val = (event.target as HTMLInputElement).value;
    setValue(val);
    handleInput(val);
  };

  return (
    <input
      className={`${className} relative flex justify-between ${styles} transition-all duration-500 border  rounded items-center p-2 ${
        value && value.length >= charLim ? "text-red-500" : ""
      } ${
        componentProps.disabled
          ? "cursor-not-allowed bg-customDarkGray border-customDarkGray"
          : "hover:border-orange-300 focus:border-red-400 active:outline-none focus:outline-none border-dark"
      }`}
      onInput={(e) => onInput(e)}
      placeholder="Add Text"
      type="text"
      maxLength={charLim}
      disabled={componentProps.disabled}
    />
  );
};

export default TextInput;
