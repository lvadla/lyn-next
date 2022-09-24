import {
  Header as MantineHeader,
  Group,
  Burger,
  MediaQuery,
} from "@mantine/core";
import TibberLogo from "./TibberLogo";

interface HeaderProps {
  navOpened?: boolean;
  toggleNav?: () => void;
}
export const Header = ({ navOpened, toggleNav }: HeaderProps) => {
  return (
    <MantineHeader height={60} px="lg">
      <Group position="apart" sx={{ height: "100%" }}>
        <TibberLogo />
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger opened={!!navOpened} onClick={toggleNav} />
        </MediaQuery>
      </Group>
    </MantineHeader>
  );
};
