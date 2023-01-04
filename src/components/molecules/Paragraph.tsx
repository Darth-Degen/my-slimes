import { FC, HTMLProps } from "react";
// interface Props extends InputHTMLAttributes<HTMLInputElement> {

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  body: string[];
}

const Paragraph: FC<Props> = (props: Props) => {
  const { title, body, className } = props;

  return (
    <div
      className={`flex flex-col gap-5 text-center md:text-left ${className}`}
    >
      <h2 className="text-4xl">{title}</h2>
      {body &&
        body.map((text, index) => (
          <p className="gap-10" key={index}>
            {text}
          </p>
        ))}
    </div>
  );
};

export default Paragraph;
