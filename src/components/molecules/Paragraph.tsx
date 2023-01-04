import { FC } from "react";

interface Props {
  title: string;
  body: string[];
}

const Paragraph: FC<Props> = (props: Props) => {
  const { title, body } = props;

  return (
    <div className="flex flex-col gap-5 text-center md:text-left">
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
