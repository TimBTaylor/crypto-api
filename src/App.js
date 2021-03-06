import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Coin } from "./Coin";
import Portfolio from "./images/portfolio.svg";
import Github from "./images/github.svg";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <div className="links">
          <div className="links-container">
            <a
              href="https://www.timbtaylor.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Portfolio} alt="portfolio" />
            </a>
            <br />
            <a
              className="portfolio-link"
              href="https://www.timbtaylor.com/"
              target="_blank"
              rel="noreferrer"
            >
              My Portfolio
            </a>
          </div>
          <div className="links-container">
            <a
              href="https://github.com/TimBTaylor/crypto-api"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Github} alt="github" />
            </a>
            <br />
            <a
              target="_blank"
              rel="noreferrer"
              className="github-link"
              href="https://github.com/TimBTaylor/crypto-api"
            >
              See code
            </a>
          </div>
        </div>
        <h1 className="coin-text">Crypto API</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
