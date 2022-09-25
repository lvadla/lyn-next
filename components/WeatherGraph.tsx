import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ParentSize } from "@visx/responsive";
import {
  AspectRatio,
  Button,
  createStyles,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
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

  return (
    <>
      <AspectRatio ratio={21 / 9} mx="auto" sx={{ maxWidth: "960px" }}>
        {loading ? (
          <Skeleton radius="lg" />
        ) : (
          <ParentSize>
            {({ width, height }) => <Graph width={width} height={height} />}
          </ParentSize>
        )}
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

const verticalMargin = 80;

interface Weather {
  minTemperature: number;
  maxTemperature: number;
  entries: {
    time: string;
    temperature: number;
    type: string;
  };
}

const getTime = (d: Weather["entries"]) => new Date(d.time).getHours();
const getTemperature = (d: Weather["entries"]) => Number(d.temperature) * 100;

type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

function Graph({ width, height, events = false }: BarsProps) {
  const {
    data: {
      me: {
        home: { weather },
      },
    },
  } = useGetTemperatureData();

  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
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
    <svg width={width} height={height}>
      <LinearGradient from="#000022" to="#000022" id="dark-blue" />
      <rect width={width} height={height} fill="url(#dark-blue)" rx={14} />
      <Group top={verticalMargin / 2}>
        {weather.entries.map((d: Weather["entries"]) => {
          const time = getTime(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getTemperature(d)) ?? 0);
          const barX = xScale(time.toString());
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${time}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              textDecoration={JSON.stringify(d)}
              fill={theme.colors.gray[2]}
              onClick={() => {
                if (events)
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
