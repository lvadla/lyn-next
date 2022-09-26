import { Global } from "@mantine/core";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Avenir",
            src: `url('/fonts/avenir-next-regular.ttf')`,
            fontWeight: 400,
            fontStyle: "normal",
          },
          "@font-face": {
            fontFamily: "Silka",
            src: `url('/fonts/silka-semibold.ttf')`,
            fontWeight: 600,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
