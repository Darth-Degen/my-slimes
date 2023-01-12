import { FC, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  body: string[];
}

const Paragraph: FC<Props> = (props: Props) => {
  const { title, body, className } = props;

  return (
    <div className={`flex flex-col gap-8 text-center ${className}`}>
      <h2 className="text-4xl">{title}</h2>
      <div className="flex flex-col gap-8">
        {body && body.map((text, index) => <p key={index}>{text}</p>)}
      </div>
    </div>
  );
};

export default Paragraph;
