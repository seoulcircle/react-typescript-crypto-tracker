import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 300px;
`;

const Header = styled.header`
  height: 5vh;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: color 0.2s;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Image = styled.img`
  width: 35px;
  height: 35px;
  margin: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        "LOADING..."
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Image
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
