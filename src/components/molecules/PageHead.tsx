import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
  description: string;
}

const PageHead: FC<Props> = (props: Props) => {
  const { title, description } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* twitter */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MySlimes_" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/meta.png" />
      <meta property="twitter:url" content={`https://slimes.xyz/`} />
      {/* <!-- Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://slimes.xyz/`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`/meta.png`} />
    </Head>
  );
};

export default PageHead;
