import React, { useState } from "react";
import Link from "next/link";
import {
  AppShell,
  Box,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconBolt } from "@tabler/icons";

export default function Shell({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200 }}
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[3],
          })}
        >
          <Link href="/login" passHref>
            <Box
              sx={(theme) => ({
                color: theme.colors.dark[9],
              })}
            >
              <Title
                order={5}
                ml={10}
                sx={(theme) => ({
                  color: theme.colors.dark[9],
                  cursor: "pointer",
                })}
              >
                Login
              </Title>
            </Box>
          </Link>
        </Navbar>
      }
      header={
        <Header
          height={60}
          p="xs"
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
            color: theme.colors.blue[6],
          })}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Link
              href="/"
              passHref
              style={{
                display: "flex",
                cursor: "pointer",
              }}
            >
              <>
                <IconBolt />
                <Text ml={6} size="md">
                  tibber
                </Text>
              </>
            </Link>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[9]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
