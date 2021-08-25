import Head from "next/head";
import React from "react";

const BTC_URL =
  "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";
const ETH_URL =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";

const PUNK_URL = "https://cryptopunks-api.herokuapp.com/api/v1/punks/7610";

const BTC_AMOUNT = 3;
const PUNK_AMOUNT = 49.5;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Home() {
  const [btcPrice, setBtcPrice] = React.useState();
  const [ethPrice, setEthPrice] = React.useState();
  // const [punkData, setPunkData] = React.useState();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    fetch(BTC_URL)
      .then((res) => res.json())
      .then((data) => {
        const usdPrice = Number(data.USD);

        setBtcPrice(usdPrice);
      })
      .catch(() => {
        setError(true);
      });

    fetch(ETH_URL)
      .then((res) => res.json())
      .then((data) => {
        const usdPrice = Number(data.USD);

        setEthPrice(usdPrice);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div className="container">
      <Head>
        <title>3 BTC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img src="/punk.png" style={{ height: "300px" }} />
        <h1 style={{ padding: "40px 20px" }}>
          {btcPrice && (
            <span>
              If Visa bought 3 BTC instead, it would be worth $
              {parseFloat(btcPrice * BTC_AMOUNT).toLocaleString()}
            </span>
          )}
        </h1>

        <h2 style={{ padding: "10px 20px" }}>
          {ethPrice && (
            <span>
              If they held {PUNK_AMOUNT} of ETH, it would be worth $
              {parseFloat(ethPrice * PUNK_AMOUNT).toLocaleString()}
            </span>
          )}
        </h2>

        <h2 style={{ padding: "0 20px" }}>
          Their punk is currently worth ¯\_(ツ)_/¯ (not for sale)
        </h2>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
