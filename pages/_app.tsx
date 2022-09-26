import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { getCookie, setCookie } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { ApolloProvider } from "@apollo/client";

import client from "../apollo-client";
import Shell from "../components/Shell";
import AuthGuard from "../components/AuthGuard";
import { CustomFonts } from "../typography/CustomFonts";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

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
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Avenir, sans-serif",
            colorScheme,
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
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
