import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: "th",
          site_name: "Find My Pluto",
        }}
      />
    </>
  );
};

export { Meta };
