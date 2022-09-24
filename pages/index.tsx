import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useGetTemperatureData from "../hooks/useGetTemperatureData";

const Home: NextPage = () => {
  // const { data } = useGetTemperatureData();
  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}

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
