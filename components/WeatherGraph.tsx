import {
  AspectRatio,
  Button,
  createStyles,
  Grid,
  Skeleton,
} from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  controls: {
    marginTop: theme.spacing.xl,
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

function WeatherGraph() {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AspectRatio ratio={21 / 9} mx="auto">
        <Skeleton visible={loading} radius="lg">
          Our business productizes action points to conservatively and globally
          incentivize our cloud native team player. Our business offshores
          architectures to dynamically and virtually right-size our mobile
          stakeholder. We use our self-driving NFTs to iteratively manage our
          market focus expectations. You need to strategically transform your
          step-changes to increase your emerging market velocity. So we can hit
          the ground running, we will be intelligently monetizing every stack in
          our space. In the visibility space, industry is effectively
          calibrating its mission critical ballpark figures. In the future, will
          you be able to reliably innovate capabilities in your business?
          Efficiencies will come from ethically connecting our deliverables. Our
          business productizes action points to conservatively and globally
          incentivize our cloud native team player. Our business offshores
          architectures to dynamically and virtually right-size our mobile
          stakeholder. We use our self-driving NFTs to iteratively manage our
          market focus expectations. You need to strategically transform your
          step-changes to increase your emerging market velocity. So we can hit
          the ground running, we will be intelligently monetizing every stack in
          our space. In the visibility space, industry is effectively
          calibrating its mission critical ballpark figures. In the future, will
          you be able to reliably innovate capabilities in your business?
          Efficiencies will come from ethically connecting our deliverables.
        </Skeleton>
      </AspectRatio>

      <div className={classes.controls}>
        <Button
          className={classes.control}
          size="lg"
          onClick={() => setLoading((v) => !v)}
        >
          Show me a trick
        </Button>
        <Button className={classes.control} variant="default" size="lg">
          Reset
        </Button>
      </div>
    </>
  );
}

export default WeatherGraph;
