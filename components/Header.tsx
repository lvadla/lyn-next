import Link from "next/link";
import { useRouter } from "next/router";
import {
  createStyles,
  Header as MantineHeader,
  Group,
  Button,
  Burger,
} from "@mantine/core";
import TibberLogo from "./TibberLogo";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

interface HeaderProps {
  navOpened?: boolean;
  toggleNav: () => void;
}
export const Header = ({ navOpened, toggleNav }: HeaderProps) => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <MantineHeader height={60} px="md">
      <Group position="apart" sx={{ height: "100%" }}>
        <TibberLogo />
        <Group>
          <Group className={classes.hiddenMobile}>
            <Link href="/login" passHref>
              <Button component="a">Log in</Button>
            </Link>
            <Button disabled>Sign up</Button>
          </Group>
          <Burger opened={!!navOpened} onClick={toggleNav} />
        </Group>
      </Group>
    </MantineHeader>
  );
};
