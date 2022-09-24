import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import { createStyles } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons";
import isAuthenticated from "../constants/isAuthenticated";
import { clearJwtToken } from "../hooks/useJwtToken";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },
  };
});

function NavbarLogin() {
  const { classes } = useStyles();
  const authenticated = useReactiveVar(isAuthenticated);

  return (
    <Link href="/login" passHref>
      {authenticated ? (
        <a className={classes.link} onClick={clearJwtToken}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      ) : (
        <a className={classes.link}>
          <IconLogin className={classes.linkIcon} stroke={1.5} />
          <span>Login</span>
        </a>
      )}
    </Link>
  );
}

export default NavbarLogin;
