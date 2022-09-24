import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useGetTemperatureData from "../hooks/useGetTemperatureData";
import SupportingGrid from "../components/SupportingGrid";
import HeroText from "../components/HeroText";
import WeatherGraph from "../components/WeatherGraph";

const Home: NextPage = () => {
  // const { data } = useGetTemperatureData();
  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}
      <WeatherGraph />
      <HeroText />
      <SupportingGrid />
      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
};

export default Home;
