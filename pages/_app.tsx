import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Shell from "../components/Shell";
import AuthGuard from "../components/AuthGuard";
import { CustomFonts } from "../Typography/CustomFonts";

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
          fontFamily: "Avenir, sans-serif",
          colorScheme: "light",
        }}
      >
        <CustomFonts />
        <AuthGuard excludedRoutes={["/login"]}>
          <ApolloProvider client={client}>
            <Shell>
              <Component {...pageProps} />
            </Shell>
          </ApolloProvider>
        </AuthGuard>
      </MantineProvider>
    </>
  );
}
