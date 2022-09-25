import React, { useState, useMemo, useEffect } from "react";
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
} from "@mantine/core";
import { useTimeout } from "@mantine/hooks";
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
  const [loading, setLoading] = useState(true);
  const { start: startLoaderDelay } = useTimeout(() => setLoading(false), 1000);

  useEffect(() => startLoaderDelay(), [startLoaderDelay]);

  return (
    <>
      <AspectRatio ratio={21 / 9} mx="auto" sx={{ maxWidth: "960px" }}>
        <Skeleton radius="lg" visible={loading}>
          <ParentSize>
            {({ width, height }) => <Graph width={width} height={height} />}
          </ParentSize>
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

interface Weather {
  minTemperature: number;
  maxTemperature: number;
  entries: Entry[];
}

interface Entry {
  time: string;
  temperature: number;
  type: string;
}

const getTime = (d: Entry) => new Date(d.time).getHours();
const getTemperature = (d: Entry) => Number(d.temperature) * 100;

type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

function Graph({ width, height, events = false }: BarsProps) {
  const { data } = useGetTemperatureData();
  const weather = data.me.home.weather as Weather;

  // bounds
  const verticalMargin = height / 3;
  const xMax = width;
  const yMax = height - verticalMargin;

  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, xMax],
        round: true,
        domain: weather.entries.map(getTime),
        padding: 0.4,
      }),
    [weather.entries, xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...weather.entries.map(getTemperature))],
      }),
    [weather.entries, yMax]
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
          textAlign: "center",
        })}
      >
        <Text size="xs" mt="xs">
          Average Temperature
        </Text>
        <Text size="xl" weight="bold">
          {(
            weather.entries
              .map((d) => d.temperature)
              .reduce((a: number, b: number) => a + b) / weather.entries.length
          ).toFixed(1)}
          &#176;
        </Text>
      </Box>
      <svg width={width} height={height}>
        <LinearGradient from="#000022" to="#000022" id="dark-blue" />
        <rect width={width} height={height} fill="url(#dark-blue)" />
        <Group top={verticalMargin * 0.8}>
          {weather.entries.map((d: Entry) => {
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
