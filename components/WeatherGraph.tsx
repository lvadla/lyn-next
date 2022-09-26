import { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ParentSize } from "@visx/responsive";
import {
  AspectRatio,
  Box,
  Button,
  createStyles,
  Skeleton,
  Text,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSquareX, IconWand } from "@tabler/icons";
import useGetTemperatureData from "../hooks/useGetTemperatureData";

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
  const { toggleColorScheme } = useMantineColorScheme();
  const { loading, error, data } = useGetTemperatureData();
  return (
    <>
      <AspectRatio ratio={21 / 9} mx="auto" sx={{ maxWidth: "960px" }}>
        {error ? (
          <div>{error.message}</div>
        ) : loading ? (
          <Skeleton radius="lg"></Skeleton>
        ) : (
          <ParentSize>
            {({ width, height }) => (
              <Graph data={data} width={width} height={height} />
            )}
          </ParentSize>
        )}
      </AspectRatio>

      <div className={classes.controls}>
        <Button
          leftIcon={<IconWand />}
          className={classes.control}
          size="lg"
          onClick={() => toggleColorScheme()}
        >
          <Text transform="uppercase">Show me a trick</Text>
        </Button>
        <Button
          leftIcon={<IconSquareX />}
          className={classes.control}
          variant="outline"
          size="lg"
        >
          <Text transform="uppercase">Reset</Text>
        </Button>
      </div>
    </>
  );
}

export default WeatherGraph;

interface Data {
  me: {
    home: {
      weather: {
        minTemperature: number;
        maxTemperature: number;
        entries: Entry[];
      };
    };
  };
}

interface Entry {
  time: string;
  temperature: number;
  type: string;
}

const getTime = (d: Entry) => new Date(d.time).getHours();
const getTemperature = (d: Entry) => Number(d.temperature) * 100;

type BarsProps = {
  data: Data;
  width: number;
  height: number;
  events?: boolean;
};

function Graph({ data, width, height, events = false }: BarsProps) {
  // bounds
  const verticalMargin = height / 3;
  const xMax = width;
  const yMax = height - verticalMargin;

  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, xMax],
        round: true,
        domain: data.me.home.weather.entries.map(getTime),
        padding: 0.4,
      }),
    [data.me.home.weather.entries, xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [
          0,
          Math.max(...data.me.home.weather.entries.map(getTemperature)),
        ],
      }),
    [data.me.home.weather.entries, yMax]
  );

  const theme = useMantineTheme();

  return (
    <>
      <Box
        sx={(theme) => ({
          color: theme.colors.gray[2],
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 0,
          textAlign: "center",
        })}
      >
        <Text size="xs" mt="xs">
          Average Temperature
        </Text>
        <Text size="xl" weight="bold">
          {(
            data.me.home.weather.entries
              .map((d) => d.temperature)
              .reduce((a: number, b: number) => a + b) /
            data.me.home.weather.entries.length
          ).toFixed(1)}
          &#176;
        </Text>
      </Box>
      <svg width={width} height={height}>
        <LinearGradient from="#000022" to="#000022" id="dark-blue" />
        <rect width={width} height={height} fill="url(#dark-blue)" rx={12} />
        <Group top={verticalMargin * 0.8}>
          {data.me.home.weather.entries.map((d: Entry) => {
            const time = getTime(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getTemperature(d)) ?? 0);
            const barX = xScale(time);
            const barY = yMax - barHeight;
            return (
              <Bar
                key={`bar-${time}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                rx={3}
                textDecoration={JSON.stringify(d)}
                fill={theme.colors.gray[2]}
              />
            );
          })}
        </Group>
      </svg>
    </>
  );
}
