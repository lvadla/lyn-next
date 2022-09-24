import React, { useState } from "react";
import { AppShell } from "@mantine/core";
import { NavbarColored } from "./NavbarColored";
import { Header } from "./Header";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <NavbarColored opened={opened} toggleNav={() => setOpened((o) => !o)} />
      }
      header={
        <Header navOpened={opened} toggleNav={() => setOpened((o) => !o)} />
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
