import { createStyles, Title, Text, Button, Container } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 80,
    paddingBottom: 100,

    "@media (max-width: 755px)": {
      paddingTop: 60,
      paddingBottom: 80,
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginBottom: theme.spacing.xl,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

function HeroText() {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.controls}>
        <Button className={classes.control} size="lg">
          Show me a trick
        </Button>
        <Button className={classes.control} variant="default" size="lg">
          Reset
        </Button>
      </div>

      <Container p={0} size={600}>
        <Title className={classes.title}>
          Infrastructure{" "}
          <Text component="span" className={classes.highlight} inherit>
            supply chain
          </Text>{" "}
          seed lean startup technology
        </Title>
        <Text size="lg" mt="sm" color="dimmed" className={classes.description}>
          Assets traction angel investor user experience social media leverage
          value proposition startup success founders creative. Equity value
          proposition launch party business-to-consumer research and development
          freemium bandwidth stock scrum project analytics.
        </Text>
        <Text size="lg" mt="md" color="dimmed" className={classes.description}>
          Agile development backing business-to-consumer analytics burn rate
          leverage business-to-business market creative responsive web design
          graphical user interface
        </Text>
      </Container>
    </Container>
  );
}

export default HeroText;
