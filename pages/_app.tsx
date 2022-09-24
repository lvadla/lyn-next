import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Shell from "../components/Shell";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Lean & Agile Value Proposition</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="../favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <ApolloProvider client={client}>
          <Shell>
            <Component {...pageProps} />
          </Shell>
        </ApolloProvider>
      </MantineProvider>
    </>
  );
}
