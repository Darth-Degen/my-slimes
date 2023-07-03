import { FC, InputHTMLAttributes } from "react";
import debounce from "lodash.debounce";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  supply: number;
  handleInput: (number: number) => void;
}

const NumberInput: FC<Props> = (props: Props) => {
  const { supply, handleInput, className, ...componentProps } = props;
  const debouncer = debounce((value) => handleInput(value), 1000);

  //prevent keys
  const onKeyPress = (event: React.KeyboardEvent): void => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  //add max length check
  const onInput = (event: React.FormEvent<HTMLInputElement>): void => {
    if (Number((event.target as HTMLInputElement).value) > supply) {
      (event.target as HTMLInputElement).value = supply.toString();
    } else {
      debouncer(Number((event.target as HTMLInputElement).value));
    }
  };

  return (
    <div>
      <input
        className={`${className} relative flex items-center w-40 h-10 pl-4 pr-1 pt-1 text-4xl text-black rounded focus:outline-ait-teal ${
          componentProps.disabled ? "cursor-not-allowed" : ""
        }`}
        onKeyPress={(e) => onKeyPress(e)}
        onInput={(e) => onInput(e)}
        type="number"
        min={1}
        max={supply}
        {...componentProps}
      />
    </div>
  );
};

export default NumberInput;
